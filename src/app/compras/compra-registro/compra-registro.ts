import { Component } from '@angular/core';
import { Compra, DetalleCompra } from '../../models/compra';
import { CompraService } from '../../service/compra-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compra-registro',
  templateUrl: './compra-registro.html',
  standalone: false,
  styleUrl: './compra-registro.css'
})
export class CompraRegistro {


  constructor(
    private compraService: CompraService
  ) { }
  // Este será tu objeto principal
  compra: Compra = {
    fecha_Registro: new Date(),  // Hoy por defecto
    sub_Total: 0,
    igv_Total: 0,
    total_Total: 0,
    detalles: []
  };
  get fechaRegistroInput(): string {
    return this.compra.fecha_Registro
      ? this.compra.fecha_Registro.toISOString().substring(0, 10)
      : '';
  }
  set fechaRegistroInput(value: string) {
    this.compra.fecha_Registro = value ? new Date(value + 'T00:00:00') : new Date();
  }

  getTodayDateString(): string {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  }

  modalVisible = false;

  abrirModalProducto() {
    this.modalVisible = true;
  }
  cerrarModalProducto() {
    this.modalVisible = false;
  }

  // Cuando llegan productos seleccionados del modal
  agregarProductosDetalle(productos: any[]) {// formato yyyy-MM-dd

    const codigosExistentes = new Set(this.compra.detalles.map(d => d.codigo_item));

    const nuevosDetalles: DetalleCompra[] = productos
      .filter(prod => !codigosExistentes.has(prod.productId))
      .map(prod => ({
        codigo_item: prod.productId,
        nombre_item: prod.fullName,
        cantidad_item: prod.cantidad ?? 1,
        precio_item: prod.cost,
        subtotal_item: (prod.cantidad ?? 1) * prod.salePrice,
        igv_item: (prod.cantidad ?? 1) * prod.salePrice * 0.18,
        total_item: (prod.cantidad ?? 1) * prod.salePrice * 1.18
      }));

    this.compra.detalles = [...this.compra.detalles, ...nuevosDetalles];
    this.recalcularCabecera();
    this.cerrarModalProducto();
  }

  // Cuando cambia cantidad o precio
  actualizarDetalle(det: DetalleCompra) {
    det.subtotal_item = det.cantidad_item * det.precio_item;
    det.igv_item = det.subtotal_item * 0.18;
    det.total_item = det.subtotal_item + det.igv_item;
    this.recalcularCabecera();
  }

  eliminarDetalle(i: number) {
    this.compra.detalles.splice(i, 1);
    this.recalcularCabecera();
  }

  recalcularCabecera() {
    // Actualiza cada detalle (subtotal, igv, total)
    for (const d of this.compra.detalles) {
      d.subtotal_item = (d.cantidad_item ?? 1) * (d.precio_item ?? 0);
      d.igv_item = d.subtotal_item * 0.18;
      d.total_item = d.subtotal_item + d.igv_item;
    }
    // Suma en cabecera
    this.compra.sub_Total = this.compra.detalles.reduce((a, d) => a + d.subtotal_item, 0);
    this.compra.igv_Total = this.compra.detalles.reduce((a, d) => a + d.igv_item, 0);
    this.compra.total_Total = this.compra.detalles.reduce((a, d) => a + d.total_item, 0);
  }


  onDetalleChange() {
    this.recalcularCabecera();
  }

  registrarCompra() {
    if (this.compra.detalles.length === 0) {
      Swal.fire('¡Advertencia!', 'Agrega al menos un producto al detalle', 'warning');
      return;
    }

    Swal.fire({
      title: '¿Registrar compra?',
      text: '¿Estás seguro de registrar esta compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.compra.fecha_Registro = new Date();

        this.compraService.registrarCompra(this.compra).subscribe({
          next: resp => {
            Swal.fire('¡Compra registrada!', 'La compra se registró correctamente.', 'success');
            this.limpiarFormulario();
          },
          error: err => {
            Swal.fire('Error', 'Ocurrió un error al registrar la compra.', 'error');
          }
        });
      }
    });
  }

  limpiarFormulario() {
    this.compra = this.getNuevaCompra();
  }
  getNuevaCompra(): Compra {
    return {
      fecha_Registro: new Date(),
      sub_Total: 0,
      igv_Total: 0,
      total_Total: 0,
      detalles: []
    };
  }
}

import { Component } from '@angular/core';
import { VentaService } from '../../service/venta-service';
import Swal from 'sweetalert2';
import { Venta, DetalleVenta } from '../../models/venta'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-ventas-registro',
  standalone: false,
  templateUrl: './ventas-registro.html',
  styleUrl: './ventas-registro.css'
})
export class VentasRegistro {

  constructor(
    private ventaService: VentaService
  ) { }

  // Objeto principal para venta
  venta: Venta = {
    fecha_Registro: new Date(),
    sub_Total: 0,
    igv_Total: 0,
    total_Total: 0,
    detalles: []
  };

  get fechaRegistroInput(): string {
    return this.venta.fecha_Registro
      ? this.venta.fecha_Registro.toISOString().substring(0, 10)
      : '';
  }
  set fechaRegistroInput(value: string) {
    this.venta.fecha_Registro = value ? new Date(value + 'T00:00:00') : new Date();
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
  agregarProductosDetalle(productos: any[]) {
    const codigosExistentes = new Set(this.venta.detalles.map(d => d.codigo_item));

    const nuevosDetalles: DetalleVenta[] = productos
      .filter(prod => !codigosExistentes.has(prod.productId))
      .map(prod => ({
        codigo_item: prod.productId,
        nombre_item: prod.fullName,
        cantidad_item: prod.cantidad ?? 1,
        precio_item: prod.salePrice,
        subtotal_item: (prod.cantidad ?? 1) * prod.salePrice,
        igv_item: (prod.cantidad ?? 1) * prod.salePrice * 0.18,
        total_item: (prod.cantidad ?? 1) * prod.salePrice * 1.18
      }));

    this.venta.detalles = [...this.venta.detalles, ...nuevosDetalles];
    this.recalcularCabecera();
    this.cerrarModalProducto();
  }

  actualizarDetalle(det: DetalleVenta) {
    det.subtotal_item = det.cantidad_item * det.precio_item;
    det.igv_item = det.subtotal_item * 0.18;
    det.total_item = det.subtotal_item + det.igv_item;
    this.recalcularCabecera();
  }

  eliminarDetalle(i: number) {
    this.venta.detalles.splice(i, 1);
    this.recalcularCabecera();
  }

  recalcularCabecera() {
    for (const d of this.venta.detalles) {
      d.subtotal_item = (d.cantidad_item ?? 1) * (d.precio_item ?? 0);
      d.igv_item = d.subtotal_item * 0.18;
      d.total_item = d.subtotal_item + d.igv_item;
    }
    this.venta.sub_Total = this.venta.detalles.reduce((a, d) => a + d.subtotal_item, 0);
    this.venta.igv_Total = this.venta.detalles.reduce((a, d) => a + d.igv_item, 0);
    this.venta.total_Total = this.venta.detalles.reduce((a, d) => a + d.total_item, 0);
  }

  onDetalleChange() {
    this.recalcularCabecera();
  }

  registrarVenta() {
    if (this.venta.detalles.length === 0) {
      Swal.fire('¡Advertencia!', 'Agrega al menos un producto al detalle', 'warning');
      return;
    }

    Swal.fire({
      title: '¿Registrar venta?',
      text: '¿Estás seguro de registrar esta venta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.venta.fecha_Registro = new Date();

        this.ventaService.registrarVenta(this.venta).subscribe({
          next: resp => {
            Swal.fire('¡Venta registrada!', 'La venta se registró correctamente.', 'success');
            this.limpiarFormulario();
          },
          error: err => {
            Swal.fire('Error', 'Ocurrió un error al registrar la venta.', 'error');
          }
        });
      }
    });
  }

  limpiarFormulario() {
    this.venta = this.getNuevaVenta();
  }
  getNuevaVenta(): Venta {
    return {
      fecha_Registro: new Date(),
      sub_Total: 0,
      igv_Total: 0,
      total_Total: 0,
      detalles: []
    };
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { ProductoService } from '../../service/producto-service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-compra-registro',
  standalone: false,
  templateUrl: './compra-registro.html',
  styleUrl: './compra-registro.css'
})
export class CompraRegistro {

  hoy: string = new Date().toISOString().substring(0, 10);

  modalVisible = false;

  abrirModalProducto() {
    console.log('TEST')
    this.modalVisible = true;
  }
  cerrarModalProducto() {
    this.modalVisible = false;
  }


  detalleCompras: Producto[] = [];

  agregarProductosDetalle(productos: Producto[]) {
    // Evita duplicados si lo necesitas
    this.detalleCompras = [...this.detalleCompras, ...productos];
    // Cierra modal
    this.modalVisible = false;
  }
}

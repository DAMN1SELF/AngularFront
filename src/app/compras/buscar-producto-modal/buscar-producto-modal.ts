import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoService } from '../../service/producto-service';
import { Producto } from '../../models/producto';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-buscar-producto-modal',
  standalone: false,
  templateUrl: './buscar-producto-modal.html',
  styleUrl: './buscar-producto-modal.css'
})
export class BuscarProductoModal {
  @Input() modo: 'compra' | 'venta' = 'compra';
  @Output() onProductosSeleccionados = new EventEmitter<Producto[]>();
  @Output() cerrar = new EventEmitter<void>();

  busquedaNombre: string = '';
  productosModal: Producto[] = [];
  busquedaRealizada = false;
  productosSeleccionados: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  buscarProductoModal() {
    if (this.busquedaNombre.trim().length >= 2) {
      this.productoService.buscarProductos(this.busquedaNombre.trim())
        .pipe(
          catchError(err => {
            this.productosModal = [];
            this.busquedaRealizada = true;
            return of([]);
          })
        )
        .subscribe(resp => {
          this.productosModal = resp || [];
          this.busquedaRealizada = true;
        });
    } else {
      this.productosModal = [];
      this.busquedaRealizada = true;
    }
  }

  toggleSeleccionar(prod: Producto) {
    const idx = this.productosSeleccionados.findIndex(p => p.productId === prod.productId);
    if (idx >= 0) {
      this.productosSeleccionados.splice(idx, 1);
    } else {
      this.productosSeleccionados.push(prod);
    }
  }

  estaSeleccionado(prod: Producto): boolean {
    return !!this.productosSeleccionados.find(p => p.productId === prod.productId);
  }

  toggleSeleccionarTodos(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.productosSeleccionados = [...this.productosModal];
    } else {
      this.productosSeleccionados = [];
    }
  }

  todosSeleccionados(): boolean {
    return this.productosSeleccionados.length === this.productosModal.length && this.productosModal.length > 0;
  }

  confirmarSeleccion() {
    this.onProductosSeleccionados.emit(this.productosSeleccionados);
    this.cerrarModal();
  }

  cerrarModal() {
    this.cerrar.emit();
  }
}

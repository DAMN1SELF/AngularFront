import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto-service';
import { ProductoStock } from '../../models/kardex';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.html',
  standalone: false,
  styleUrls: ['./kardex.css']
})
export class Kardex implements OnInit {
  productos: ProductoStock[] = [];
  loading = true;
  modalVisible = false;
  productoDetalleId: number | null = null;

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.productoService.listarStock().subscribe({
      next: (prods) => {
        this.productos = prods;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }


  verDetalle(prod: ProductoStock) {
    this.productoDetalleId = prod.id_producto;
    console.log('Ver detalle del producto:', this.productoDetalleId);
    this.modalVisible = true;

  }

  cerrarModal() {
    this.modalVisible = false;
    this.productoDetalleId = null;
  }
}

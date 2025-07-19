import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MovimientoService } from '../../service/movimiento-service';
import { MovimientoDetalle } from '../../models/kardex';

@Component({
  selector: 'app-kardex-detalle',
  templateUrl: './kardex-detalle.html',
  standalone: false,
  styleUrl: './kardex-detalle.css'
})
export class KardexDetalle implements OnInit {
  @Input() idProducto: number | null = null;
  @Output() cerrar = new EventEmitter<void>();


  movimientos: MovimientoDetalle[] = [];
  loading = false;


  constructor(private movimientoService: MovimientoService) { }


  ngOnInit() {
    if (this.idProducto != null) {
      this.loading = true;
      this.movimientoService.obtenerMovimientosDetallado(this.idProducto).subscribe({
        next: (resp) => {
          this.movimientos = resp.data ?? [];
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  cerrarModal() {
    this.cerrar.emit();
  }

  getTipoMovimiento(tipo: number) {
    if (tipo === 1) return 'Entrada';
    if (tipo === 2) return 'Salida';
    return 'N/A';
  }
}

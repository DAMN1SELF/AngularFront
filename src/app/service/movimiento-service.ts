import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimientoDetalleResponse } from '../models/kardex';

@Injectable({ providedIn: 'root' })
export class MovimientoService {
  private url = 'http://localhost:5188/api/v1/Movimiento/buscar-movimiento-detallado';

  constructor(private http: HttpClient) { }

  obtenerMovimientosDetallado(idProducto: number): Observable<MovimientoDetalleResponse> {
    return this.http.get<MovimientoDetalleResponse>(`${this.url}/${idProducto}`);
  }
}

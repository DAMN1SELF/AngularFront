import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl = 'http://localhost:5188/api/v1/Venta';

  constructor(private http: HttpClient) { }

  // Método para registrar venta
  registrarVenta(venta: Venta): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-venta`, venta);
  }
}

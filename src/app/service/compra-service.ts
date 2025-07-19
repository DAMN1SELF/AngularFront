import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../models/compra';

@Injectable({ providedIn: 'root' })
export class CompraService {
  private apiUrl = 'http://localhost:5188/api/v1/Compra'; // Cambia el puerto según tu backend

  constructor(private http: HttpClient) { }

  registrarCompra(compra: Compra): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-compra`, compra);
  }
}

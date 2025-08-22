import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAccountDTO, CuentaResponse } from '../models/cuenta';

@Injectable({ providedIn: 'root' })
export class CuentaService {
  private url = 'https://localhost:7162/api/v1/cuenta';

  constructor(private http: HttpClient) {}

  // GET /api/v1/cuenta/listar
  obtenerCuentas(): Observable<CuentaResponse> {
    return this.http.get<CuentaResponse>(`${this.url}/listar`);
  }

  // GET /api/v1/cuenta/cliente/{clienteId}
  obtenerCuentasPorCliente(clienteId: number): Observable<CuentaResponse> {
    return this.http.get<CuentaResponse>(`${this.url}/cliente/${clienteId}`);
  }

  // GET /api/v1/cuenta/{numeroCuenta}
  obtenerCuentaPorNumero(numeroCuenta: string): Observable<CuentaResponse> {
    return this.http.get<CuentaResponse>(
      `${this.url}/${encodeURIComponent(numeroCuenta)}`
    );
  }

  // POST /api/v1/cuenta
  crearCuenta(dto: CreateAccountDTO): Observable<CuentaResponse> {
    return this.http.post<CuentaResponse>(`${this.url}`, dto);
  }

  // PUT /api/v1/cuenta/activar/{numeroCuenta}
  activarCuenta(numeroCuenta: string): Observable<CuentaResponse> {
    return this.http.put<CuentaResponse>(
      `${this.url}/activar/${encodeURIComponent(numeroCuenta)}`,
      {}
    );
  }

  // PUT /api/v1/cuenta/desactivar/{numeroCuenta}
  desactivarCuenta(numeroCuenta: string): Observable<CuentaResponse> {
    return this.http.put<CuentaResponse>(
      `${this.url}/desactivar/${encodeURIComponent(numeroCuenta)}`,
      {}
    );
  }

  // DELETE /api/v1/cuenta/{numeroCuenta}
  eliminarCuenta(numeroCuenta: string): Observable<void> {
    return this.http.delete<void>(
      `${this.url}/${encodeURIComponent(numeroCuenta)}`
    );
  }
}

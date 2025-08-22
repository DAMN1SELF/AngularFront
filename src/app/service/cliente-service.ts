import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteResponse, CreateClientDTO, PatchClientDTO, UpdateClientDTO } from '../models/cliente';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private url = 'https://localhost:7162/api/v1/cliente';

  constructor(private http: HttpClient) { }

  obtenerClientes(): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.url}/listar`);
  }
  // GET /buscar/{id}
  buscarCliente(id: number): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.url}/buscar/${id}`);
  }

  // POST /cliente
  crearCliente(cliente: CreateClientDTO): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(`${this.url}`, cliente);
  }

  // PUT /cliente/{id}
  actualizarCliente(id: number, cliente: UpdateClientDTO): Observable<ClienteResponse> {
    return this.http.put<ClienteResponse>(`${this.url}/${id}`, cliente);
  }

  // PATCH /cliente/{id}
  modificarParcialCliente(id: number, partial: Partial<PatchClientDTO>): Observable<ClienteResponse> {
    return this.http.patch<ClienteResponse>(`${this.url}/${id}`, partial);
  }

  // DELETE /cliente/{id}
  eliminarCliente(id: number): Observable<ClienteResponse> {
    return this.http.delete<ClienteResponse>(`${this.url}/${id}`);
  }
}

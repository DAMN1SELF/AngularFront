import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoStock } from '../models/kardex';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:5188/api/v1/Producto';

  constructor(private http: HttpClient) { }

  buscarProductos(nombre: string): Observable<Producto[]> {
    const url = `${this.apiUrl}/buscar?nombre=${encodeURIComponent(nombre)}`;
    return this.http.get<any>(url).pipe(
      map(resp => resp.data as Producto[])
    );
  }

  listarStock(): Observable<ProductoStock[]> {
    return this.http.get<any>(`${this.apiUrl}/listarStock`)
      .pipe(
        map(resp => resp.data as ProductoStock[])
      );
  }
}

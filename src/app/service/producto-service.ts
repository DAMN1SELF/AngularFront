import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:5188/api/v1/Producto';

  constructor(private http: HttpClient) { }

  buscarProductos(nombre: string): Observable<Producto[]> {
    const url = `${this.apiUrl}/buscar?nombre=${encodeURIComponent(nombre)}`;
    return this.http.get<any>(url).pipe(
      map(resp => resp.data as Producto[]) // Toma solo el array data
    );
  }
}

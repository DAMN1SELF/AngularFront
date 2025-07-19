import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno, AlumnoDTO, AlumnoResponse } from '../models/alumno';
import { map, tap,catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {


  private apiUrl = 'http://localhost:8083/api/alumno'

  constructor(private http: HttpClient) {

  }

  listarAlumnoes(): Observable<Alumno[]> {
    return this.http.get<AlumnoResponse>(`${this.apiUrl}/listar`)
      .pipe(
        tap(response => console.log('Respuesta completa del API:', response)),
        map(response => response.alumnos)
      );
  }

agregarAlumno(alumnoDTO: AlumnoDTO): Observable<any> {
  return this.http.post(`${this.apiUrl}`, alumnoDTO).pipe(
    tap(response => console.log('✅ Respuesta del servidor (agregarAlumno):', response)),
    catchError(error => {
      console.error('❌ Error del servidor (agregarAlumno):', error);
      return throwError(() => error);
    })
  );
}

  editarAlumno(id: number, alumno: AlumnoDTO): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, alumno);
    }

  eliminarAlumno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}

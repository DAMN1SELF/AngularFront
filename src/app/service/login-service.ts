import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private login: string = 'http://localhost:5188/api/v1/usuario/autenticarse';

  constructor(private http: HttpClient) { }

  ingresar(request: any): Observable<any> {
    return this.http.post(`${this.login}`, request, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;

      // 1. Busca el token en el header (preferido)
      let beaberToken = headers.get('authorization') || headers.get('Authorization');
      let token = beaberToken ? beaberToken.replace('Bearer ', '') : null;

      // 2. Si no está en el header, busca en el body (por compatibilidad)
      if ((!token || token === 'null') && body && body.data && body.data.token) {
        token = body.data.token;
      }

      if (token) {
        localStorage.setItem('token', token);
      } else {
        console.error('Error al autentificarse');
      }
      return body;
    }));
  }




  token() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getUsuarioDelToken(): string | null {
    const token = this.token();
    if (!token) {
      return null;
    }
    const payload = token.split('.')[1];
    try {
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.Usuario ?? null;
    } catch (e) {
      console.error('Error al decodificar el token', e);
      return null;
    }
  }
}

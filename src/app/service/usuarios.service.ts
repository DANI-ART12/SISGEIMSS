import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:5001/api/v1/user'; // Ajusta si la ruta cambia

  constructor(private http: HttpClient) {}

  // ✅ Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // ✅ Agregar un nuevo usuario
  addUsuario(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, usuario, { headers });
  }

//   // ✅ Eliminar usuario (si lo necesitas)
//   deleteUsuario(id: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${id}`);
//   }

  //
  // updateUsuario(id: number, usuario: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, usuario, { headers });
  // }

   // ✅ Actualizar usuario (si lo necesitas)
  updateUsuario(id: number, data: any): Observable<any> {
  return this.http.patch(`http://localhost:5001/api/v1/user/${id}`, data);
}


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private apiUrl = 'http://localhost:5001/api/v1/car'; // ✅ Ruta base para car

  constructor(private http: HttpClient) {}

  // ✅ Obtener todos los carros
  getVehiculos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // ✅ Agregar un nuevo carro
  addCar(car: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, car, { headers });
  }

  // ✅ Eliminar un carro por ID
  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Actualizar un carro por ID (PATCH)
  updateCar(id: number, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data, { headers });
  }

}

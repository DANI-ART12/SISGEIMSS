// src/app/service/tipo-vehiculo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {
  private apiUrl = 'http://localhost:5001/api/v1/type-car';

  constructor(private http: HttpClient) {}

  getTiposVehiculos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

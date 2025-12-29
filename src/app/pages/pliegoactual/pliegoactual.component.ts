/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pliegoactual',
  templateUrl: './pliegoactual.component.html',
  styleUrls: ['./pliegoactual.component.css']
})
export class PliegoactualComponent implements OnInit {

  // Fecha de hoy por defecto o la que recibas de un servicio
  fechaActual: string = new Date().toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Objeto con los datos del formulario
  pliego = {
    numeroComision: '2024/001',
    lugarFecha: `Ciudad de México, a ${this.fechaActual}`,
    funcionario: 'JUAN PÉREZ GARCÍA',
    cp: '06600',
    categoria: 'MÉDICO ESPECIALISTA A',
    areaSolicitante: 'DIRECCIÓN DE PRESTACIONES MÉDICAS',
    matricula: '99123456',
    tc: '80', // Tipo de Contratación
    puesto: 'JEFE DE DEPARTAMENTO',
    departamento: 'COORDINACIÓN DE SEGUNDO NIVEL',
    objetoComision: 'SUPERVISIÓN DE UNIDADES MÉDICAS DE PRIMER NIVEL',
    destino: 'GUADALAJARA, JALISCO',
    fechaInicio: '2024-05-20',
    fechaFin: '2024-05-22',
    medioTransporte: 'AVIÓN / TERRESTRE',
    cuentaBancaria: '**** **** **** 1234',
    banco: 'BANORTE',
    importeLetra: 'TRES MIL QUINIENTOS PESOS',
    importeNumero: 3500.00,
    diasComision: 3
  };

  // Datos para la tabla de viáticos
  viaticos = {
    cuota1: 1200.00,
    cuota2: 0,
    subtotal: 3500.00,
    boletoAvion: 1500.00,
    total: 5000.00
  };

  constructor() { }

  ngOnInit(): void {
    // Aquí podrías llamar a un servicio para obtener los datos reales
    // this.miServicio.getDatosPliego().subscribe(res => this.pliego = res);
  }

  // Función opcional para imprimir directamente
  imprimir() {
    window.print();
  }

}*/


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Ruta corregida a tu ubicación real
import { AuthService } from '../../core/auth/auth.service'; 

@Component({
  selector: 'app-pliegoactual',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pliegoactual.component.html',
  styleUrls: ['./pliegoactual.component.css']
})
export class PliegoactualComponent implements OnInit {

  constructor(private authService: AuthService) { }

 // Usamos el operador de coalescencia nula (??) para dar un valor por defecto
  get rolUsuario(): string {
    return this.authService.getRole() ?? ''; 
  }

  // Ahora la función de permisos trabajará sin errores de tipo
  tienePermiso(rolesPermitidos: string[]): boolean {
    const rol = this.rolUsuario;
    if (!rol) return false; // Si no hay rol, no tiene permiso para nada
    return rolesPermitidos.includes(rol);
  }

  // --- El resto de tu lógica se mantiene igual ---
  showModalAdmin = false;
  showModalTraslado = false;

  pliego = {
    numeroComision: '2025/615',
    lugarFecha: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }),
    funcionario: '',
    cp: '',
    categoria: '',
    areaSolicitante: '',
    empleado: 'DR. ARMANDO CASAS ROBLES',
    matricula: '91153456',
    tc: '08',
    puesto: 'MÉDICO ESPECIALISTA',
    departamento: 'ONCOLOGÍA',
    objetoComision: '',
    destino: '',
    fechaInicio: '',
    fechaFin: '',
    medioTransporte: 'VEHÍCULO OFICIAL',
    cuota: 0,
    boletoAvion: 0,
    cuentaBancaria: '',
    banco: '',
    importeLetra: '',
    observaciones: ''
  };

  ngOnInit(): void { }

  get calcularDias(): number {
    if (!this.pliego.fechaInicio || !this.pliego.fechaFin) return 0;
    const inicio = new Date(this.pliego.fechaInicio);
    const fin = new Date(this.pliego.fechaFin);
    const diff = fin.getTime() - inicio.getTime();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
    return dias > 0 ? dias : 0;
  }

  get subtotal(): number { return this.calcularDias * (this.pliego.cuota || 0); }
  get totalGeneral(): number { return this.subtotal + (Number(this.pliego.boletoAvion) || 0); }

  toggleModalAdmin() { this.showModalAdmin = !this.showModalAdmin; }
  toggleModalTraslado() { this.showModalTraslado = !this.showModalTraslado; }
  imprimir() { window.print(); }
}
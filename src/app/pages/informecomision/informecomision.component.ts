import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service'; 

@Component({
  selector: 'app-informecomision',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informecomision.component.html',
  styleUrls: ['./informecomision.component.css']
})
export class InformeComisionComponent implements OnInit {
  private authService = inject(AuthService);
  
  currentRole: string | undefined;
  mostrarModalAdministrativo = false;
  mostrarModalTraslado = false;

  // Objeto inicializado con campos vacíos para evitar errores de tipo
  datosInforme: any = {
    comisionado: 'JUAN PEREZ',
    folio: '',
    pliego: '',
    adscripcion: '',
    lugarComision: '',
    objetoComision: '',
    proposito: '',
    actividades: '',
    resultados: '',
    contribuciones: ''
  };

  pliegosDisponibles = [
    { numero: '001/2025', adscripcion: 'DEPARTAMENTO DE INFORMÁTICA', lugar: 'CDMX', objeto: 'MANTENIMIENTO DE SERVIDORES' },
    { numero: '002/2025', adscripcion: 'RECURSOS HUMANOS', lugar: 'OAXACA', objeto: 'CAPACITACIÓN DE PERSONAL' },
    { numero: '003/2025', adscripcion: 'SERVICIOS MÉDICOS', lugar: 'PUEBLA', objeto: 'AUDITORÍA DE INVENTARIOS' }
  ];

  pliegoBusqueda: string = '';
  sugerencias: any[] = [];

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentRole = user?.role;
    });
  }

  get esAdminOSub(): boolean {
    return this.currentRole === 'ADMIN' || this.currentRole === 'SUBADMIN';
  }

  buscarPliego() {
    if (this.pliegoBusqueda.length > 0) {
      this.sugerencias = this.pliegosDisponibles.filter(p => 
        p.numero.toLowerCase().includes(this.pliegoBusqueda.toLowerCase())
      );
    } else {
      this.sugerencias = [];
    }
  }

  seleccionarPliego(pliego: any) {
    this.datosInforme.pliego = pliego.numero;
    this.datosInforme.adscripcion = pliego.adscripcion;
    this.datosInforme.lugarComision = pliego.lugar;
    this.datosInforme.objetoComision = pliego.objeto;
    
    this.pliegoBusqueda = '';
    this.sugerencias = [];
  }

  abrirAdministrativo() { this.mostrarModalAdministrativo = true; }
  abrirTraslado() { this.mostrarModalTraslado = true; }
  
  cerrarModales() {
    this.mostrarModalAdministrativo = false;
    this.mostrarModalTraslado = false;
    this.sugerencias = [];
  }

  guardarAdministrativo() { this.cerrarModales(); }
  guardarTraslado() { this.cerrarModales(); }
  imprimir() { window.print(); }
}
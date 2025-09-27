import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface HistorialMantenimiento {
  id: number;
  vehiculo: string;
  placas: string;
  kilometraje: number;
  lugar: string;
  fechaIngreso: string;
  fechaSalida: string;
  mantenimiento?: string;
  observaciones: string;
  suspencion?: string;
  complementarios?: string;
  afinacionMayor?: string;
  frenos?: string;
}

@Component({
  selector: 'app-historialvehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historialvehiculos.component.html',
  styleUrls: ['./historialvehiculos.component.css']
})
export class HistorialvehiculosComponent {
  filtroGeneral: string = '';
  mostrarFormulario: boolean = false;
  mostrarDetalles: boolean = false; // Para modal detalles
  mantenimientoSeleccionado!: HistorialMantenimiento;

  listaPlacas: string[] = ['ABC-123','XYZ-789','JKL-456','MNO-321'];
  listasuspencion = ['Amortiguadores','Bases de amortiguadores','Terminales de dirección'];
  listaComplementarios = ['Lavado', 'Pulido', 'Cambio de batería', 'Cambio de llantas'];
  listaAfinacionMayor = ['Cambio de bujías', 'Lavado de motor', 'Lavado de válvulas'];
  listaFrenos = ['Birlos de seguridad','Remplazo balatas delanteras','Remplazo balatas traseras'];

  historial: HistorialMantenimiento[] = [
    {
      id: 1,
      vehiculo: 'Nissan Versa',
      placas: 'ABC-123',
      kilometraje: 15000,
      lugar: 'Taller Mecánico El Rápido',
      fechaIngreso: '2025-09-10',
      fechaSalida: '2025-09-11',
      observaciones: 'Revisar balatas',
      complementarios: 'Lavado',
      suspencion: 'Amortiguadores',
      afinacionMayor: 'Cambio de bujías',
      frenos: 'Birlos de seguridad'
    }
  ];

  nuevoMantenimiento: HistorialMantenimiento = {
    id: 0,
    vehiculo: '',
    placas: '',
    kilometraje: 0,
    lugar: '',
    fechaIngreso: '',
    fechaSalida: '',
    observaciones: '',
    complementarios: '',
    suspencion: '',
    afinacionMayor: '',
    frenos: ''
  };

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  limpiarFiltros() {
    this.filtroGeneral = '';
  }

  abrirDetalles(mantenimiento: HistorialMantenimiento) {
    this.mantenimientoSeleccionado = mantenimiento;
    this.mostrarDetalles = true;
  }

  cerrarDetalles() {
    this.mostrarDetalles = false;
  }

  guardarMantenimiento() {
    if (!this.nuevoMantenimiento.vehiculo || !this.nuevoMantenimiento.placas) {
      alert('Por favor complete los campos obligatorios.');
      return;
    }
    const nuevo = { ...this.nuevoMantenimiento, id: this.historial.length + 1 };
    this.historial.push(nuevo);

    this.nuevoMantenimiento = {
      id: 0, vehiculo: '', placas: '', kilometraje: 0, lugar: '',
      fechaIngreso: '', fechaSalida: '', observaciones: '',
      complementarios:'', suspencion:'', afinacionMayor:'', frenos:''
    };
    this.mostrarFormulario = false;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey() {
    if(this.mostrarFormulario) this.mostrarFormulario = false;
    if(this.mostrarDetalles) this.mostrarDetalles = false;
  }
}

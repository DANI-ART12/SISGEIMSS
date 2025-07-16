import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface HistorialPago {
  fecha: string;      // fecha de creación
  fechaPago?: string; // fecha de pago
  folio: string;
  operador: string;
  paciente: string;
  url?: string;
}

@Component({
  selector: 'app-historialpagos',
  templateUrl: './historialpagos.component.html',
  styleUrls: [],
  imports:[FormsModule,CommonModule]
})
export class HistorialpagosComponent {
  filtroMatricula: string = '';
  filtroFolio: string = '';
  filtroPaciente: string = '';
  fechaDesde?: string;
  fechaHasta?: string;

  editarPagoIndex: number | null = null;

  historial: HistorialPago[] = [
    {
      fecha: '2025-07-01',
      folio: 'F123',
      operador: 'MAT001',
      paciente: 'Juan Pérez',
      url: 'ruta/al/pliego1.pdf'
    },
    {
      fecha: '2025-07-05',
      fechaPago: '2025-07-10',
      folio: 'F124',
      operador: 'MAT002',
      paciente: 'María López',
      url: 'ruta/al/pliego2.pdf'
    }
  ];

  historialFiltrado(): HistorialPago[] {
    return this.historial.filter(item => {
      const cumpleMatricula = this.filtroMatricula
        ? item.operador.toLowerCase().includes(this.filtroMatricula.toLowerCase())
        : true;

      const cumpleFolio = this.filtroFolio
        ? item.folio.toLowerCase().includes(this.filtroFolio.toLowerCase())
        : true;

      const cumplePaciente = this.filtroPaciente
        ? item.paciente.toLowerCase().includes(this.filtroPaciente.toLowerCase())
        : true;

      const fechaCreacion = new Date(item.fecha);
      const desde = this.fechaDesde ? new Date(this.fechaDesde) : null;
      const hasta = this.fechaHasta ? new Date(this.fechaHasta) : null;

      const cumpleFechaDesde = desde ? fechaCreacion >= desde : true;
      const cumpleFechaHasta = hasta ? fechaCreacion <= hasta : true;

      return cumpleMatricula && cumpleFolio && cumplePaciente && cumpleFechaDesde && cumpleFechaHasta;
    });
  }

  limpiarFiltros() {
    this.filtroMatricula = '';
    this.filtroFolio = '';
    this.filtroPaciente = '';
    this.fechaDesde = undefined;
    this.fechaHasta = undefined;
  }

  confirmarPago() {
    this.editarPagoIndex = null;
  }

  eliminarPliego(item: HistorialPago) {
    const index = this.historial.indexOf(item);
    if (index > -1) {
      this.historial.splice(index, 1);
    }
  }
}
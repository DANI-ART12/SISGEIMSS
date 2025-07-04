import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  filtroMatricula: string = '';
  filtroFolio: string = '';
  // filtroFecha no se usa en el filtro, puedes eliminarlo si quieres
  fechaDesde: string = '';
  fechaHasta: string = '';

  historial = [
    { fecha: '2025-04-30', usuario: 'A001', operador: '1234567', folio: 'F123', url: 'assets/pliegos/F123.pdf' },
    { fecha: '2025-04-29', usuario: 'S001', operador: '9878789', folio: 'F456', url: 'assets/pliegos/F123.pdf' },
    { fecha: '2025-04-28', usuario: 'U001', operador: '8972347', folio: 'F789', url: 'assets/pliegos/F123.pdf' }
  ];

  historialFiltrado() {
    return this.historial.filter(item => {
      const fechaItem = new Date(item.fecha);
      const desde = this.fechaDesde ? new Date(this.fechaDesde) : null;
      const hasta = this.fechaHasta ? new Date(this.fechaHasta) : null;

      return (
        item.usuario.toLowerCase().includes(this.filtroMatricula.toLowerCase()) &&
        item.folio.toLowerCase().includes(this.filtroFolio.toLowerCase()) &&
        (!desde || fechaItem >= desde) &&
        (!hasta || fechaItem <= hasta)
      );
    });
  }

  eliminarPliego(item: any): void {
    const confirmacion = confirm(`¿Deseas eliminar el pliego con folio ${item.folio}?`);
    if (confirmacion) {
      this.historial = this.historial.filter(h => h !== item);
    }
  }

  limpiarFiltros(): void {
    this.filtroMatricula = '';
    this.filtroFolio = '';
    this.fechaDesde = '';
    this.fechaHasta = '';
  }
}



import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Interfaces para tipado estático
interface Usuario {
  id: string;
  matricula: string;
  rol: 'admin' | 'user' | 'subadmin';
}

interface Pliego {
  fecha: string;
  usuario: string;
  matricula: string;
  operador: string;
  paciente: string;
  folio: string;
  estado: 'Realizado' | 'Cancelado';
  url: string;
}

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  filtroGeneral: string = '';
  fechaDesde: string = '';
  fechaHasta: string = '';

  // Usuario logueado (obtenido del servicio de autenticación)
  usuarioActual: Usuario = { id: 'U001', matricula: '8972347', rol: 'admin' };
  historial: Pliego[] = [];

  constructor() {
    // Simulación temporal - reemplazar con datos reales del servicio
    this.historial = [
      { fecha: '2025-04-30', usuario: 'A001', matricula: '1234567', operador: '1234567', paciente: 'Juan Pérez', folio: 'F123', estado: 'Realizado', url: 'assets/pliegos/F123.pdf' },
      { fecha: '2025-04-29', usuario: 'S001', matricula: '9878789', operador: '9878789', paciente: 'María López', folio: 'F456', estado: 'Cancelado', url: 'assets/pliegos/F456.pdf' },
      { fecha: '2025-04-28', usuario: 'U001', matricula: '8972347', operador: '8972347', paciente: 'Carlos Ruiz', folio: 'F789', estado: 'Realizado', url: 'assets/pliegos/F789.pdf' }
    ];
  }

  historialFiltrado(): Pliego[] {
    console.log('🔍 === INICIANDO FILTRADO ===');
    console.log('Usuario logueado:', this.usuarioActual);
    console.log('Datos originales:', this.historial);

    let data = [...this.historial]; // Crear una copia para no mutar el original

    // 🔹 Filtro por rol basado en la matrícula del usuario logueado
    if (this.usuarioActual.rol === 'user') {
      console.log('✅ Usuario normal - Filtrando por matrícula:', this.usuarioActual.matricula);
      data = data.filter(item => {
        const coincide = item.matricula.trim() === this.usuarioActual.matricula.trim();
        console.log(`Comparando matrícula: "${item.matricula}" === "${this.usuarioActual.matricula}" = ${coincide}`);
        return coincide;
      });
      console.log('Datos después del filtro por matrícula:', data);
    } else {
      console.log('👑 Usuario admin/subadmin - Acceso a todo el historial');
    }

    // 🔹 Filtro por texto y fechas
    const filtro = this.filtroGeneral.toLowerCase();
    const resultado = data.filter(item => {
      const fechaItem = new Date(item.fecha);
      const desde = this.fechaDesde ? new Date(this.fechaDesde) : null;
      const hasta = this.fechaHasta ? new Date(this.fechaHasta) : null;

      // Validación de fechas
      if (isNaN(fechaItem.getTime()) || (desde && isNaN(desde.getTime())) || (hasta && isNaN(hasta.getTime()))) {
        console.warn('Fecha inválida detectada:', item.fecha, this.fechaDesde, this.fechaHasta);
        return false;
      }

      const cumpleFiltroTexto = !filtro || (
        item.estado.toLowerCase().includes(filtro) ||
        item.operador.toLowerCase().includes(filtro) ||
        item.paciente.toLowerCase().includes(filtro) ||
        item.folio.toLowerCase().includes(filtro) ||
        item.matricula.toLowerCase().includes(filtro)
      );

      const cumpleFechaDesde = !desde || fechaItem >= desde;
      const cumpleFechaHasta = !hasta || fechaItem <= hasta;

      return cumpleFiltroTexto && cumpleFechaDesde && cumpleFechaHasta;
    });

    console.log('Resultado final:', resultado);
    console.log('Total de registros mostrados:', resultado.length);
    console.log('=== FIN FILTRADO ===\n');

    return resultado;
  }

  eliminarPliego(item: Pliego): void {
    const confirmacion = confirm(`¿Deseas eliminar el pliego con folio ${item.folio}?`);
    if (confirmacion) {
      this.historial = this.historial.filter(h => h !== item);
      console.log('🗑️ Pliego eliminado:', item.folio);
    }
  }

  limpiarFiltros(): void {
    this.filtroGeneral = '';
    this.fechaDesde = '';
    this.fechaHasta = '';
    console.log('🧹 Filtros limpiados');
  }

  // 🔧 Métodos para cambio dinámico de rol
  cambiarARolAdmin(): void {
    this.usuarioActual.rol = 'admin';
    console.log('🔄 Cambiado a rol admin');
  }

  cambiarARolUser(): void {
    this.usuarioActual.rol = 'user';
    console.log('🔄 Cambiado a rol user');
  }

  cambiarARolSubadmin(): void {
    this.usuarioActual.rol = 'subadmin';
    console.log('🔄 Cambiado a rol subadmin');
  }

  // 🎯 Método para obtener el rol actual (útil para mostrar en el template)
  getRolActual(): string {
    return this.usuarioActual.rol;
  }

  // 🛤️ trackBy para optimizar el renderizado con *ngFor
  trackByFolio(index: number, item: Pliego): string {
    return item.folio;
  }
}
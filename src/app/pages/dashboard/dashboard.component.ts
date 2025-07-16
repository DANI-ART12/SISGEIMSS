import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports:[ CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  trasladosHoy: any[] = [];
  trasladosProximos: any[] = [];

  ngOnInit(): void {
    const hoy = this.formatearFecha(new Date());

    const todosLosTraslados = [
      { fecha: '2025-07-16', hora: '10:00', paciente: 'Juan Pérez', lugar: 'Hospital General', operador: 'Carlos', estado: 'Pendiente' },
      { fecha: '2025-07-21', hora: '08:30', paciente: 'Ana Martínez', lugar: 'IMSS Norte', operador: '', estado: 'Pendiente' },
      { fecha: '2025-07-16', hora: '13:00', paciente: 'Luis Ramírez', lugar: 'Clínica 45', operador: 'Miguel', estado: 'En curso' },
      { fecha: '2025-07-22', hora: '11:00', paciente: 'Sofía López', lugar: 'Hospital Ángeles', operador: '', estado: 'Pendiente' }
    ];

    this.trasladosHoy = todosLosTraslados.filter(t => t.fecha === hoy);
    this.trasladosProximos = todosLosTraslados.filter(t => t.fecha > hoy);
  }

  cambiarEstado(traslado: any): void {
    if (traslado.estado === 'Pendiente') {
      traslado.estado = 'En curso';
    } else if (traslado.estado === 'En curso') {
      traslado.estado = 'Finalizado';
    }
  }

  formatearFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0]; // YYYY-MM-DD
  }
}


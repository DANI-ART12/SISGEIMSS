import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Play,
  Undo,
  X,
  CheckCircle,
  Slash,
  ArrowRightCircle
} from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  iconMap = {
    avanzar: Play,
    revertir: Undo,
    cancelar: X,
    finalizado: CheckCircle,
    cancelado: Slash,
    proximo: ArrowRightCircle,
  };

  trasladosHoy: any[] = [];
  trasladosProximos: any[] = [];
  operadores: string[] = ['Carlos', 'Miguel', 'Fernanda', 'Laura'];

  ngOnInit(): void {
    const hoy = this.formatearFecha(new Date());
  
    const todosLosTraslados = [
      { numeroPliego: 'L1232025', fecha: hoy, hora: '10:00', paciente: 'Juan Pérez', lugar: 'Hospital General', operador: 'Carlos', estado: 'Pendiente', guardado: false },
      { numeroPliego: 'F1242025', fecha: hoy, hora: '13:00', paciente: 'Luis Ramírez', lugar: 'Clínica 45', operador: 'Miguel', estado: 'En curso', guardado: false },
      { numeroPliego: 'L0052024', fecha: '2025-08-21', hora: '08:30', paciente: 'Ana Martínez', lugar: 'IMSS Norte', operador: '', estado: 'Pendiente', guardado: false },
      { numeroPliego: 'F0072024', fecha: '2025-08-22', hora: '11:00', paciente: 'Sofía López', lugar: 'Hospital Ángeles', operador: '', estado: 'Pendiente', guardado: false }
    ];
  
    this.trasladosHoy = todosLosTraslados.filter(t => t.fecha === hoy);
    this.trasladosProximos = todosLosTraslados.filter(t => t.fecha > hoy);
  }
  
  guardarMotivo(traslado: any) {
    traslado.guardado = true;
  }
  cambiarEstado(traslado: any): void {
    if (traslado.estado === 'Pendiente') {
      traslado.estado = 'En curso';
    } else if (traslado.estado === 'En curso') {
      traslado.estado = 'Finalizado';
    }
  }

  revertirEstado(traslado: any): void {
    if (traslado.estado === 'En curso') {
      traslado.estado = 'Pendiente';
    } else if (traslado.estado === 'Finalizado') {
      traslado.estado = 'En curso';
    }
  }

  cancelarTraslado(traslado: any): void {
    traslado.estado = 'Cancelado';
    traslado.motivoCancelacion = '';
  }

  formatearFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0];
  }
}

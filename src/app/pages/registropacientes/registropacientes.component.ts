import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface HistorialPaciente {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  nss: string;
  domicilio: string;
  traslados: {
    hospital: string;
    motivo: string;
  }[];
}

@Component({
  standalone: true,
  selector: 'app-registropacientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './registropacientes.component.html',
  styleUrls: []
})
export class RegistropacientesComponent {
  filtro: string = '';

  // Lista de ejemplo
  historialPacientes: HistorialPaciente[] = [
    {
      nombre: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'Gómez',
      nss: '12345678901',
      domicilio: 'Calle Falsa 123',
      traslados: [
        { hospital: 'Hospital General', motivo: 'Estudio' },
        { hospital: 'Clínica IMSS', motivo: 'Operación' }
      ]
    },
    {
      nombre: 'María',
      primerApellido: 'López',
      segundoApellido: 'Ramírez',
      nss: '10987654321',
      domicilio: 'Avenida Siempre Viva 742',
      traslados: [
        { hospital: 'Hospital Infantil', motivo: 'Alta' }
      ]
    }
  ];

  // Filtrar por nombre o NSS
  get historialFiltrado(): HistorialPaciente[] {
    if (!this.filtro.trim()) return this.historialPacientes;
    const filtroLower = this.filtro.toLowerCase();
    return this.historialPacientes.filter(p =>
      `${p.nombre} ${p.primerApellido} ${p.segundoApellido}`.toLowerCase().includes(filtroLower) ||
      p.nss.toLowerCase().includes(filtroLower)
    );
  }
}

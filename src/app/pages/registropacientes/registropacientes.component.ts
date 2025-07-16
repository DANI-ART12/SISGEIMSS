import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Paciente {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  nss: string;
  telefono: string;
  domicilio: string;
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
  mostrarFormulario: boolean = false;

  nuevoPaciente: Paciente = this.crearPacienteVacio();

  // Lista inicial con algunos pacientes de ejemplo (puedes eliminar o modificar)
  pacientes: Paciente[] = [
    {
      nombre: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'Gómez',
      nss: '12345678901',
      telefono: '5512345678',
      domicilio: 'Calle Falsa 123'
    },
    {
      nombre: 'María',
      primerApellido: 'López',
      segundoApellido: 'Ramírez',
      nss: '10987654321',
      telefono: '5598765432',
      domicilio: 'Avenida Siempre Viva 742'
    }
  ];

  // Getter para devolver pacientes filtrados según texto en filtro
  get pacientesFiltrados(): Paciente[] {
    if (!this.filtro.trim()) {
      return this.pacientes;
    }
    const filtroMinusculas = this.filtro.toLowerCase();
    return this.pacientes.filter(p =>
      (`${p.nombre} ${p.primerApellido} ${p.segundoApellido}`)
        .toLowerCase()
        .includes(filtroMinusculas)
    );
  }

  agregarPaciente() {
    // Validación básica para campos obligatorios
    if (
      !this.nuevoPaciente.nombre.trim() ||
      !this.nuevoPaciente.primerApellido.trim() ||
      !this.nuevoPaciente.nss.trim()
    ) {
      alert('Por favor, complete al menos Nombre, Primer Apellido y NSS.');
      return;
    }

    // Agregar copia del nuevo paciente al arreglo
    this.pacientes.push({ ...this.nuevoPaciente });

    // Resetear el formulario
    this.nuevoPaciente = this.crearPacienteVacio();

    // Ocultar formulario
    this.mostrarFormulario = false;
  }

  crearPacienteVacio(): Paciente {
    return {
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      nss: '',
      telefono: '',
      domicilio: ''
    };
  }
}

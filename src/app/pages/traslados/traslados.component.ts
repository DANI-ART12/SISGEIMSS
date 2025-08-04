import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Paciente {
  nombre: string;
  primerApellido: string;
  segundoApellido?: string;
  nss: string;
  telefono?: string;
  domicilio?: string;
}

@Component({
  selector: 'app-traslados',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './traslados.component.html',
  styleUrls: ['./traslados.component.css']
})
export class TrasladosComponent implements OnInit {

  numeroLocal: string = '001';

  traslado = {
    folio: '',
    nombre: '',
    afiliacion: '',
    telefono: '',
    fecha: '',
    origen: '',
    destino: '',
    requiere: '',
    tipoServicio: '',
    posicion: ''
  };

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

  pacientesFiltrados: Paciente[] = [];
  mostrarSugerencias: boolean = false;
  mostrarFormularioPacienteNuevo: boolean = false;

  nuevoPaciente: Paciente = this.crearPacienteVacio();

  ngOnInit() {
    if (!this.traslado.folio) {
      this.generarFolio();
    }
  }

  generarFolio() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    this.traslado.folio = `L${this.numeroLocal}${anio}`;
  }

  onNombreInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim();

    this.traslado.nombre = value;

    if (value.length > 0) {
      this.pacientesFiltrados = this.pacientes.filter((p) =>
        (`${p.nombre} ${p.primerApellido} ${p.segundoApellido ?? ''}`)
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      this.mostrarSugerencias = this.pacientesFiltrados.length > 0;
      this.mostrarFormularioPacienteNuevo = !this.mostrarSugerencias;
    } else {
      this.mostrarSugerencias = false;
      this.mostrarFormularioPacienteNuevo = false;
    }
  }

  seleccionarPaciente(paciente: Paciente) {
    this.traslado.nombre = `${paciente.nombre} ${paciente.primerApellido} ${paciente.segundoApellido ?? ''}`.trim();
    this.traslado.telefono = paciente.telefono ?? '';
    this.traslado.afiliacion = paciente.nss;
    // Opcional: llenar domicilio u otros datos en traslado si quieres

    this.mostrarSugerencias = false;
    this.mostrarFormularioPacienteNuevo = false;
  }

  crearPacienteVacio(): Paciente {
    return {
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      nss: '',
      telefono: '',
      domicilio: '',
    };
  }

  agregarPacienteNuevo() {
    if (!this.nuevoPaciente.nombre.trim() || !this.nuevoPaciente.primerApellido.trim() || !this.nuevoPaciente.nss.trim()) {
      alert('Por favor, complete Nombre, Primer Apellido y NSS para agregar paciente.');
      return;
    }

    // Agregar paciente nuevo
    this.pacientes.push({ ...this.nuevoPaciente });

    // Seleccionar el paciente recién agregado
    this.seleccionarPaciente(this.nuevoPaciente);

    // Resetear formulario
    this.nuevoPaciente = this.crearPacienteVacio();
    this.mostrarFormularioPacienteNuevo = false;
  }

  guardarTraslado() {
    if (this.traslado.folio) {
      console.log('Traslado guardado', this.traslado);
      alert('Traslado guardado con éxito');
      // Aquí agregar lógica para guardar traslado, API, etc.
    }
  }
}

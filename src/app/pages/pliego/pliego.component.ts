import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pliego',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pliego.component.html',
  styleUrls: ['./pliego.component.css']
})
export class PliegoComponent {
  mostrarFormulario: boolean = false;

  // Datos ficticios iniciales
  datosPliego = {
    oficioNumero: '001/2025',
    lugarFecha: 'Oaxaca de Juárez, Oax., a 18 de diciembre de 2025',
    nombreCargoDestinatario: 'Lic. Juan Pérez - Jefe de Servicios',
    nombreComisionado: 'Ing. Roberto Gómez',
    matricula: '12345678',
    tipoContratacion: 'Base',
    adscripcion: 'Departamento de Sistemas',
    destino: 'Ciudad de México',
    diasComision: '2 días',
    fechaComision: '20 y 21 de diciembre',
    objetoComision: 'Capacitación Técnica',
    medioTransporte: 'Autobús',
    unidadInformacion: 'Unidad de Informática',
    centroCostos: '5501',
    justificacionInhabiles: 'N/A',
    justificacionModificacion: 'N/A',
    personaSolicita: 'Lic. Ricardo Salinas'
  };

  abrirFormulario() { this.mostrarFormulario = true; }
  cerrarFormulario() { this.mostrarFormulario = false; }
  imprimir() { window.print(); }
}
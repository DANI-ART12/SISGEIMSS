import { Component, ElementRef, ViewChild } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informe-comision',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './informecomision.component.html',
  styleUrls: ['./informecomision.component.css']
})
export class InformeComisionComponent {
  @ViewChild('pdfContent') pdfContenido!: ElementRef;

  // Datos de pliego comisión y registro-km
  doctoraNombre = 'Dra. Fernanda Patricia';
  doctoraCargo = 'Directora del H.G.Z No. 1';
  fechaCreacion = '2025-07-09';
  folio = '001/2025';
  lugarDestino = 'Hospital General de Oaxaca';
  motivoComision = 'traslado del paciente';
  pacienteNSS = '1234567890';
  pacienteNombre = 'Juan Pérez';
  horaSalida = '08:00';
  fechaSalida = '2025-07-09';
  horaLlegada = '09:30';
  fechaLlegada = '2025-07-09';
  horaRegreso = '10:00';
  horaLlegadaFinal = '11:00';
  fechaRegreso = '2025-07-09';
  ambulanciaECCO = 'ECCO-1234';

  kmInicial = 15000;
  kmFinal = 15045;
  get totalKm() {
    return this.kmFinal - this.kmInicial;
  }

  operadorNombre = 'Carlos Martínez';
  operadorCategoria = 'Operador';
  operadorMatricula = 'OP-123';

  // Edición
  enEdicion = false;
  informeTexto = '';

  editarInforme() {
    this.informeTexto = this.generarTextoInforme();
    this.enEdicion = true;
  }

  cancelarEdicion() {
    this.enEdicion = false;
  }

  guardarCambios() {
    this.enEdicion = false;
  }

  generarTextoInforme(): string {
    return `INFORME COMISIÓN

                                                                          Fecha: ${this.fechaCreacion}
${this.doctoraNombre}
${this.doctoraCargo}

Por medio del presente le informo que fui comisionado con el Pliego Folio ${this.folio} al ${this.lugarDestino}
para ${this.motivoComision} (Paciente NSS: ${this.pacienteNSS}, Nombre: ${this.pacienteNombre}) saliendo del H.G.Z 1 de Oaxaca a las
${this.horaSalida} del día ${this.fechaSalida}, llegando al ${this.lugarDestino} a las ${this.horaLlegada} del día ${this.fechaLlegada},
en la ambulancia ECCO (${this.ambulanciaECCO}).

Se entrega el paciente sin ninguna novedad, saliendo del ${this.lugarDestino} a las ${this.horaRegreso} y llegando nuevamente al HGZ a las ${this.horaLlegadaFinal} del día ${this.fechaRegreso}.

KM Inicial: ${this.kmInicial}, KM Final: ${this.kmFinal}, Total recorrido: ${this.totalKm} km.

Operador: ${this.operadorNombre}, Categoría: ${this.operadorCategoria}, Matrícula: ${this.operadorMatricula}.
`;
  }

  imprimirInforme(): void {
    const contenido = this.enEdicion ? this.informeTexto.replace(/\n/g, '<br>') : this.generarTextoInforme().replace(/\n/g, '<br>');

    // Crea un contenedor temporal para renderizar
    const elementoTemp = document.createElement('div');
    elementoTemp.innerHTML = `<div style="font-family:sans-serif; white-space:pre-wrap;">${contenido}</div>`;

    const options = {
      margin: 10,
      filename: `informe-${this.folio}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(elementoTemp).save();
  }
}

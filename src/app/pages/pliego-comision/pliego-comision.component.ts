import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pliego-comision',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pliego-comision.component.html',
  styleUrls: ['./pliego-comision.component.css']
})
export class PliegoComisionComponent {
  numeroFolio: string = '1234/2024';
  fechaActual: string = new Date().toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // --- Variables primera tabla ---
  funcionarioSolicitante = '';
  categoria = '';
  dependencia = '';
  matricula = '';
  nombreComisionado = '';
  rfc = '';
  curp = '';
  tipoBase = false;
  tipoConfianza = false;
  categoriaNumNombre = '';
  telefonoOficina = '';
  objetoComision = '';
  lugaresComision = '';
  periodo = '';
  totalDias: number | null = null;

  // Viáticos y autorizaciones
  cuotaDiariaViaticos = '';
  anticipoViaticos = '';
  anticipoPasajes = '';
  anticipoVehiculo = '';
  medioAvion = false;
  medioVehiculoOficial = false;
  medioAutobus = false;
  medioVehiculoInstitucional = false;
  medioEcco = false;
  disponibilidadPresupuestal = '';

  // Vale Tesorería
  valeBuenoPor = '';
  valeRecibiCantidad = '';
  valeCantidadLetra = '';
  valeDiasViaticos: number | null = null;
  valeValorPasajes = '';
  valeValorPasajesLetra = '';
  valeLugarFecha = '';

  // Certificado Tránsito y Permanencia
  certificadoFilas = Array.from({ length: 5 }, () => ({
    lugarFecha: '',
    llegada: '',
    salida: '',
    firma: ''
  }));

  // Reanudación de labores
  reanudaFecha = '';
  reanudaFirma = '';

  // Liquidación (última tabla)
  liqAnticipoViaticosCargo = '';
  liqAnticipoViaticosAbono = '';
  liqAnticipoPasajesCargo = '';
  liqAnticipoPasajesAbono = '';
  liqCertificacionCargo = '';
  liqCertificacionAbono = '';
  liqPasajesCargo = '';
  liqPasajesAbono = '';
  liqVehiculoCargo = '';
  liqVehiculoAbono = '';
  liqTrasladoCargo = '';
  liqTrasladoAbono = '';
  liqPrimaCargo = '';
  liqPrimaAbono = '';
  liqSumaCargo = '';
  liqSumaAbono = '';
  liqSaldoCargo = '';
  liqSaldoAbono = '';
  liqRecibiCantidad = '';
  liqRecibiCantidadLetra = '';

  imprimir(): void {
    const contenido = document.getElementById('printArea')?.innerHTML;
    if (!contenido) return;

    const ventana = window.open('', '_blank', 'width=816,height=1056');
    if (!ventana) {
      alert('La ventana emergente fue bloqueada por el navegador.');
      return;
    }

    ventana.document.open();
    ventana.document.write(`
      <html>
        <head>
          <title>Impresión Pliego Comisión</title>
          <link href="styles.css" rel="stylesheet" />
          <style>
            @page { size: letter; margin: 8mm; }
            body {
              margin: 0;
              padding: 0;
              font-family: 'Times New Roman', serif;
              font-size: 8.5pt;
              background: white;
              color: black;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-area {
              width: 100%;
              max-width: 816px;
              margin: auto;
              padding: 8mm;
            }
            table { border-collapse: collapse; width: 100%; }
            td { border: 1px solid black; padding: 2px; }
            .page-break { page-break-before: always; }
            * { page-break-inside: avoid !important; }
          </style>
        </head>
        <body>
          <div class="print-area">${contenido}</div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    ventana.document.close();
  }
}

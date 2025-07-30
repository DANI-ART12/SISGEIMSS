import { Component, ElementRef, ViewChild } from '@angular/core';

declare const html2pdf: any;

@Component({
  selector: 'app-pliego-comision',
  templateUrl: './pliego-comision.component.html',
  styleUrls: ['./pliego-comision.component.css']
})
export class PliegoComisionComponent {
  @ViewChild('pdfContenido') pdfContenido!: ElementRef;

  numeroPliego = '1234/2024';
  fecha = '16 de julio de 2025';

  solicitanteNombre = 'LIC. SENORINA CASTRO MORENO';
  solicitanteCargo = 'M23 JEFE DE SERVICIOS DE DESARROLLO DE PERSONAL';
  solicitanteMatricula = '99217598';

  comisionadoNombre = 'LIC. MARIA DEL PILAR ORTEGA GARCÍA';
  comisionadoTipoContratacion = 'Confianza A';
  comisionadoMatricula = '99218665';
  grupoJerarquico = 'N49 JEFE A DEPTO CAPACIT Y TRANSP';
  telefono = '951 515 27 23';

  motivo = 'Capacitación sobre declaración patrimonial.';
  lugarComision = 'SALINA CRUZ, OAX';
  periodo = 'Del 22 al 24 de mayo 2024';
  totalDias = 'TRES';
  transporte = 'Traslado terrestre';

  cuotaDiaria = '$1,796.64';
  anticipoViaticos = '-';
  anticipoPasajes = '-';
  subtotal = '$5,389.92';
  gastoTotal = '$5,389.92';

  presupuestoDisponible = '$42061603';
  clavePresupuestal = '219001 700100 Cuenta 42061603';
  responsablePresupuesto = 'C. ARACELY RAMÍREZ VÁSQUEZ (MAT 311210232)';

  firmaEmpleado = 'LIC. MARIA DEL PILAR ORTEGA GARCÍA';

  imprimirDirecto(): void {
    const contenidoClonado = this.pdfContenido.nativeElement.cloneNode(true) as HTMLElement;
    const botones = contenidoClonado.querySelectorAll('.print\\:hidden');
    botones.forEach(el => el.remove());

    const ventana = window.open('', '_blank', 'width=816,height=1056');
    if (!ventana) {
      alert('El navegador bloqueó la ventana emergente.');
      return;
    }

    const documento = `
    <html>
      <head>
        <title>Pliego de Comisión</title>
        <style>
          @page { size: letter; margin: 10mm; }
          body {
            font-family: 'Times New Roman', serif;
            font-size: 10pt;
            margin: 0;
            background: white;
            color: black;
          }
          * { page-break-inside: avoid; }
          .text-center { text-align: center; }
          .border { border: 1px solid black; border-collapse: collapse; }
          .border td, .border th { border: 1px solid black; padding: 4px; }
          .certificado-linea td { height: 50px; }
        </style>
      </head>
      <body>
        ${contenidoClonado.innerHTML}
        <script>
          window.onload = () => {
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          };
        </script>
      </body>
    </html>`;
    ventana.document.open();
    ventana.document.write(documento);
    ventana.document.close();
  }
}

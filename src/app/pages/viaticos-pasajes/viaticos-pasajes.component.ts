import { Component } from '@angular/core';
import {CommonModule}from '@angular/common';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-viaticos-pasajes',
  imports: [CommonModule,FormsModule],
  templateUrl: './viaticos-pasajes.component.html',
  styleUrl: './viaticos-pasajes.component.css'
})
export class ViaticosPasajesComponent {
    // Objeto para almacenar la información del funcionario
    funcionario = {
      dependencia: 'JEFATURA DE SERVICIOS DESARROLLO DE PERSONAL',
      matricula: '8509638',
      nombre: 'LUIS ALFONSO RAMOS LOPEZ',
      cargo: 'TITULAR DE LA JEFATURA DE SERVICIOS DE DESARROLLO DE PERSONAL',
      fecha: '25/06/2012',
      clavesPresupuestales: [
        { clave: '21 90 01 700100', descripcion: 'JEFATURA DE SERVICIOS DESARROLLO DE PERSONAL' },
        { clave: '21 90 01 710100', descripcion: 'DEPTO. DELEG. DE PERSONAL' },
        { clave: '21 90 01 720100', descripcion: 'DEPTO. DELEG. DE RELACIONES LABORALES' },
        { clave: '21 90 01 750100', descripcion: 'DEPTO. DELEG. DE SISTEMAS DE INFORMACIÓN' }
      ]
    };
  
    constructor() { }
  
    ngOnInit():void{
  }
  
 
  imprimir() {
    const contenido = document.getElementById('print-area')?.innerHTML;
  
    if (!contenido) {
      console.error("ERROR: No se encontró el elemento con ID 'print-area'.");
      return;
    }
  
    const ventana = window.open('', '_blank', 'width=900,height=650');
  
    if (!ventana) {
      console.error("No se pudo abrir la ventana de impresión.");
      return;
    }
  
    ventana.document.write(`
      <html>
        <head>
          <title>Pliego de Comisión</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              font-family: 'Inter', sans-serif;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            #print-area {
              width: 100%;
              max-width: 210mm;
              margin: 0 auto;
            }
            button { display: none !important; }
            @media print {
              .no-break { page-break-inside: avoid; }
              @page { size: A4; margin: 10mm; }
            }
          </style>
        </head>
        <body>
          <div id="print-area">
            ${contenido}
          </div>
  
          <script>
            window.onload = () => {
              requestAnimationFrame(() => {
                window.print();
                window.onafterprint = () => { window.close(); };
              });
            };
          </script>
        </body>
      </html>
    `);
  
    ventana.document.close();
  }
  







  
}
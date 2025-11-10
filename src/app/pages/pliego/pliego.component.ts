
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pliego',
  imports: [CommonModule,FormsModule],
  templateUrl: './pliego.component.html',
  styleUrls: ['./pliego.component.css']
})
export class PliegoComponent {
   


  imprimirContenido(): void {
    const contenido = document.getElementById('printArea')?.innerHTML;
    if (!contenido) {
      console.error('No se encontró el elemento con id="printArea".');
      return;
    }
  
    const ventana = window.open('', '_blank', 'width=816,height=1056');
    if (!ventana) {
      alert('La ventana emergente fue bloqueada por el navegador.');
      return;
    }
  
    // Tu CSS del componente (copiado aquí dentro)
    const estilos = `
      /* Usa una fuente que se vea limpia para documentos */
      body {
        font-family: 'Inter', sans-serif;
      }
  
      /* Estilo para simular el borde del documento en pantalla */
      .document-page {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                    0 2px 4px -2px rgba(0, 0, 0, 0.1);
        border: 1px solid black;
      }
  
      /* Media Query para impresión */
      @media print {
        .print-container {
            padding: 0 !important;
            background-color: white !important;
        }
        .page-separator {
            display: none !important;
        }
        .document-page {
            box-shadow: none !important;
            border: none !important;
        }
        .page-break {
            page-break-after: always;
        }
        .no-print, 
        .sidebar-container { 
            display: none !important;
        }
        .main-content {
            margin-left: 0 !important;
            width: 100% !important;
        }
      }
  
      .table-cell {
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        padding: 0.25rem 0.5rem;
        display: flex;
        align-items: center;
      }
  
      .viaticos-row {
        height: 1.5rem;
      }
  
      /* --- AJUSTES ESPECÍFICOS PARA IMPRESIÓN --- */
      @page { 
        size: letter;
        margin: 10mm;
      }
      body {
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        background: white;
      }
  
      .print-area {
        width: 7.5in;
        margin: auto;
      }
  
      .document-page {
        page-break-after: always;
        break-inside: avoid;
      }
  
      .document-page:last-of-type {
        page-break-after: auto;
      }
  
      table, tr, td, div {
        page-break-inside: avoid !important;
      }
  
      .border, .border-black, .border-t, .border-b, .border-r {
        border-color: black !important;
        border-width: 1px !important;
      }
    `;
  
    ventana.document.open();
    ventana.document.write(`
      <html>
        <head>
          <title>Impresión Pliego Comisión</title>
          <!-- ✅ Tailwind para mantener tus clases -->
          <script src="https://cdn.tailwindcss.com"></script>
          <style>${estilos}</style>
        </head>
        <body>
          <div class="print-area">${contenido}</div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    ventana.document.close();
  }

  
  
}
  


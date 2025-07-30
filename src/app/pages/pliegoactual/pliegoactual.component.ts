import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pliego-actual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pliegoactual.component.html',
  styleUrls: ['./pliegoactual.component.css'],
})
export class PliegoactualComponent {
  
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
          <title>Impresión</title>
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
            * { page-break-inside: avoid !important; }
          </style>
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

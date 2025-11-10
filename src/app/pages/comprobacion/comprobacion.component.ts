import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Define una interfaz para asegurar la estructura de los datos del pliego
interface PliegoDatos {
  // Encabezado
  cuenta: string;
  cuenta_secundaria: string;

  // Datos del Solicitante/Comisionado
  funcionario_solicitante: string;
  cargo_solicitante: string;
  matricula_solicitante: string;
  dependencia: string;
  empleado_comisionado: string;
  tipo_contratacion: string;
  matricula_comisionado: string;
  grupo_jerarquico: string;
  telefono: string;

  // Datos de la Comisión
  motivo: string;
  periodo_solicitado: string;
  periodo_comprobado: string;
  lugar_comision: string;
  transporte: string;

  // Puedes añadir aquí las propiedades para la Tabla de Liquidación si son dinámicas
  // liquidacion: any[]; 
}

@Component({
  selector: 'app-comprobacion',
  // Es importante que estos módulos estén en el 'imports' del @Component
  // para que Angular pueda reconocer directivas como [(ngModel)] y *ngIf
  imports: [FormsModule, CommonModule], 
  templateUrl: './comprobacion.component.html',
  // Necesitas definir 'standalone: true' si lo estás usando como componente único,
  // si no lo usas, ignora la línea de abajo.
  // standalone: true, 
})
export class ComprobacionComponent {
  mostrarModal = false;

  // Inicialización de 'datos' con todos los campos necesarios
  datos: PliegoDatos = {
    // Valores de ejemplo para que la plantilla no se vea vacía al iniciar
    cuenta: '4578', 
    cuenta_secundaria: '219001 760110 4206 1623',
    
    funcionario_solicitante: 'DRA. TANIA GONZALEZ GUZMAN',
    cargo_solicitante: 'JEFA DE SERVICIOS DE DESARROLLO DE PERSONAL',
    matricula_solicitante: '98210795',
    dependencia: 'ÓRGANO DE OPERACIÓN ADMINISTRATIVA DESCONCENTRADA',
    empleado_comisionado: 'ENF. IVONNE ADELA MARTINEZ MENDOZA',
    tipo_contratacion: 'CONFIANZA B',
    matricula_comisionado: '11871156',
    grupo_jerarquico: 'COORD. EDUC E INV EN SALUD',
    telefono: '9515152033',

    motivo: 'ASISTE A CAPACITACIÓN "SEGUNDO TALLER PARA LA IMPARTICION DEL PROGRAMA DE DESARROLLO GERENCIAL"',
    periodo_solicitado: 'DEL 3 AL 5 DE NOVIEMBRE DEL 2024',
    periodo_comprobado: 'DEL 3 AL 5 DE NOVIEMBRE DEL 2024',
    lugar_comision: 'CIUDAD DE MEXICO',
    transporte: 'TRASLADO TERRESTRE',
  };

  // El objeto temporal para el modal se inicializa copiando el objeto principal
  tempDatos: PliegoDatos = { ...this.datos };

  openModal() {
    // Al abrir, se usa una copia del objeto actual para editar
    this.tempDatos = { ...this.datos }; 
    this.mostrarModal = true;
  }

  closeModal() {
    this.mostrarModal = false;
  }

  confirmarDatos() {
    const confirmacion = confirm('¿Son correctos los datos ingresados?');
    if (confirmacion) {
      // Solo actualiza los datos si el usuario confirma
      this.datos = { ...this.tempDatos }; 
      this.mostrarModal = false;
    }
  }

  imprimir() {
    const contenido = document.getElementById('pliego')?.innerHTML;
    const ventana = window.open('', '_blank', 'width=900,height=650');
    
    // 1. Recopilar todos los estilos de la página actual (¡INCLUIDO TAILWIND!)
    let styleCSS = '';
    for (let i = 0; i < document.styleSheets.length; i++) {
        try {
            // Recorre todas las hojas de estilo y concatena sus reglas
            styleCSS += Array.from(document.styleSheets[i].cssRules)
                .map(rule => rule.cssText)
                .join('\n');
        } catch (e) {
            console.warn("No se pudo leer una hoja de estilo:", e);
        }
    }

    // ... dentro de imprimir()
// ...
ventana!.document.write(`
  <html>
    <head>
      <title>Pliego de Comisión</title>
      <style>
        ${styleCSS}

        /* AJUSTE CLAVE DE ESPACIADO */
        .pliego-compacto .py-1 { padding-top: 2px !important; padding-bottom: 2px !important; }
        .pliego-compacto .py-2 { padding-top: 3px !important; padding-bottom: 3px !important; }
        .pliego-compacto .mb-4 { margin-bottom: 5px !important; }
        .pliego-compacto .mb-6 { margin-bottom: 8px !important; }
        /* FIN AJUSTE CLAVE */
        
        @media print {
            .no-break { page-break-inside: avoid !important; }
            
            @page { 
                size: A4; 
                /* MÁRGENES MUY REDUCIDOS: 10mm en todos lados */
                margin: 10mm; 
            } 
        }
        
        body { 
            margin: 0; 
            padding: 0; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
        }
        #pliego {
            width: 210mm !important; 
            /* Eliminamos el min-height para que el contenido determine el tamaño */
            margin: 0 auto !important;
            box-shadow: none !important; 
            border: none !important;
            padding: 10mm !important; /* Reducir el padding interno de la hoja */
        }
        button { display: none !important; }

      </style>
    </head>
    <body onload="window.print()" class="pliego-compacto">
      ${contenido}
    </body>
  </html>
`);

    
    ventana!.document.close();
    
    // Retraso para el cierre
    setTimeout(() => {
        ventana!.close();
    }, 500); 
}





  
  
}

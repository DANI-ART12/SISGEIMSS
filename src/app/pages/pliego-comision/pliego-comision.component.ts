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
  fraseIzquierda: string = 'Se hará su comprobación en un término de 5 días';
  fraseDerecha: string = 'No se admiten tachaduras ni enmendaduras';

 
  updateFraseIzquierda(event: Event) {
    const target = event.target as HTMLElement;
    this.fraseIzquierda = target.innerText;
  }
  
  updateFraseDerecha(event: Event) {
    const target = event.target as HTMLElement;
    this.fraseDerecha = target.innerText;
  }
  

  // --- Variables primera tabla ---
  funcionarioSolicitante='';
funcionarioSolicitanteNombre = '';
funcionarioSolicitanteCargo='';
funcionarioAutorizaNombre='';
funcionarioAutorizaCargo='';
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
totalDiasTexto = 'TRES DÍAS';

// Firmas editables
nombreFuncionarioSolicitante = '';
cargoFuncionarioSolicitante = '';
nombreFuncionarioAutoriza = '';
cargoFuncionarioAutoriza = '';


  // Viáticos y autorizaciones
  // --- Variables VIÁTICOS Y PASAJES ---
cuotaDiariaViaticos: string = '2,244.64';
anticipoViaticos: string = '1,000.00';
anticipoPasajes: string = '1,000.00';
anticipoVehiculo: string = '0.00';
sumaTotal: string = '2,000.00';

medioAvion: boolean = false;
medioVehiculoOficial: boolean = false;
medioAutobus: boolean = true;
usoVehiculoInstitucional: boolean = true;

tesoreriaGeneralTexto: string = '';


// --- Variables AUTORIZACIONES ESPECÍFICAS ---
autorizacionVehiculoPropio: string = '';
autorizacionMas60Dias: string = '';
autorizacionArrendamiento: string = '';

nombrePresupuestal: string = 'M.A. SALOMON JONAS MEDINA GALLEGOS';
textoPresupuestal: string = 'DISPONIBILIDAD PRESUPUESTAL';
disponibilidadPresupuestal: string = `210101 142901 42061603 $337,421.79\n210101 142901 42061623 $2,297.00`;


  // --- Vale a la Tesorería General ---
valeBuenoPor: string = '';
valeRecibiCantidad: string = '';
valeCantidadLetra: string = '';
valeDiasViaticos: number | null = null;
valeValorPasajes: string = '';
valeValorPasajesLetra: string = '';
valeLugarFecha: string = '';



//-- Números a izquierda y derecha --
numeroIzquierdo: string = '12345';
numeroDerecho: string = '67890';



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

  // FIRMAS ELABORÓ / REVISÓ / CONFORME -->

  anticipoViaticosCargo = '';
anticipoViaticosAbono = '';
anticipoPasajesCargo = '';
anticipoPasajesAbono = '';
liqCertificacionCargo = '';
liqCertificacionAbono = '';
numeroDias: number | null = null;
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
elaboroNombre = '';
elaboroCargo = '';
revisoNombre = '';
revisoCargo = '';
firmaEmpleado = '';
textoRecibiCantidad = 'RECIBÍ LA CANTIDAD DE $__________ (__________________________) POR CONCEPTO DE SALDO A MI FAVOR COMO RESULTADO DE LA LIQUIDACIÓN.';
autorizacionNombre = '';
autorizacionCargo = '';
fechaAutorizacion = '';

  modoEdicion: boolean = false;

  toggleEdicion() {
    this.modoEdicion = !this.modoEdicion;

    if (!this.modoEdicion) {
      // Aquí puedes guardar los datos en un servicio o localStorage si quieres persistencia
      console.log('Datos guardados:', {
        
        categoria: this.categoria,
        dependencia: this.dependencia,
        matricula: this.matricula,
        nombreComisionado: this.nombreComisionado,
        rfc: this.rfc,
        curp: this.curp,
        tipoBase: this.tipoBase,
        tipoConfianza: this.tipoConfianza,
        categoriaNumNombre: this.categoriaNumNombre,
        telefonoOficina: this.telefonoOficina,
        objetoComision: this.objetoComision,
        lugaresComision: this.lugaresComision,
        periodo: this.periodo,
        totalDias: this.totalDias,
        totalDiasTexto: this.totalDiasTexto,
        cuotaDiariaViaticos: this.cuotaDiariaViaticos,
        anticipoViaticos: this.anticipoViaticos,
        anticipoPasajes: this.anticipoPasajes,
        anticipoVehiculo: this.anticipoVehiculo,
        sumaTotal: this.sumaTotal,
        medioAvion: this.medioAvion,
        medioVehiculoOficial: this.medioVehiculoOficial,
        medioAutobus: this.medioAutobus,
        
        disponibilidadPresupuestal: this.disponibilidadPresupuestal,
        valeLugarFecha: this.valeLugarFecha,
        certificadoFilas: this.certificadoFilas,
        // ... agrega los demás campos según necesites
      });
    }
  }

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


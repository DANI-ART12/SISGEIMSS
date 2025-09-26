import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pliego-comision',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pliego-comision.component.html',
  styleUrls: ['./pliego-comision.component.css']
})
export class PliegoComisionComponent implements OnInit {
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
  mostrarFormulario = false;

  pliego = {
    numeroFolio: '',          // Número de folio
    usuario: '',              // Usuario logueado
    objetoComision: '',       // Objeto de comisión
    lugaresComision: '',      // Lugares de comisión
    periodo: '',              // Periodo
    totalDias: 0,             // Total de días
  
    // Alto Costo de Vida
    altoCostoVida: 'No',      // "Sí" o "No"
    porcentajeCostoVida: 0,   // Porcentaje de costo de vida
    cantidadBase: 0,          // Cantidad base
    resultadoCostoVida: 0,     // Resultado calculado
  
    // Certificación por Días
    montoDiario: 0,           // Monto diario
    operadorCertificacion: '*', // Operador: +, -, *, /
    constanteCertificacion: 0, // Constante para operar
    resultadoCertificacion: 0,  // Resultado calculado
    constante: 1.31 * 1870.53,
    operador: '+',   

 // Alto Coste de Vida
      acvBase: 0,
     acvPorcentaje: 0,
     acvOperador: '+',
    acvConstante: 0,
     resultadoACV: 0,


     funcionarioSolicitante:'',
     funcionarioAutoriza:'',
     categoria:'',
     dependencia:'',
     matricula:'',
     nombreComisionado:'',
     cantidadBCertificacion:'0',


     operador1:'0',
     operador2:'0',
     operador3:'0',
    
     paciente:'',
     pacientenss:'',
     

     

  };

  otroPaciente: boolean = false;
  pacienteB = {
    nombre: '',
    nss: '',
    lugarComision: '',
    objetoComision: ''
  };

  // --- Variables primera tabla ---
  funcionarioSolicitante = '';
  funcionarioSolicitanteNombre = '';
  funcionarioSolicitanteCargo = '';
  funcionarioAutorizaNombre = '';
  funcionarioAutorizaCargo = '';
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
  disponibilidadPresupuestal: string = `210101 142901 42061603 $337,421.79`;
 disponibilidadPresupuestalnuevo:string =`210101 142901 42061623 $2,297.00`;
  
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
  certificadoFilas = Array.from({ length: 4 }, () => ({
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
  nombreComisionadoAutorizacion = '';

  modoEdicion: boolean = false;

  fechaInicio:string='';
  fechaFin:string='';
  altoCostoVida:boolean=false;
 
  ngOnInit() {
    this.cargarDatos();
  }

  toggleEdicion() {
    this.modoEdicion = !this.modoEdicion;

    if (!this.modoEdicion) {
      this.guardarDatos();
    }
  }

  guardarDatos() {
    const datosAGuardar = {
      funcionarioSolicitante: this.funcionarioSolicitante,
      funcionarioSolicitanteNombre: this.funcionarioSolicitanteNombre,
      funcionarioSolicitanteCargo: this.funcionarioSolicitanteCargo,
      funcionarioAutorizaNombre: this.funcionarioAutorizaNombre,
      funcionarioAutorizaCargo: this.funcionarioAutorizaCargo,
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
      usoVehiculoInstitucional: this.usoVehiculoInstitucional,
      tesoreriaGeneralTexto: this.tesoreriaGeneralTexto,
      autorizacionVehiculoPropio: this.autorizacionVehiculoPropio,
      autorizacionMas60Dias: this.autorizacionMas60Dias,
      autorizacionArrendamiento: this.autorizacionArrendamiento,
      nombrePresupuestal: this.nombrePresupuestal,
      textoPresupuestal: this.textoPresupuestal,
      disponibilidadPresupuestal: this.disponibilidadPresupuestal,
      
      valeBuenoPor: this.valeBuenoPor,
      valeRecibiCantidad: this.valeRecibiCantidad,
      valeCantidadLetra: this.valeCantidadLetra,
      valeDiasViaticos: this.valeDiasViaticos,
      valeValorPasajes: this.valeValorPasajes,
      valeValorPasajesLetra: this.valeValorPasajesLetra,
      valeLugarFecha: this.valeLugarFecha,
      numeroIzquierdo: this.numeroIzquierdo,
      numeroDerecho: this.numeroDerecho,
      certificadoFilas: this.certificadoFilas,
      reanudaFecha: this.reanudaFecha,
      reanudaFirma: this.reanudaFirma,
      anticipoViaticosCargo: this.anticipoViaticosCargo,
      anticipoViaticosAbono: this.anticipoViaticosAbono,
      anticipoPasajesCargo: this.anticipoPasajesCargo,
      anticipoPasajesAbono: this.anticipoPasajesAbono,
      liqCertificacionCargo: this.liqCertificacionCargo,
      liqCertificacionAbono: this.liqCertificacionAbono,
      numeroDias: this.numeroDias,
      liqPasajesCargo: this.liqPasajesCargo,
      liqPasajesAbono: this.liqPasajesAbono,
      liqVehiculoCargo: this.liqVehiculoCargo,
      liqVehiculoAbono: this.liqVehiculoAbono,
      liqTrasladoCargo: this.liqTrasladoCargo,
      liqTrasladoAbono: this.liqTrasladoAbono,
      liqPrimaCargo: this.liqPrimaCargo,
      liqPrimaAbono: this.liqPrimaAbono,
      liqSumaCargo: this.liqSumaCargo,
      liqSumaAbono: this.liqSumaAbono,
      liqSaldoCargo: this.liqSaldoCargo,
      liqSaldoAbono: this.liqSaldoAbono,
      elaboroNombre: this.elaboroNombre,
      elaboroCargo: this.elaboroCargo,
      revisoNombre: this.revisoNombre,
      revisoCargo: this.revisoCargo,
      firmaEmpleado: this.firmaEmpleado,
      textoRecibiCantidad: this.textoRecibiCantidad,
      autorizacionNombre: this.autorizacionNombre,
      autorizacionCargo: this.autorizacionCargo,
      fechaAutorizacion: this.fechaAutorizacion,
      nombreComisionadoAutorizacion: this.nombreComisionadoAutorizacion
    };

    localStorage.setItem('pliegoComisionDatos', JSON.stringify(datosAGuardar));
    console.log('Datos guardados en localStorage');
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
  
  guardarPliego() {
    // Aquí después puedes implementar la lógica real de guardado
    alert('Datos del pliego guardados (simulado)');
    this.mostrarFormulario = false; // oculta el formulario después de guardar
  }
  
  cancelarTraslado() {
    this.mostrarFormulario = false; // simplemente oculta el formulario
  }

  onOtroPacienteChange(event: any) {
    this.otroPaciente = event.target.value === 'true';
  }
  // Calcular ACV
  calcularCostoVida() {
    let res = 0;
    switch(this.pliego.acvOperador) {
      case '+': res = this.pliego.acvBase + (this.pliego.acvPorcentaje * this.pliego.acvConstante); break;
      case '-': res = this.pliego.acvBase - (this.pliego.acvPorcentaje * this.pliego.acvConstante); break;
      case '*': res = this.pliego.acvBase * (this.pliego.acvPorcentaje * this.pliego.acvConstante); break;
      case '/': res = this.pliego.acvConstante !== 0 ? this.pliego.acvBase / (this.pliego.acvPorcentaje * this.pliego.acvConstante) : 0; break;
    }
    this.pliego.resultadoACV = +res.toFixed(2);
  }

// Calcular Certificación por Días
calcularCertificacion() {
  let { montoDiario, totalDias, constanteCertificacion, cantidadBCertificacion,
        operador1, operador2, operador3 } = this.pliego;

  let resultado = montoDiario ?? 0;

  // KM operador1 divisor
  if (totalDias !== undefined && totalDias !== null && operador1) {
    resultado = this.aplicarOperacion(resultado, operador1, totalDias);
  }

  // resultado operador2 factor
  if (constanteCertificacion !== undefined && constanteCertificacion !== null && operador2) {
    resultado = this.aplicarOperacion(resultado, operador2, constanteCertificacion);
  }

  // resultado operador3 cantidad base
  if (cantidadBCertificacion !== undefined && cantidadBCertificacion !== null && operador3) {
    resultado = this.aplicarOperacion(resultado, operador3, Number(cantidadBCertificacion));
  }

  // Truncar a 2 decimales
  this.pliego.resultadoCertificacion = Math.trunc(resultado * 100) / 100;
}

aplicarOperacion(a: number, operador: string, b: number): number {
  switch (operador) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 0;
    default: return a;
  }
}

   
  
  cargarDatos() {
    const datos = localStorage.getItem('pliegoComisionDatos');
    if (datos) {
      const obj = JSON.parse(datos);
      Object.assign(this, obj);
      console.log('Datos cargados desde localStorage');
    }
  }

  // Función pública llamada desde el botón "Imprimir"
  forzarImpresion(): void {
    if (this.modoEdicion) {
      this.modoEdicion = false;

      // Espera a que Angular actualice el DOM antes de imprimir
      setTimeout(() => {
        this.imprimirContenido();
      }, 100);
    } else {
      this.imprimirContenido();
    }
  }

  // Función interna que hace el trabajo de abrir la ventana y mandar a imprimir
  private imprimirContenido(): void {
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

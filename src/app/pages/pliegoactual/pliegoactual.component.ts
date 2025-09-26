import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pliego-actual',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pliegoactual.component.html',
  styleUrls: ['./pliegoactual.component.css'],
})
export class PliegoactualComponent implements OnInit {
  modoEdicion = false;
  mostrarModal = false;

  // Variables del pliego
  funcionarioSolicitante = 'LIC. SENORINA CASTRO MORENO';
  matriculaSolicitante = '99217598';
  cargoSolicitante = 'JEFE DE SERVICIOS DE DESARROLLO DE PERSONAL';
  dependencia = 'Órgano de Operación Administrativa Desconcentrada';

  comisionado = 'LIC. MARIA DEL PILAR ORTEGA GARCÍA';
  tipoContratacion = 'Confianza A';
  matriculaComisionado = '99218665';
  grupoJerarquico = 'N49 JEFE A DEPTO CAPACIT Y TRANSP';
  telefono = '951 515 27 23';

  motivo = 'Asiste a dar capacitación y apoyo para la declaración patrimonial y de intereses 2024.';
  lugar = 'SALINA CRUZ, OAX';
  periodo = 'Del 22 al 24 de mayo 2024';
  totalDias = 'TRES';
  transporte = 'Traslado terrestre';

  funcionarioSolicitanteFirma: string = '';
  cargoSolicitanteFirma: string = '';
  funcionarioAutorizaFirma: string = '';
  cargoAutoriza: string = '';

  // Viáticos
  cuotaDiaria = '';
  anticipoPeaje = '';
  subtotalViaticos = '';
  boletoAvion = '';
  anticipoViaticos = '';
  anticipoVehiculo = '';
  anticipoPasajes = '';
  gastosTotal = '';
  disponibilidadPresupuestal = '';
  clavePresupuestal = '';

  // Vale
  buenoPor = '';
  diasVale = '';
  valorPasajes = '';
  cantidadRecibida = '';
  firmaComisionado = '';
  firmaCargoComisionado = '';
  firmaAutorizaComisionado = '';
  firmaCargoAutorizaComisionado = '';

  textoNota: string = 'No se admitirán tachaduras ni enmendaduras...';
  codigoFormato: string = '1270-009-036';

  // Variables del modal
  modalFuncionarioSolicitante = '';
  modalMatriculaSolicitante = '';
  modalCargoSolicitante = '';
  modalDependencia = '';
  modalFuncionarioAutoriza = '';
  modalMotivo = '';
  modalLugar = '';
  modalPeriodo = '';
  modalTotalDias = '';
  modalTransporte = '';

  ngOnInit() {
    const datos = localStorage.getItem('pliegoActual');
    if (datos) Object.assign(this, JSON.parse(datos));

    // Escucha ESC para cerrar modal
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.mostrarModal) {
        this.cerrarModal();
      }
    });
  }

  // Toggle edición del pliego
  toggleEdicion() {
    this.modoEdicion = !this.modoEdicion;
    if (!this.modoEdicion) {
      this.guardarPliego();
    }
  }

  // Guardar datos en localStorage
  private guardarPliego() {
    const pliegoData = {
      funcionarioSolicitante: this.funcionarioSolicitante,
      matriculaSolicitante: this.matriculaSolicitante,
      cargoSolicitante: this.cargoSolicitante,
      dependencia: this.dependencia,
      comisionado: this.comisionado,
      tipoContratacion: this.tipoContratacion,
      matriculaComisionado: this.matriculaComisionado,
      grupoJerarquico: this.grupoJerarquico,
      telefono: this.telefono,
      motivo: this.motivo,
      lugar: this.lugar,
      periodo: this.periodo,
      totalDias: this.totalDias,
      transporte: this.transporte,
      funcionarioSolicitanteFirma: this.funcionarioSolicitanteFirma,
      cargoSolicitanteFirma: this.cargoSolicitanteFirma,
      funcionarioAutorizaFirma: this.funcionarioAutorizaFirma,
      cargoAutorizaFirma: this.cargoAutoriza,
      cuotaDiaria: this.cuotaDiaria,
      anticipoPeaje: this.anticipoPeaje,
      subtotalViaticos: this.subtotalViaticos,
      boletoAvion: this.boletoAvion,
      anticipoViaticos: this.anticipoViaticos,
      anticipoVehiculo: this.anticipoVehiculo,
      anticipoPasajes: this.anticipoPasajes,
      gastosTotal: this.gastosTotal,
      disponibilidadPresupuestal: this.disponibilidadPresupuestal,
      clavePresupuestal: this.clavePresupuestal,
      buenoPor: this.buenoPor,
      diasVale: this.diasVale,
      valorPasajes: this.valorPasajes,
      cantidadRecibida: this.cantidadRecibida,
      firmaComisionado: this.firmaComisionado,
      firmaCargoComisionado: this.firmaCargoComisionado,
      firmaAutorizaComisionado: this.firmaAutorizaComisionado,
      firmaCargoAutorizaComisionado: this.firmaCargoAutorizaComisionado,
      textoNota: this.textoNota,
      codigoFormato: this.codigoFormato
    };
    localStorage.setItem('pliegoActual', JSON.stringify(pliegoData));
  }

  // Abrir modal
  abrirModal() {
    // Inicializar modal con datos actuales
    this.modalFuncionarioSolicitante = this.funcionarioSolicitante;
    this.modalMatriculaSolicitante = this.matriculaSolicitante;
    this.modalCargoSolicitante = this.cargoSolicitanteFirma;
    this.modalDependencia = this.dependencia;
    this.modalFuncionarioAutoriza = this.funcionarioAutorizaFirma;
    this.modalMotivo = this.motivo;
    this.modalLugar = this.lugar;
    this.modalPeriodo = this.periodo;
    this.modalTotalDias = this.totalDias;
    this.modalTransporte = this.transporte;

    this.mostrarModal = true;
  }

  // Cerrar modal
  cerrarModal() {
    this.mostrarModal = false;
  }

  // Confirmar datos del modal
  enviarFormularioModal() {
    const confirmacion = confirm('¿Los datos ingresados son correctos?');
    if (confirmacion) {
      // Pasar datos del modal al pliego
      this.funcionarioSolicitante = this.modalFuncionarioSolicitante;
      this.matriculaSolicitante = this.modalMatriculaSolicitante;
      this.cargoSolicitanteFirma = this.modalCargoSolicitante;
      this.dependencia = this.modalDependencia;
      this.funcionarioAutorizaFirma = this.modalFuncionarioAutoriza;
      this.motivo = this.modalMotivo;
      this.lugar = this.modalLugar;
      this.periodo = this.modalPeriodo;
      this.totalDias = this.modalTotalDias;
      this.transporte = this.modalTransporte;

      this.cerrarModal();
      this.guardarPliego();
    } else {
      alert('Revise los datos antes de confirmar.');
    }
  }

  // Imprimir pliego
  imprimirContenido(): void {
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

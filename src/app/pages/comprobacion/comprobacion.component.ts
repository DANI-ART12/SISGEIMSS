// comprobacion.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../core/auth/auth.service';

@Component({
  selector: 'app-comprobacion',
  // Si usas standalone components en tu app, descomenta 'standalone: true'.
  //standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comprobacion.component.html',
  styleUrls: ['./comprobacion.component.css']
})
export class ComprobacionComponent implements OnInit {

  // estado de modales
  mostrarComprobacionModal = false;
  mostrarAdministracionModal = false;

  // rol y usuario actual (tomados desde AuthService)
  currentUser: User | null = null;
  role: string | null = null;
  isLoggedIn = false;
  isAdminOrSubadmin = false;

  // fecha de hoy para el pliego (formato local)
  fechaHoy = new Date().toLocaleDateString('es-MX');

  // DATOS del pliego que se muestran en el HTML (persisten mientras la app está abierta)
  datos: any = {
    numero_pliego: '493/2024',

    // datos automáticos (ficticios iniciales)
    rfc: 'OEGP811027BQ5',
    curp: 'OEGP811027MOCRRL08',

    cuenta: '21900176011',
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

    motivo: '',
    periodo_solicitado: '',
    periodo_comprobado: '',
    lugar_comision: '',
    transporte: ''
  };

  // temporales para modales
  tempAdmin: any = {};
  tempComprobacion: any = {};

  // LIQUIDACIÓN (base de conceptos)
  conceptosBase = ['Hospedaje', 'Alimentación', 'Peaje', 'Combustible', 'Otros gastos', 'Boleto avión'];
  liquidacion: any[] = [];
  tempLiquidacion: any[] = [];

  // totales mostrados en pliego
  totales = {
    sumas: 0,
    totalAbonos: 0,
    saldo: 0,
    sumaFinal: 0
  };

  // Datos extendidos ficticios por usuario (para cargar RFC/Curp/tipo/grupo)
  private EXTENDED_USER_DATA: Record<string, any> = {
    'A001': {
      rfc: 'RFCADMIN001',
      curp: 'CURPADMIN001',
      empleado_comisionado: 'ADMINISTRADOR GENERAL',
      tipo_contratacion: 'BASE',
      matricula_comisionado: 'A001',
      grupo_jerarquico: 'A1'
    },
    'S001': {
      rfc: 'RFCSUB001',
      curp: 'CURPSUB001',
      empleado_comisionado: 'SUBADMIN REGIONAL',
      tipo_contratacion: 'CONFIANZA',
      matricula_comisionado: 'S001',
      grupo_jerarquico: 'B2'
    },
    'U001': {
      rfc: 'RFCUSER001',
      curp: 'CURPUSER001',
      empleado_comisionado: 'USUARIO OPERATIVO',
      tipo_contratacion: 'EVENTUAL',
      matricula_comisionado: 'U001',
      grupo_jerarquico: 'C3'
    }
  };

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // cargar usuario actual y rol desde AuthService (no modificamos AuthService)
    this.currentUser = this.auth.getCurrentUser();
    this.role = this.auth.getRole();
    this.isLoggedIn = this.auth.isLoggedIn();
    this.isAdminOrSubadmin = this.role === 'ADMIN' || this.role === 'SUBADMIN';

    // inicializar liquidación
    this.liquidacion = this.conceptosBase.map(c => ({ concepto: c, cargo: 0, abono: 0 }));
    this.tempLiquidacion = this.conceptosBase.map(c => ({ concepto: c, cargo: 0, abono: 0 }));

    // si hay usuario, cargar datos automáticos ficticios desde EXTENDED_USER_DATA
    if (this.currentUser) {
      const ext = this.EXTENDED_USER_DATA[this.currentUser.matricula];
      if (ext) {
        this.datos.rfc = ext.rfc;
        this.datos.curp = ext.curp;
        this.datos.empleado_comisionado = ext.empleado_comisionado;
        this.datos.tipo_contratacion = ext.tipo_contratacion;
        this.datos.matricula_comisionado = ext.matricula_comisionado;
        this.datos.grupo_jerarquico = ext.grupo_jerarquico;
      }
    }

    // calcular totales iniciales
    this.recalcularTotales();
  }

  // ========================
  // MODALES: administración
  // ========================
  openAdministracionModal() {
    // SOLO ADMIN o SUBADMIN pueden abrir (comprobación en template también existe)
    if (!this.isAdminOrSubadmin) return;

    // llenar temporales: los campos editables + los automáticos (readonly)
    this.tempAdmin = {
      funcionario_solicitante: this.datos.funcionario_solicitante,
      cargo_solicitante: this.datos.cargo_solicitante,
      dependencia: this.datos.dependencia,
      matricula_solicitante: this.datos.matricula_solicitante,
      telefono: this.datos.telefono,
      cuenta: this.datos.cuenta,

      // automáticos (solo lectura en el modal)
      rfc: this.datos.rfc,
      curp: this.datos.curp,
      empleado_comisionado: this.datos.empleado_comisionado,
      tipo_contratacion: this.datos.tipo_contratacion,
      grupo_jerarquico: this.datos.grupo_jerarquico,
      matricula_comisionado: this.datos.matricula_comisionado
    };

    // abrir modal
    this.mostrarAdministracionModal = true;
  }

  closeAdministracionModal() {
    this.mostrarAdministracionModal = false;
  }

  guardarAdministracion() {
    // Guardar lo que el admin/subadmin llenó (y mantener automáticos)
    this.datos.funcionario_solicitante = this.tempAdmin.funcionario_solicitante;
    this.datos.cargo_solicitante = this.tempAdmin.cargo_solicitante;
    this.datos.dependencia = this.tempAdmin.dependencia;
    this.datos.matricula_solicitante = this.tempAdmin.matricula_solicitante;
    this.datos.telefono = this.tempAdmin.telefono;
    this.datos.cuenta = this.tempAdmin.cuenta;

    // También guardamos los automáticos (vienen precargados) para que se reflejen en el pliego
    this.datos.rfc = this.tempAdmin.rfc;
    this.datos.curp = this.tempAdmin.curp;
    this.datos.empleado_comisionado = this.tempAdmin.empleado_comisionado;
    this.datos.tipo_contratacion = this.tempAdmin.tipo_contratacion;
    this.datos.grupo_jerarquico = this.tempAdmin.grupo_jerarquico;
    this.datos.matricula_comisionado = this.tempAdmin.matricula_comisionado;

    this.mostrarAdministracionModal = false;
  }

  // ========================
  // MODALES: comprobación
  // ========================
  openComprobacionModal() {
    // todos los roles logueados pueden abrir
    if (!this.isLoggedIn) return;

    // copia datos actuales para editar sin aplicar hasta guardar
    this.tempComprobacion = {
      numero_pliego: this.datos.numero_pliego,
      fecha: this.fechaHoy,
      motivo: this.datos.motivo,
      periodo_solicitado: this.datos.periodo_solicitado,
      periodo_comprobado: this.datos.periodo_comprobado,
      lugar_comision: this.datos.lugar_comision,
      transporte: this.datos.transporte
    };

    // copia temporal de la liquidación
    this.tempLiquidacion = this.liquidacion.map(x => ({ ...x }));

    this.mostrarComprobacionModal = true;
  }

  closeComprobacionModal() {
    this.mostrarComprobacionModal = false;
  }

  guardarComprobacion() {
    // guardar campos de comprobación en pliego
    this.datos.numero_pliego = this.tempComprobacion.numero_pliego;
    this.datos.motivo = this.tempComprobacion.motivo;
    this.datos.periodo_solicitado = this.tempComprobacion.periodo_solicitado;
    this.datos.periodo_comprobado = this.tempComprobacion.periodo_comprobado;
    this.datos.lugar_comision = this.tempComprobacion.lugar_comision;
    this.datos.transporte = this.tempComprobacion.transporte;
    this.datos.fecha = this.tempComprobacion.fecha;

    // guardar liquidación y recalcular totales
    this.liquidacion = this.tempLiquidacion.map(x => ({ ...x }));
    this.recalcularTotales();

    this.mostrarComprobacionModal = false;
  }

  // ========================
  // LIQUIDACION: totales
  // ========================
  recalcularTotales() {
    // sumas cargos y abonos
    const cargos = this.liquidacion.reduce((s, it) => s + Number(it.cargo || 0), 0);
    const abonos = this.liquidacion.reduce((s, it) => s + Number(it.abono || 0), 0);
    const boleto = (this.liquidacion.find(i => i.concepto === 'Boleto avión')?.cargo) || 0;

    this.totales.sumas = cargos;
    this.totales.totalAbonos = abonos;
    this.totales.saldo = cargos - abonos;
    this.totales.sumaFinal = (cargos - abonos) + boleto;
  }

  // ========================
  // IMPRESIÓN
  // ========================
  imprimir() {
    // oculta modales en impresión por CSS (print:hidden)
    const contenido = document.getElementById('pliego')?.innerHTML || '';
    const ventana = window.open('', '_blank', 'width=900,height=650');

    const style = Array.from(document.styleSheets).map(s => {
      try { return Array.from((s as CSSStyleSheet).cssRules).map(r => r.cssText).join('\n'); }
      catch { return ''; }
    }).join('\n');

    ventana!.document.write(`
      <html>
        <head>
          <title>Pliego</title>
          <style>
            ${style}
            /* Forzar inputs readonly a background blanco en impresión */
            @media print {
              input[disabled], .readonly-gray { background: transparent !important; color: inherit !important; }
            }
          </style>
        </head>
        <body onload="window.print()">
          ${contenido}
        </body>
      </html>
    `);
    ventana!.document.close();
  }
}


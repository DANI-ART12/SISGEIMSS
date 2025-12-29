
import { Component, OnInit } from '@angular/core';
import { AuthService, UserRole } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Pliego = {
  numero: string;
  fecha: string;
  lugar: string;
  periodo: string;
  dependencia: string;
  motivo: string;
  kmInicial?: number;
  kmFinal?: number;
  totalKm?: number;
  salida?: string;
  destino?: string;
  ambulancia?: string;
  resultadosTexto?: string;
};

@Component({
  selector: 'app-nuevoinforme',
  imports:[CommonModule, FormsModule],
  templateUrl: './nuevoinforme.component.html',
  styleUrls: ['./nuevoinforme.component.css']
})
export class NuevoinformeComponent implements OnInit {

  /* ---------------------------
     ROLE & AUTH (NO MODIFICAR AUTH SERVICE)
     --------------------------- */
  public role: UserRole | null = null;

  /* ---------------------------
     CAMPOS DEL INFORME (bindings usados por el template)
     --------------------------- */
  public noPliego: string = '';           // se actualiza al cargar
  public fechaEmision: string = '';
  public dependencia: string = '';
  public claveFormato: string = '1270-009-032';
  public lugarComision: string = '';
  public periodo: string = '';
  public actividadRealizada: string = '';
  public resultadosDetalle: string[] = [];
  public conclusionSatisfactoria: string = 'SE LLEVA A CABO LA COMISIÓN EN TIEMPO Y FORMA, LOS RESULTADOS DE LA COMISIÓN FUERON SATISFACTORIOS.';

  public firmaSolicitanteNombre: string = '';
  public firmaSolicitanteCargo: string = '';
  public firmaComisionadoNombre: string = '';
  public firmaComisionadoCargo: string = '';

  /* ---------------------------
     MODALES (control de visibilidad)
     --------------------------- */
  public modalNuevoInforme: boolean = false;
  public modalNuevoFuncionario: boolean = false;

  /* ---------------------------
     FORMULARIOS INTERNOS (modales)
     --------------------------- */
  // Modal informe: buscamos por número y agregamos texto adicional para resultados
  public formInforme: { numero: string; resultadosTexto: string } = {
    numero: '',
    resultadosTexto: ''
  };

  // Modal funcionario
  public formFuncionario: { solicitanteNombre: string; solicitanteCargo: string; comisionadoNombre: string; comisionadoCargo: string } = {
    solicitanteNombre: '',
    solicitanteCargo: '',
    comisionadoNombre: '',
    comisionadoCargo: ''
  };

  /* ---------------------------
     DATOS FICTICIOS EMBEBIDOS (PUEDES REMPLAZAR POR SERVICIO LUEGO)
     --------------------------- */
  public pliegos: Pliego[] = [
    {
      numero: '493/2024',
      fecha: '08 DE NOVIEMBRE DEL 2024',
      lugar: 'CIUDAD DE MEXICO',
      periodo: 'DEL 3 AL 5 DE NOVIEMBRE DEL 2024',
      dependencia: 'ÓRGANO DE OPERACIÓN ADMINISTRATIVA DESCONCENTRADA ESTATAL OAXACA',
      motivo: 'ASISTE A CURSO DE CAPACITACIÓN: SEGUNDO TALLER PARA LA IMPARTICIÓN DEL PROGRAMA DE DESARROLLO GERENCIAL',
      kmInicial: 120000,
      kmFinal: 120350,
      totalKm: 350,
      salida: 'OAXACA',
      destino: 'CIUDAD DE MEXICO',
      ambulancia: 'ECO-123',
      resultadosTexto: 'SALIDA EL DÍA 03/11/2024 A LAS 13:30 HRS. LLEGADA 23:30 HRS. ACTIVIDADES DE CAPACITACIÓN CON RESULTADOS APROBATORIOS.'
    },
    {
      numero: 'PL-001',
      fecha: '12 ENERO 2025',
      lugar: 'CDMX',
      periodo: '12-15 ENERO 2025',
      dependencia: 'SECRETARÍA DE SALUD',
      motivo: 'TRASLADO PROGRAMADO DE PACIENTE',
      kmInicial: 12200,
      kmFinal: 12260,
      totalKm: 60,
      salida: 'HOSPITAL GENERAL',
      destino: 'IMSS ZONA 1',
      ambulancia: 'AMB-23',
      resultadosTexto: 'TRASLADO SIN INCIDENTES.'
    }
  ];

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // Obtener rol del usuario desde AuthService (no modificar AuthService)
    this.role = this.auth.getRole();
  }

  /* ---------------------------
     FUNCIONES: BÚSQUEDA Y CARGA
     --------------------------- */

  /**
   * buscarPliegoPorNumero
   * Busca pliego en pliegos[] ignorando mayúsculas, espacios.
   * Si lo encuentra, carga todos los campos (bindings) para el informe.
   */
  public buscarPliegoPorNumero(numero: string) {
    const key = (numero || '').trim().toUpperCase();
    if (!key) {
      alert('Introduce un número de pliego para buscar.');
      return;
    }

    const encontrado = this.pliegos.find(p => (p.numero || '').toUpperCase() === key);
    if (!encontrado) {
      alert(`No se encontró el pliego: ${numero}`);
      return;
    }

    // Asignar campos del informe con datos del pliego
    this.noPliego = encontrado.numero;
    this.fechaEmision = encontrado.fecha;
    this.dependencia = encontrado.dependencia;
    this.lugarComision = encontrado.lugar;
    this.periodo = encontrado.periodo;
    this.actividadRealizada = encontrado.motivo;

    // Construir resultadosDetalle combinando texto de traslado + texto adicional
    this.resultadosDetalle = [
      (encontrado.resultadosTexto || '').toUpperCase(),
      `KM INICIAL: ${encontrado.kmInicial ?? '-'}`,
      `KM FINAL: ${encontrado.kmFinal ?? '-'}`,
      `TOTAL DE KM: ${encontrado.totalKm ?? '-'}`,
      `SALIDA: ${encontrado.salida ?? '-'}`,
      `DESTINO: ${encontrado.destino ?? '-'}`,
      `AMBULANCIA: ${encontrado.ambulancia ?? '-'}`
    ];

    // Al cargar desde buscador cerramos el modal (si estaba abierto)
    this.modalNuevoInforme = false;
  }

  /* ---------------------------
     MODALES: abrir / cerrar / acciones
     --------------------------- */

  openModalNuevoInforme() {
    this.formInforme = { numero: '', resultadosTexto: '' };
    this.modalNuevoInforme = true;
  }
  closeModalNuevoInforme() { this.modalNuevoInforme = false; }

  /**
   * buscarEnModal
   * Cuando se escribe número dentro del modal, trae el pliegoPreview al informe
   */
  buscarEnModal() {
    const n = (this.formInforme.numero || '').trim().toUpperCase();
    if (!n) return;
    const encontrado = this.pliegos.find(p => p.numero.toUpperCase() === n);
    if (encontrado) {
      // actualizar vista previa del informe (sin guardar oficialmente)
      this.noPliego = encontrado.numero;
      this.fechaEmision = encontrado.fecha;
      this.dependencia = encontrado.dependencia;
      this.lugarComision = encontrado.lugar;
      this.periodo = encontrado.periodo;
      this.actividadRealizada = encontrado.motivo;
      // si el modal tiene texto adicional, concatenamos temporalmente
      const extra = this.formInforme.resultadosTexto ? (' ' + this.formInforme.resultadosTexto) : '';
      this.resultadosDetalle = [
        ((encontrado.resultadosTexto || '') + extra).toUpperCase(),
        `KM INICIAL: ${encontrado.kmInicial ?? '-'}`,
        `KM FINAL: ${encontrado.kmFinal ?? '-'}`,
        `TOTAL DE KM: ${encontrado.totalKm ?? '-'}`,
        `SALIDA: ${encontrado.salida ?? '-'}`,
        `DESTINO: ${encontrado.destino ?? '-'}`,
        `AMBULANCIA: ${encontrado.ambulancia ?? '-'}`
      ];
    }
  }

  /**
   * guardarInforme
   * Guarda (aplica) el texto adicional de resultados desde el modal al pliego encontrado.
   * En esta versión permanece en memoria. Más adelante podemos persistirlo en un servicio/backend.
   */
  guardarInforme() {
    const n = (this.formInforme.numero || '').trim().toUpperCase();
    if (!n) {
      alert('Ingresa el número de pliego en el modal.');
      return;
    }

    const index = this.pliegos.findIndex(p => p.numero.toUpperCase() === n);
    if (index === -1) {
      alert('No se encontró el pliego para guardar. Verifica el número.');
      return;
    }

    // concatenar o reemplazar resultadosTexto en el registro ficticio
    this.pliegos[index].resultadosTexto = (this.pliegos[index].resultadosTexto || '') + ' ' + (this.formInforme.resultadosTexto || '');
    // refrescar la carga al informe
    this.buscarPliegoPorNumero(this.pliegos[index].numero);
    this.modalNuevoInforme = false;
    alert('Informe guardado en memoria (ficticia).');
  }

  /* ---------------------------
     FUNCIONARIOS (modal)
     --------------------------- */

  openModalNuevoFuncionario() {
    // reset form
    this.formFuncionario = {
      solicitanteNombre: this.firmaSolicitanteNombre,
      solicitanteCargo: this.firmaSolicitanteCargo,
      comisionadoNombre: this.firmaComisionadoNombre,
      comisionadoCargo: this.firmaComisionadoCargo
    };
    this.modalNuevoFuncionario = true;
  }
  closeModalNuevoFuncionario() { this.modalNuevoFuncionario = false; }

  guardarFuncionario() {
    // transferir valores del modal a los bindings del informe
    this.firmaSolicitanteNombre = (this.formFuncionario.solicitanteNombre || '').toUpperCase();
    this.firmaSolicitanteCargo = (this.formFuncionario.solicitanteCargo || '').toUpperCase();
    this.firmaComisionadoNombre = (this.formFuncionario.comisionadoNombre || '').toUpperCase();
    this.firmaComisionadoCargo = (this.formFuncionario.comisionadoCargo || '').toUpperCase();

    this.modalNuevoFuncionario = false;
    alert('Funcionario(s) guardado(s) localmente.');
  }

  /* ---------------------------
     IMPRESIÓN
     --------------------------- */
  imprimir() {
    // Aseguramos que solo imprimimos la zona definida (#printArea)
    // Simple y fiable: window.print() — el CSS de impresión controla la apariencia.
    window.print();
  }
}


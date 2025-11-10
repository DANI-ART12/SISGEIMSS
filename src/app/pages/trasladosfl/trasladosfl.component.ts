/*import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Play,
  Undo,
  X,
  CheckCircle,
  Slash,
  ArrowRightCircle
} from 'lucide-angular';

@Component({
  selector: 'app-trasladosfl',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './trasladosfl.component.html',
  styleUrls: ['./trasladosfl.component.css']
})
export class TrasladosflComponent implements OnInit {

  iconMap = {
    avanzar: Play,
    revertir: Undo,
    cancelar: X,
    finalizado: CheckCircle,
    cancelado: Slash,
    proximo: ArrowRightCircle,
  };

  trasladosHoy: any[] = [];
  trasladosProximos: any[] = [];
  operadores: string[] = ['Carlos', 'Miguel', 'Fernanda', 'Laura'];

  mostrarModal: boolean = false;

  trasladoNuevo: any = {
    tipoTraslado: '',      // Local o Foráneo
    numeroPliego: '',
    fecha: '',
    hora: '',
    paciente: '',
    lugar: '',
    operador: '',
    estado: 'Pendiente',
    guardado: false
  };

  ngOnInit(): void {
    const hoy = this.formatearFecha(new Date());

    // 🔹 Recuperar traslados guardados en localStorage
    const dataGuardada = localStorage.getItem('traslados');
    const todosLosTraslados = dataGuardada ? JSON.parse(dataGuardada) : [];

    this.trasladosHoy = todosLosTraslados.filter((t: any) => t.fecha === hoy);
    this.trasladosProximos = todosLosTraslados.filter((t: any) => t.fecha > hoy);
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscKeyHandler(event: KeyboardEvent) {
    if (this.mostrarModal) {
      this.cerrarModal();
    }
  }

  // 🔹 Generar folio para foráneos
  private generarFolioForaneo(): string {
    const year = new Date().getFullYear();

    // Leer contador de localStorage
    let ultimoFolio = Number(localStorage.getItem('ultimoFolioForaneo') || '0');
    ultimoFolio++;

    // Guardar nuevo contador
    localStorage.setItem('ultimoFolioForaneo', ultimoFolio.toString());

    // Formato: F001/2025
    const consecutivo = String(ultimoFolio).padStart(3, '0');
    return `F${consecutivo}/${year}`;
  }

  // 🔹 Guardar traslado con validación de folio único
  guardarTraslado() {
    const dataGuardada = localStorage.getItem('traslados');
    const todosLosTraslados = dataGuardada ? JSON.parse(dataGuardada) : [];

    //  Si es Foráneo → generar folio automático
    if (this.trasladoNuevo.tipoTraslado === 'Foráneo') {
      this.trasladoNuevo.numeroPliego = this.generarFolioForaneo();
    }

    //  Validar que no se repita el número de pliego
    const existe = todosLosTraslados.some(
      (t: any) => t.numeroPliego === this.trasladoNuevo.numeroPliego
    );

    if (existe) {
      alert('⚠️ El número de pliego ya existe. Intenta de nuevo.');
      return;
    }

    // Guardar traslado nuevo
    todosLosTraslados.push({ ...this.trasladoNuevo });
    localStorage.setItem('traslados', JSON.stringify(todosLosTraslados));

    // Refrescar listas
    const hoy = this.formatearFecha(new Date());
    this.trasladosHoy = todosLosTraslados.filter((t: any) => t.fecha === hoy);
    this.trasladosProximos = todosLosTraslados.filter((t: any) => t.fecha > hoy);

    // Limpiar formulario
    this.trasladoNuevo = {
      tipoTraslado: '',
      numeroPliego: '',
      fecha: '',
      hora: '',
      paciente: '',
      lugar: '',
      operador: '',
      estado: 'Pendiente',
      guardado: false
    };

    this.cerrarModal();
    alert('✅ Traslado guardado con éxito');
  }

  guardarMotivo(traslado: any) {
    traslado.guardado = true;
    this.actualizarStorage();
  }

  cambiarEstado(traslado: any): void {
    if (traslado.estado === 'Pendiente') {
      traslado.estado = 'En curso';
    } else if (traslado.estado === 'En curso') {
      traslado.estado = 'Finalizado';
    }
    this.actualizarStorage();
  }

  revertirEstado(traslado: any): void {
    if (traslado.estado === 'En curso') {
      traslado.estado = 'Pendiente';
    } else if (traslado.estado === 'Finalizado') {
      traslado.estado = 'En curso';
    }
    this.actualizarStorage();
  }

  cancelarTraslado(traslado: any): void {
    traslado.estado = 'Cancelado';
    traslado.motivoCancelacion = '';
    this.actualizarStorage();
  }

  private actualizarStorage() {
    const todos = [...this.trasladosHoy, ...this.trasladosProximos];
    localStorage.setItem('traslados', JSON.stringify(todos));
  }

  formatearFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0];
  }
}*/


import { Component, OnInit } from '@angular/core';
// RUTA CORREGIDA según tu estructura de carpetas (app/core/auth)
import { AuthService, User, UserRole } from '../../core/auth/auth.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// === 1. Interfaces de Datos del Traslado ===

interface DetallePaciente {
  id: number;
  nombre: string;
  destino: string;
}

type EstadoTraslado = 'Programado' | 'Iniciado' | 'En Traslado' | 'Finalizado';

interface Traslado {
  id: number;
  tipoTraslado: 'Local' | 'Foráneo';
  numeroPliego: string;
  
  pacientes: DetallePaciente[];
  
  operador: string; // Nombre del operador asignado
  operadorMatricula: string; // Matrícula del operador asignado
  
  fecha: string;
  hora: string;
  estado: EstadoTraslado;
  
  // Campos del Operador
  acompanante: string | null;
  kmInicio: number | null;
  kmFinal: number | null;
}

@Component({
  selector: 'app-trasladosfl',
  standalone:true,
  imports:[CommonModule, FormsModule],
  templateUrl: './trasladosfl.component.html',
  styleUrls: ['./trasladosfl.component.css']
})
export class TrasladosflComponent implements OnInit {

  // === 2. ESTADO DE USUARIO Y DATOS ===
  
  currentUser: User | null = null;
  currentUserRole: UserRole | null = null;
  
  // Modales
  mostrarModalCreacion: boolean = false; 
  mostrarModalOperador: boolean = false; 

  // Modelos de datos
  trasladoNuevo: Traslado = this.inicializarNuevoTraslado();
  trasladoSeleccionado: Traslado | null = null;
  
  // SIMULACIÓN de operadores (los 'USER' de tu sistema)
  operadores: { matricula: string, nombre: string }[] = [
    { matricula: 'U001', nombre: 'Juan Pérez' }, 
    { matricula: 'U002', nombre: 'María López' },
    { matricula: 'U003', nombre: 'Carlos Gómez' },
  ];
  
  // SIMULACIÓN DE DATOS CARGADOS
  traslados: Traslado[] = [
    { id: 1, tipoTraslado: 'Local', numeroPliego: 'L001/2025', pacientes: [{ id: 1, nombre: 'Ana Torres', destino: 'Clínica Central' }], operador: 'Juan Pérez', operadorMatricula: 'U001', fecha: this.getToday(), hora: '10:00', estado: 'Programado', acompanante: null, kmInicio: null, kmFinal: null },
    { id: 2, tipoTraslado: 'Foráneo', numeroPliego: 'F-2025-0001', pacientes: [{ id: 1, nombre: 'Luis García', destino: 'Hospital Norte' }], operador: 'María López', operadorMatricula: 'U002', fecha: this.getToday(1), hora: '15:30', estado: 'Programado', acompanante: null, kmInicio: null, kmFinal: null },
    { id: 3, tipoTraslado: 'Local', numeroPliego: 'L002/2025', pacientes: [{ id: 1, nombre: 'Paci A', destino: 'Clínica 1' }, { id: 2, nombre: 'Paci B', destino: 'Clínica 2' }], operador: 'Juan Pérez', operadorMatricula: 'U001', fecha: this.getToday(), hora: '12:00', estado: 'Programado', acompanante: null, kmInicio: null, kmFinal: null }
  ];

  private contadorFoliosForaneos: number = 2; 
  private nextId: number = 4;

  constructor(private authService: AuthService) { } 

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.currentUserRole = user ? user.role : null;
      this.trasladoNuevo = this.inicializarNuevoTraslado();
    });
  }

  // === 3. UTILIDADES GENERALES Y FORMATO DE TABLA (Nuevas funciones) ===
  
  /** Transforma la lista de nombres de pacientes a una cadena legible (Nombre, Nombre, ...) */
  getNombresPacientes(traslado: Traslado): string {
    return traslado.pacientes.map(p => p.nombre).join(', ');
  }
  
  /** Transforma la lista de destinos a una cadena legible (Destino / Destino / ...) */
  getDestinosPacientes(traslado: Traslado): string {
    return traslado.pacientes.map(p => p.destino).join(' / ');
  }

  getToday(offset: number = 0): string {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().substring(0, 10);
  }

  get isOperador(): boolean {
    return this.currentUserRole === 'USER';
  }

  get isAdminOrSubadmin(): boolean {
    return this.currentUserRole === 'ADMIN' || this.currentUserRole === 'SUBADMIN';
  }

  // === 4. LÓGICA DE TABLAS Y FILTRADO ===

  get trasladosHoy(): Traslado[] {
    const hoy = this.getToday();
    const traslados = this.traslados.filter(t => t.fecha === hoy);
    // Filtrado por rol
    return this.isOperador && this.currentUser 
      ? traslados.filter(t => t.operadorMatricula === this.currentUser!.matricula)
      : traslados;
  }

  get trasladosProximos(): Traslado[] {
    const hoy = this.getToday();
    const traslados = this.traslados.filter(t => t.fecha > hoy);
    // Filtrado por rol
    return this.isOperador && this.currentUser 
      ? traslados.filter(t => t.operadorMatricula === this.currentUser!.matricula)
      : traslados;
  }

  // === 5. CONTROL DE FORMULARIO (Creación/Edición) ===

  private inicializarNuevoTraslado(): Traslado {
    const matricula = this.currentUser?.matricula || '';
    const operadorInfo = this.operadores.find(op => op.matricula === matricula);
    const nombre = operadorInfo ? operadorInfo.nombre : '';

    const operadorPredeterminado = this.isOperador && this.currentUser ? nombre : '';
    const matriculaPredeterminada = this.isOperador && this.currentUser ? matricula : '';

    return {
      id: this.nextId,
      tipoTraslado: 'Local',
      numeroPliego: '',
      pacientes: [{ id: 1, nombre: '', destino: '' }],
      operador: operadorPredeterminado,
      operadorMatricula: matriculaPredeterminada,
      fecha: this.getToday(),
      hora: new Date().toTimeString().substring(0, 5),
      estado: 'Programado',
      acompanante: null,
      kmInicio: null,
      kmFinal: null,
    };
  }

  abrirModalCreacion(): void {
    if (!this.currentUser) {
      alert('Debe iniciar sesión para crear un traslado.');
      return;
    }
    this.trasladoNuevo = this.inicializarNuevoTraslado();
    if (this.isOperador) {
        this.trasladoNuevo.tipoTraslado = 'Foráneo';
        this.generarFolioForaneo(this.trasladoNuevo);
    }
    this.mostrarModalCreacion = true;
  }

  cerrarModalCreacion(): void {
    this.mostrarModalCreacion = false;
  }
  
  agregarPaciente(): void {
    const newId = this.trasladoNuevo.pacientes.length + 1;
    this.trasladoNuevo.pacientes.push({ id: newId, nombre: '', destino: '' });
  }

  eliminarPaciente(id: number): void {
    this.trasladoNuevo.pacientes = this.trasladoNuevo.pacientes.filter(p => p.id !== id);
  }

  generarFolioForaneo(traslado: Traslado): void {
    if (traslado.tipoTraslado === 'Foráneo') {
      const year = new Date().getFullYear();
      const folioNumero = (this.contadorFoliosForaneos + 1).toString().padStart(4, '0');
      traslado.numeroPliego = `F-${year}-${folioNumero}`;
      if (this.isOperador && this.currentUser) {
        const operadorInfo = this.operadores.find(op => op.matricula === this.currentUser!.matricula);
        traslado.operador = operadorInfo ? operadorInfo.nombre : '';
        traslado.operadorMatricula = this.currentUser.matricula;
      }
    } else {
      traslado.numeroPliego = ''; 
    }
  }

  onTipoTrasladoChange(traslado: Traslado): void {
    this.generarFolioForaneo(traslado);
  }
  
  onOperadorChange(traslado: Traslado, matricula: string): void {
    const operador = this.operadores.find(op => op.matricula === matricula);
    if (operador) {
      traslado.operador = operador.nombre;
      traslado.operadorMatricula = operador.matricula;
    }
  }

  guardarTraslado(): void {
    if (!this.trasladoNuevo.pacientes.every(p => p.nombre && p.destino)) {
      alert('Debe completar el nombre y destino de todos los pacientes.');
      return;
    }
    if (this.trasladoNuevo.tipoTraslado === 'Local' && !this.trasladoNuevo.numeroPliego && this.isAdminOrSubadmin) {
      alert('Debe ingresar un Folio/Pliego para el Traslado Local.');
      return;
    }

    if (this.trasladoNuevo.tipoTraslado === 'Foráneo' && this.isOperador) {
        this.contadorFoliosForaneos++;
    }

    const index = this.traslados.findIndex(t => t.id === this.trasladoNuevo.id);

    if (index === -1) {
        this.traslados.push({...this.trasladoNuevo, id: this.nextId++});
    } else {
        this.traslados[index] = this.trasladoNuevo;
    }
    
    alert(`Traslado ${this.trasladoNuevo.numeroPliego} guardado/actualizado.`);
    this.cerrarModalCreacion();
  }
  
  // === 6. LÓGICA DE ESTADO (Admin/Subadmin) ===

  cambiarEstado(traslado: Traslado, nuevoEstado: EstadoTraslado): void {
    if (!this.isAdminOrSubadmin) return;
    traslado.estado = nuevoEstado;
    alert(`Estado de ${traslado.numeroPliego} cambiado a ${nuevoEstado}.`);
  }

  revertirEstado(traslado: Traslado): void {
    if (!this.isAdminOrSubadmin) return;
    
    if (confirm(`¿Está seguro de revertir el estado de ${traslado.numeroPliego}? Esta acción es solo para corregir errores.`)) {
        if (traslado.estado === 'Finalizado') {
            traslado.estado = 'En Traslado';
        } else if (traslado.estado === 'En Traslado') {
            traslado.estado = 'Iniciado';
        } else if (traslado.estado === 'Iniciado') {
             traslado.estado = 'Programado';
        }
        alert(`Estado de ${traslado.numeroPliego} revertido a ${traslado.estado}.`);
    }
  }

  // === 7. LÓGICA DEL OPERADOR (KM/Acompañante) ===
  
  abrirModalDetalle(traslado: Traslado): void {
    if (this.isAdminOrSubadmin) {
        this.trasladoNuevo = { ...traslado }; 
        this.mostrarModalCreacion = true;
        return;
    }

    if (this.isOperador && traslado.operadorMatricula === this.currentUser?.matricula) {
        this.trasladoSeleccionado = { ...traslado }; 
        this.mostrarModalOperador = true;
        return;
    }
    
    alert('No tiene permisos para editar este traslado.');
  }
  
  cerrarModalOperador(): void {
    this.mostrarModalOperador = false;
    this.trasladoSeleccionado = null;
  }
  
  guardarDetalleOperador(): void {
    if (!this.trasladoSeleccionado) return;
    
    if (this.trasladoSeleccionado.kmInicio !== null && this.trasladoSeleccionado.estado === 'Programado') {
      this.trasladoSeleccionado.estado = 'Iniciado';
    }
    
    if (this.trasladoSeleccionado.kmFinal !== null && this.trasladoSeleccionado.estado !== 'Finalizado') {
        this.trasladoSeleccionado.estado = 'Finalizado';
    }

    const index = this.traslados.findIndex(t => t.id === this.trasladoSeleccionado!.id);
    if (index !== -1) {
        this.traslados[index] = this.trasladoSeleccionado;
    }
    
    alert(`Detalles de ${this.trasladoSeleccionado.numeroPliego} guardados. Nuevo estado: ${this.trasladoSeleccionado.estado}`);
    this.cerrarModalOperador();
  }
}






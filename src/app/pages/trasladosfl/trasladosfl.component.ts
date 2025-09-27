import { Component, OnInit, HostListener } from '@angular/core';
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
}

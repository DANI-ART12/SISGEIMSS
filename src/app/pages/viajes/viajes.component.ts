import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Viaje {
  folio: string;
  fecha: string;
  matricula: string;
  paciente: string;
  origen: string;
  destino: string;
  ambulancia?: string;
  kmInicial?: number;
  kmFinal?: number;
  observaciones?: string;
  archivo?: File;
}

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './viajes.component.html',
})
export class ViajesComponent {
  filtro = { matricula: '', folio: '', fechaInicio: '', fechaFin: '' };
  
  viajes: Viaje[] = [
    {
      folio: 'V001',
      fecha: '2025-06-15',
      matricula: 'A123',
      paciente: 'Juan Pérez',
      origen: 'Hosp A',
      destino: 'Clin B',
      ambulancia: 'AMB-01',
      kmInicial: 12000,
      kmFinal: 12300,
      observaciones: 'Todo ok'
    },
    {
      folio: 'V002',
      fecha: '2025-06-20',
      matricula: 'B456',
      paciente: 'María López',
      origen: 'Clin C',
      destino: 'Hosp D',
      ambulancia: 'AMB-02',
      kmInicial: 8000,
      kmFinal: 8300,
      observaciones: ''
    },
  ];
  
  viajesFiltrados = [...this.viajes];
  ambulancias = ['AMB-01', 'AMB-02', 'AMB-03'];

  viajeSeleccionado: Viaje | null = null;
  enEdicion = false;
  kmTotal = 0;
  kmRestantesParaMantenimiento = 0;

  aplicarFiltro() {
    this.viajesFiltrados = this.viajes.filter(v =>
      (!this.filtro.matricula || v.matricula.includes(this.filtro.matricula)) &&
      (!this.filtro.folio || v.folio.includes(this.filtro.folio)) &&
      (!this.filtro.fechaInicio || v.fecha >= this.filtro.fechaInicio) &&
      (!this.filtro.fechaFin || v.fecha <= this.filtro.fechaFin)
    );
  }

  verDetalles(v: Viaje) {
    this.viajeSeleccionado = { ...v };
    this.enEdicion = false;
    this.actualizarKmTotal();
  }

  activarEdicion(v: Viaje) {
    this.viajeSeleccionado = { ...v };
    this.enEdicion = true;
    this.actualizarKmTotal();
  }

  actualizarKmTotal() {
    if (this.viajeSeleccionado) {
      const ki = this.viajeSeleccionado.kmInicial || 0;
      const kf = this.viajeSeleccionado.kmFinal || 0;
      this.kmTotal = kf >= ki ? kf - ki : 0;
      this.kmRestantesParaMantenimiento = 10000 - (kf || 0);
    }
  }

  onArchivoSeleccionado(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length && this.viajeSeleccionado) {
      this.viajeSeleccionado.archivo = input.files[0];
    }
  }

  guardarViaje() {
    if (!this.viajeSeleccionado) return;

    const idx = this.viajes.findIndex(it => it.folio === this.viajeSeleccionado!.folio);
    if (idx !== -1) {
      this.viajes[idx] = { ...this.viajeSeleccionado! };
    }

    alert(`Viaje ${this.viajeSeleccionado.folio} guardado con éxito 😊`);
    this.enEdicion = false;
    this.cerrarDetalles();
    this.aplicarFiltro(); // actualiza lista
  }

  cerrarDetalles() {
    this.viajeSeleccionado = null;
    this.enEdicion = false;
  }
}

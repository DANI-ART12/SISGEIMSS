import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Paciente {
  nombre: string;
  nss: string;
  telefono: string;
  domicilio: string;
}

interface Operador {
  nombre: string;
  matricula: string;
}

interface Traslado {
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  fechaLlegada: string;
  horaLlegada: string;
}

interface Viaje {
  folio: string;
  fecha: string;
  paciente: Paciente;
  operador: Operador;
  ida: Traslado;
  regreso: Traslado;
  destino: string;
  estado: string;
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
  // 🔹 Filtro general + fechas
  filtroGeneral: string = '';
  filtro = {
    fechaInicio: '',
    fechaFin: ''
  };

  operadores: Operador[] = [
    { nombre: 'Carlos Pérez', matricula: 'A123' },
    { nombre: 'Laura Gómez', matricula: 'B456' },
    { nombre: 'Miguel Torres', matricula: 'C789' }
  ];

  ambulancias: string[] = ['AMB-01', 'AMB-02', 'AMB-03'];

  viajes: Viaje[] = [
    {
      folio: 'V001',
      fecha: '2025-08-16',
      paciente: { nombre: 'Juan Pérez', nss: '123456789', telefono: '555-1234', domicilio: 'Calle A #123' },
      operador: { nombre: 'Carlos Pérez', matricula: 'A123' },
      ida: { origen: 'Hosp A', destino: 'Hosp B', fecha: '16/08/2025', hora: '13:00', fechaLlegada: '16/08/2025', horaLlegada: '20:00' },
      regreso: { origen: 'Hosp B', destino: 'Hosp A', fecha: '17/08/2025', hora: '12:00', fechaLlegada: '17/08/2025', horaLlegada: '19:00' },
      destino: 'Hosp B',
      estado: 'Completado',
      ambulancia: 'AMB-01',
      kmInicial: 12000,
      kmFinal: 12300,
      observaciones: 'Todo ok'
    },
    {
      folio: 'V002',
      fecha: '2025-08-17',
      paciente: { nombre: 'María López', nss: '987654321', telefono: '555-5678', domicilio: 'Calle B #456' },
      operador: { nombre: 'Laura Gómez', matricula: 'B456' },
      ida: { origen: 'Clin C', destino: 'Hosp D', fecha: '17/08/2025', hora: '09:00', fechaLlegada: '17/08/2025', horaLlegada: '13:00' },
      regreso: { origen: 'Hosp D', destino: 'Clin C', fecha: '17/08/2025', hora: '15:00', fechaLlegada: '17/08/2025', horaLlegada: '18:00' },
      destino: 'Hosp D',
      estado: 'Pendiente',
      ambulancia: 'AMB-02',
      kmInicial: 8000,
      kmFinal: 8300,
      observaciones: ''
    },
  ];

  viajesFiltrados = [...this.viajes];
  viajeSeleccionado: Viaje | null = null;
  enEdicion = false;
  kmTotal = 0;
  kmRestantesParaMantenimiento = 0;

  aplicarFiltro() {
    const filtroTxt = this.filtroGeneral.toLowerCase();
    const inicio = this.filtro.fechaInicio ? new Date(this.filtro.fechaInicio) : null;
    const fin = this.filtro.fechaFin ? new Date(this.filtro.fechaFin) : null;

    this.viajesFiltrados = this.viajes.filter(viaje => {
      // 🔹 Filtro general
      const coincideGeneral =
        viaje.folio.toLowerCase().includes(filtroTxt) ||
        viaje.estado.toLowerCase().includes(filtroTxt) ||
        viaje.destino.toLowerCase().includes(filtroTxt) ||
        viaje.operador.matricula.toLowerCase().includes(filtroTxt) ||
        viaje.operador.nombre.toLowerCase().includes(filtroTxt) ||
        viaje.paciente.nombre.toLowerCase().includes(filtroTxt) ||
        viaje.paciente.nss.toLowerCase().includes(filtroTxt);

      // 🔹 Filtro por fecha
      let coincideFecha = true;
      if (inicio || fin) {
        const fechaViaje = new Date(viaje.fecha);
        if (inicio && fechaViaje < inicio) coincideFecha = false;
        if (fin && fechaViaje > fin) coincideFecha = false;
      }

      return coincideGeneral && coincideFecha;
    });
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

  actualizarMatricula() {
    if (this.viajeSeleccionado) {
      const op = this.operadores.find(o => o.nombre === this.viajeSeleccionado!.operador.nombre);
      if (op) {
        this.viajeSeleccionado.operador.matricula = op.matricula;
      }
    }
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
    this.aplicarFiltro();
  }

  cerrarDetalles() {
    this.viajeSeleccionado = null;
    this.enEdicion = false;
  }
}

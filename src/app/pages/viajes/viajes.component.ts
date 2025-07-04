import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Viaje {
  matricula: string;
  folio: string;
  fecha: string;
  paciente: string;
  numeroSeguridadSocial: string;
  origen: string;
  destino: string;
  ambulancia: string | null;
  kmInicial: number;
  kmFinal: number;
  observaciones: string;
  archivo?: File | null;
}

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css'],
})
export class ViajesComponent implements OnInit {
  viajes: Viaje[] = [];
  viajesFiltrados: Viaje[] = [];
  viajeSeleccionado: Viaje | null = null;

  kmTotal: number = 0;
  kmRestantesParaMantenimiento: number = 0;

  filtro = {
    matricula: '',
    folio: '',
    fechaInicio: '',
    fechaFin: '',
  };

  ambulancias: string[] = ['AMB-01', 'AMB-02', 'AMB-03', 'AMB-04'];

  // Km límite para mantenimiento por ambulancia
  kmMantenimientoPorAmbulancia: { [key: string]: number } = {
    'AMB-01': 5000,
    'AMB-02': 6000,
    'AMB-03': 4500,
    'AMB-04': 7000,
  };

  // Km acumulados por ambulancia (simulado, normalmente vendría de backend)
  kmAcumuladosPorAmbulancia: { [key: string]: number } = {
    'AMB-01': 4800,
    'AMB-02': 3200,
    'AMB-03': 4200,
    'AMB-04': 1000,
  };

  // Umbral para notificación (ej. 90% del mantenimiento)
  umbralNotificacion = 0.9;

  ngOnInit(): void {
    this.viajes = [
      {
        matricula: 'A123',
        folio: 'F001',
        fecha: '2025-06-01',
        paciente: 'Juan Pérez',
        numeroSeguridadSocial: '1234567890',
        origen: 'Clínica Norte',
        destino: 'Hospital Central',
        ambulancia: 'AMB-01',
        kmInicial: 100,
        kmFinal: 150,
        observaciones: 'Paciente estable',
        archivo: null,
      },
      {
        matricula: 'B456',
        folio: 'F002',
        fecha: '2025-06-08',
        paciente: 'Ana Ruiz',
        numeroSeguridadSocial: '0987654321',
        origen: 'Clínica Sur',
        destino: 'IMSS Zona 5',
        ambulancia: 'AMB-03',
        kmInicial: 80,
        kmFinal: 120,
        observaciones: 'Urgencia leve',
        archivo: null,
      },
    ];
    this.viajesFiltrados = [...this.viajes];
  }

  aplicarFiltro(): void {
    this.viajesFiltrados = this.viajes.filter((v) => {
      const fechaViaje = new Date(v.fecha);
      const fechaInicio = this.filtro.fechaInicio
        ? new Date(this.filtro.fechaInicio)
        : null;
      const fechaFin = this.filtro.fechaFin ? new Date(this.filtro.fechaFin) : null;

      return (
        (!this.filtro.matricula ||
          v.matricula.toLowerCase().includes(this.filtro.matricula.toLowerCase())) &&
        (!this.filtro.folio ||
          v.folio.toLowerCase().includes(this.filtro.folio.toLowerCase())) &&
        (!fechaInicio || fechaViaje >= fechaInicio) &&
        (!fechaFin || fechaViaje <= fechaFin)
      );
    });
  }

  verDetalles(viaje: Viaje): void {
    this.viajeSeleccionado = viaje;
    this.actualizarKmTotal();
  }

  cerrarDetalles(): void {
    this.viajeSeleccionado = null;
    this.kmTotal = 0;
    this.kmRestantesParaMantenimiento = 0;
  }

  actualizarKmTotal(): void {
    if (this.viajeSeleccionado) {
      const kmIni = this.viajeSeleccionado.kmInicial || 0;
      const kmFin = this.viajeSeleccionado.kmFinal || 0;
      const kmViaje = kmFin >= kmIni ? kmFin - kmIni : 0;

      this.kmTotal = kmViaje;

      const ambulancia = this.viajeSeleccionado.ambulancia;

      if (ambulancia && this.kmMantenimientoPorAmbulancia[ambulancia] !== undefined) {
        const kmAcumuladoAntes = this.kmAcumuladosPorAmbulancia[ambulancia] || 0;
        const kmAcumuladoDespues = kmAcumuladoAntes + kmViaje;

        this.kmRestantesParaMantenimiento = Math.max(
          this.kmMantenimientoPorAmbulancia[ambulancia] - kmAcumuladoDespues,
          0
        );

        const limite = this.kmMantenimientoPorAmbulancia[ambulancia];
        if (
          kmAcumuladoDespues >= limite * this.umbralNotificacion &&
          kmAcumuladoDespues < limite
        ) {
          alert(
            `⚠️ La ambulancia ${ambulancia} se acerca a su mantenimiento. Km acumulados: ${kmAcumuladoDespues}`
          );
        } else if (kmAcumuladoDespues >= limite) {
          alert(
            `🚨 La ambulancia ${ambulancia} necesita mantenimiento URGENTE. Km acumulados: ${kmAcumuladoDespues}`
          );
        }
      } else {
        this.kmRestantesParaMantenimiento = 0;
      }
    }
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0 && this.viajeSeleccionado) {
      this.viajeSeleccionado.archivo = input.files[0];
      console.log('Archivo seleccionado:', this.viajeSeleccionado.archivo.name);
    }
  }

  guardarViaje(): void {
    if (this.viajeSeleccionado) {
      const ambulancia = this.viajeSeleccionado.ambulancia;
      if (ambulancia) {
        const kmIni = this.viajeSeleccionado.kmInicial || 0;
        const kmFin = this.viajeSeleccionado.kmFinal || 0;
        const kmViaje = kmFin >= kmIni ? kmFin - kmIni : 0;

        // Actualizar kilómetros acumulados para la ambulancia
        this.kmAcumuladosPorAmbulancia[ambulancia] =
          (this.kmAcumuladosPorAmbulancia[ambulancia] || 0) + kmViaje;
      }

      console.log('Guardando viaje:', this.viajeSeleccionado);
      alert('✅ Viaje guardado correctamente.');

      // Actualizar km restantes luego de guardar
      this.actualizarKmTotal();
    }
  }
}


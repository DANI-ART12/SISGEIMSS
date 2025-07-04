
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartType,
  ChartOptions,
  ChartData,
ChartTypeRegistry,
} from 'chart.js';

@Component({
  standalone: true,
  selector: 'app-graficos',
  imports: [NgChartsModule, FormsModule],
  templateUrl: './graficos.component.html',
})
export class GraficosComponent {

  // Fechas para filtro
  fechaInicio: string = '';
  fechaFin: string = '';

  // Filtro de periodo
  periodo: string = 'mes';
  meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  // Gráfica 1: Traslados locales vs foráneos (Bar)
  trasladoChartType: ChartType = 'bar';
  trasladoChartData: ChartData<'bar'> = {
    labels: this.meses,
    datasets: [
      {
        data: [12, 19, 15, 22, 17, 25, 19, 18, 22, 23, 20, 21],
        label: 'Locales',
        backgroundColor: '#4F46E5',
      },
      {
        data: [8, 11, 14, 10, 13, 9, 15, 16, 14, 12, 10, 11],
        label: 'Foráneos',
        backgroundColor: '#10B981',
      }
    ]
  };
  trasladoChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#F3F4F6' } }
    },
    plugins: { legend: { position: 'bottom' } }
  };

  // Gráfica 2: Traslados por ambulancias (Pie)
  ambulanciaChartType: ChartType = 'pie';
  ambulanciaChartData: ChartData<'pie'> = {
    labels: ['Ambulancia A', 'Ambulancia B', 'Ambulancia C'],
    datasets: [{
      data: [30, 25, 45],
      backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6'],
    }]
  };

  // Gráfica 3: Traslados por operador (Line)
  operadorChartType: ChartType = 'line';
  operadorChartData: ChartData<'line'> = {
    labels: this.meses,
    datasets: [
      {
        data: [5, 8, 6, 7, 10, 5, 6, 7, 8, 9, 10, 6],
        label: 'Operador 1',
        borderColor: '#6B7280',
        fill: false,
      },
      {
        data: [3, 4, 5, 6, 7, 4, 5, 6, 7, 8, 9, 4],
        label: 'Operador 2',
        borderColor: '#D1D5DB',
        fill: false,
      }
    ]
  };
  operadorChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#F3F4F6' } }
    },
    plugins: { legend: { position: 'bottom' } }
  };

  // Gráfica 4: Traslados por especialidad (Doughnut)
  especialidadChartType: ChartType = 'doughnut';
  especialidadChartData: ChartData<'doughnut'> = {
    labels: ['Urgencias', 'Cirugía', 'Cardiología', 'Pediatría'],
    datasets: [{
      data: [25, 15, 35, 25],
      backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981'],
    }]
  };

  // Gráfica 5: Traslados por hospital (Stacked Bar)
  hospitalChartType: ChartType = 'bar';
  hospitalChartData: ChartData<'bar'> = {
    labels: ['Hospital Local', 'Hospital Foráneo', 'Clínica A', 'Clínica B'],
    datasets: [
      {
        label: 'Emergencias',
        data: [30, 20, 15, 25],
        backgroundColor: '#6366F1'
      },
      {
        label: 'Programados',
        data: [30, 20, 20, 20],
        backgroundColor: '#A5B4FC'
      }
    ]
  };
  hospitalChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Traslados por Hospital (Apilados)',
      }
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true }
    }
  };

  // Cambiar entre mes o año
  onPeriodoChange() {
    if (this.periodo === 'año') {
      this.meses = ['2020', '2021', '2022', '2023'];
      this.trasladoChartData = {
        labels: this.meses,
        datasets: [
          {
            data: [120, 150, 130, 160],
            label: 'Locales',
            backgroundColor: '#4F46E5',
          },
          {
            data: [100, 120, 140, 110],
            label: 'Foráneos',
            backgroundColor: '#10B981',
          }
        ]
      };
    } else {
      this.meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      this.trasladoChartData = {
        labels: this.meses,
        datasets: [
          {
            data: [12, 19, 15, 22, 17, 25, 19, 18, 22, 23, 20, 21],
            label: 'Locales',
            backgroundColor: '#4F46E5',
          },
          {
            data: [8, 11, 14, 10, 13, 9, 15, 16, 14, 12, 10, 11],
            label: 'Foráneos',
            backgroundColor: '#10B981',
          }
        ]
      };
    }
  }

  // Filtro por fechas
  buscarPorFechas() {
    if (!this.fechaInicio || !this.fechaFin) {
      alert('Selecciona ambas fechas');
      return;
    }

    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);

    if (inicio > fin) {
      alert('La fecha inicial no puede ser mayor que la final.');
      return;
    }

    // 🔽 Aquí deberías hacer la lógica real de filtrado con tu backend o base de datos

    console.log('Buscando datos entre:', this.fechaInicio, 'y', this.fechaFin);

    // Puedes simular un nuevo conjunto de datos como ejemplo:
    this.trasladoChartData.datasets[0].data = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
    this.trasladoChartData.datasets[1].data = [5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17];
  }
  imprimirGrafica(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL();

    const ventana = window.open('', '_blank');
    if (ventana) {
      ventana.document.write(`
        <html>
          <head><title>Imprimir Gráfica</title></head>
          <body>
            <img src="${dataUrl}" style="width:100%;">
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() { window.close(); }
              }
            </script>
          </body>
        </html>
      `);
    }
  }

  descargarGrafica(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${canvasId}.png`;
    link.click();
  }
}
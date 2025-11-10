import { Component, ViewChildren, QueryList } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartOptions, ChartData } from 'chart.js';
import html2pdf from 'html2pdf.js';
import { CommonModule } from '@angular/common';

interface Grafica {
  id: string;
  title: string;
  type: ChartType;
  data: ChartData<any, any, any>;
  options: ChartOptions<any>;
}

@Component({
  standalone: true,
  selector: 'app-graficos',
  imports: [NgChartsModule, FormsModule, CommonModule],
  templateUrl: './graficos.component.html',
})
export class GraficosComponent {

  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;

  fechaInicio: string = '';
  fechaFin: string = '';
  meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  graficas: Grafica[] = [];

  constructor() {
    this.graficas = [
      {
        id:'grafica-local-vs-foraneo',
        title:'Traslados Locales vs Foráneos',
        type:'bar',
        data:{
          labels:this.meses,
          datasets:[
            { label:'Locales', data:[12,19,15,22,17,25,19,18,22,23,20,21], backgroundColor:'#4F46E5' },
            { label:'Foráneos', data:[8,11,14,10,13,9,15,16,14,12,10,11], backgroundColor:'#10B981' }
          ]
        },
        options:{ responsive:true, plugins:{ legend:{ position:'bottom' } } }
      },
      {
        id:'grafica-por-ambulancia',
        title:'Traslados por Ambulancia',
        type:'pie',
        data:{
          labels:['Ambulancia A','Ambulancia B','Ambulancia C'],
          datasets:[{ data:[30,25,45], backgroundColor:['#EF4444','#F59E0B','#3B82F6'] }]
        },
        options:{ responsive:true, plugins:{ legend:{ position:'right' } } }
      },
      {
        id:'grafica-por-operador',
        title:'Traslados por Operador',
        type:'line',
        data:{
          labels:this.meses,
          datasets:[
            { label:'Operador 1', data:[5,8,6,7,10,5,6,7,8,9,10,6], borderColor:'#6B7280', fill:false },
            { label:'Operador 2', data:[3,4,5,6,7,4,5,6,7,8,9,4], borderColor:'#D1D5DB', fill:false }
          ]
        },
        options:{ responsive:true, plugins:{ legend:{ position:'bottom' } } }
      },
      {
        id:'grafica-por-especialidad',
        title:'Traslados por Especialidad',
        type:'doughnut',
        data:{
          labels:['Urgencias','Cirugía','Cardiología','Pediatría'],
          datasets:[{ data:[25,15,35,25], backgroundColor:['#EF4444','#F59E0B','#3B82F6','#10B981'] }]
        },
        options:{ responsive:true, plugins:{ legend:{ position:'right' } } }
      },
      {
        id:'grafica-por-hospital',
        title:'Traslados por Hospital',
        type:'bar',
        data:{
          labels:['Hospital Local','Hospital Foráneo','Clínica A','Clínica B'],
          datasets:[
            { label:'Emergencias', data:[30,20,15,25], backgroundColor:'#6366F1' },
            { label:'Programados', data:[30,20,20,20], backgroundColor:'#A5B4FC' }
          ]
        },
        options:{
          responsive:true,
          plugins:{ legend:{position:'top'}, title:{display:true,text:'Traslados por Hospital (Apilados)'} },
          scales:{ x:{ stacked:true }, y:{ stacked:true, min:0 } }
        }
      }
    ];
  }

  buscarPorFechas() {
    // Implementar filtrado si quieres
    console.log('Filtrando de', this.fechaInicio, 'a', this.fechaFin);
  }

  descargarGraficaPNG(index: number, chartTitle: string) {
    const chart = this.charts.toArray()[index];
    if (!chart) { alert('Gráfico no encontrado'); return; }

    const canvas = chart.chart?.canvas;
    if (!canvas) { alert('Canvas no disponible'); return; }

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${chartTitle.toLowerCase().replace(/\s/g,'-')}-grafica.png`;
    link.click();
  }

  descargarInformePDF(containerId: string, chartTitle: string) {
    const element = document.getElementById(containerId);
    if (!element) { alert('Elemento no encontrado'); return; }

    const options = {
      margin: 10,
      filename: `${chartTitle.toLowerCase().replace(/\s/g,'-')}-informe.pdf`,
      image: { type:'jpeg', quality:0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit:'mm', format:'a4', orientation:'portrait' }
    };
    html2pdf(element, options);
  }
}


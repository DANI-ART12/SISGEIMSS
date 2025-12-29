import { Component, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartOptions, ChartData } from 'chart.js';
import { CommonModule } from '@angular/common';

// 🌟 CORRECCIÓN CLAVE 🌟: Importamos la clase jsPDF directamente.
// Esto ayuda a que 'jspdf-autotable' se adjunte correctamente.
 import { jsPDF } from 'jspdf';
 // Se importa el plugin para extender jsPDF
 // 2. Importación del plugin jspdf-autotable para que se registre globalmente
import 'jspdf-autotable';

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
  
  isLoading: boolean = false; 
  graficas: Grafica[] = [];

  constructor(private cdr: ChangeDetectorRef) {
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
    console.log('Filtrando de', this.fechaInicio, 'a', this.fechaFin);
    // Aquí iría la llamada al Backend para obtener nuevos datos basados en las fechas
  }

  // Se mantiene la función PNG original
  descargarGraficaPNG(index: number, chartTitle: string) {
    const chart = this.charts.toArray()[index];
    if (!chart) { console.error('Gráfico no encontrado'); return; }

    const canvas = chart.chart?.canvas;
    if (!canvas) { console.error('Canvas no disponible'); return; }

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${chartTitle.toLowerCase().replace(/\s/g,'-')}-grafica.png`;
    link.click();
  }

  // FUNCIÓN AUXILIAR: Transforma los datos de la gráfica a un formato de tabla
  private formatDataToTable(grafica: Grafica): { head: string[], body: any[][] } {
    const head: string[] = ['Etiqueta', 'Dato']; 
    const body: any[][] = [];

    // Múltiples datasets (Barra, Línea)
    if (grafica.data.datasets.length > 1) {
      head.pop(); 
      head.push(...grafica.data.datasets.map(ds => ds.label || 'Dato'));
      
      grafica.data.labels?.forEach((label, index) => {
        const row = [label];
        grafica.data.datasets.forEach(ds => {
          row.push(ds.data[index]);
        });
        body.push(row);
      });

    // Un solo dataset (Pie, Doughnut)
    } else if (grafica.data.labels) {
      grafica.data.labels.forEach((label, index) => {
        body.push([label, grafica.data.datasets[0].data[index]]);
      });
    }

    return { head, body };
  }
  
  // FUNCIÓN: Descarga rápida individual (una gráfica = un PDF)
  descargarGraficaPDFRapido(grafica: Grafica) {
    this.isLoading = true;
    
    // Forzar la actualización de la UI
    this.cdr.detectChanges(); 
    
    // Aislar el proceso pesado para evitar el bloqueo del hilo de la UI
    setTimeout(() => {
        try {
            // 🌟 CLAVE: Instancia correcta de jsPDF
            const doc = new jsPDF();
            let yOffset = 15; 
            const tableData = this.formatDataToTable(grafica);

            // Encabezado
            doc.setFontSize(18);
            doc.text(`Informe Individual: ${grafica.title}`, 10, yOffset);
            yOffset += 10;

            // Filtros
            doc.setFontSize(10);
            doc.text(`Filtro: ${this.fechaInicio || 'N/A'} a ${this.fechaFin || 'N/A'}`, 10, yOffset);
            yOffset += 10; 

            // Generar la tabla con autoTable (ahora debería funcionar)
            (doc as any).autoTable({
                head: [tableData.head],
                body: tableData.body,
                startY: yOffset,
                margin: { left: 10, right: 10 },
            });

            // Guardar el PDF
            doc.save(`${grafica.title.toLowerCase().replace(/\s/g, '-')}-informe-rapido.pdf`);
            
        } catch (error) {
            console.error('Error al generar el PDF de tablas:', error);
        } finally {
            this.isLoading = false;
        }
    }, 10); 
  }
}
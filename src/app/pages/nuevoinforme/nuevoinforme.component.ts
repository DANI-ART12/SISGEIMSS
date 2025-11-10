import { Component, OnInit } from '@angular/core';
import{ CommonModule}from '@angular/common'


@Component({
  selector: 'app-nuevoinforme',
  // Si estás usando Angular 17+ con Standalone components, asegúrate de tener las importaciones necesarias, 
  // pero para este ejemplo, las dejamos vacías ya que el foco es el TS.
   imports: [CommonModule], 
  templateUrl: './nuevoinforme.component.html',
  styleUrls: ['./nuevoinforme.component.css']
})
export class NuevoinformeComponent implements OnInit {

  // --- 1. DATOS DE IDENTIFICACIÓN DEL INFORME (CABECERA) ---
  public noPliego: string = '493/2024';
  public fechaEmision: string = '08 DE NOVIEMBRE DEL 2024';
  public dependencia: string = 'ÓRGANO DE OPERACIÓN ADMINISTRATIVA DESCONCENTRADA ESTATAL OAXACA';
  public claveFormato: string = '1270-009-032';

  // --- 2. DATOS DE LA COMISIÓN ---
  public lugarComision: string = 'CIUDAD DE MEXICO';
  public periodo: string = 'DEL 3 AL 5 DE NOVIEMBRE DEL 2024';
  public actividadRealizada: string = 'ASISTE A CURSO DE CAPACITACIÓN: SEGUNDO TALLER PARA LA IMPARTICIÓN DEL PROGRAMA DE DESARROLLO GERENCIAL';

  // --- 3. DETALLE DE RESULTADOS (Array para facilitar el *ngFor en el HTML) ---
  public resultadosDetalle: string[] = [
    'SALIDA EL DÍA 03/11/2024 A LAS 13:30 HRS CON DESTINO A LA CIUDAD DE MÉXICO, LLEGADA A MI DESTINO EL MISMO DÍA A LAS 23:30 HRS.',
    'EL DÍA 4 DE NOVIEMBRE DEL 2024, SE ACUDE AL PRIMER DÍA DE CAPACITACIÓN DE INSTRUCTORES: PROCESO ADMINISTRATIVO CON RESULTADOS APROBATORIOS. ENTRADA 8:00 HRS Y SALIDA 18:00 HRS, EN EL AULA 1 DEL HOSPITAL DE PEDIATRIA',
    'EL DÍA 5 DE NOVIEMBRE DEL 2024 SE ACUDE AL SEGUNDO DIA DE CAPACITACIÓN DE INSTRUCTORES: PLANEACIÓN ESTRATEGICA CON RESULTADOS APROBATORIOS. ENTRADA 8:00 HRS Y SALIDA 18:00 HRS, EN EL AULA 1 DEL HOSPITAL DE PEDIATRIA',
    'SALIDA EL DÍA 05 DE NOVIEMBRE 2024 A LAS 22:00 HRS CON LLEGADA A LA CIUDAD DE OAXACA A LAS 04:00 HRS DEL DÍA 06/11/2024.'
  ];
  public conclusionSatisfactoria: string = 'SE LLEVA A CABO LA COMISIÓN EN TIEMPO Y FORMA, LOS RESULTADOS DE LA COMISIÓN FUERON SATISFACTORIOS.';

  // --- 4. DATOS DE FIRMAS ---
  public firmaSolicitanteNombre: string = 'DRA. TANIA GONZALEZ GUZMAN';
  public firmaSolicitanteCargo: string = 'DIRECTORA DEL HGZ-UMAA NO. 1, OAXACA';
  public firmaComisionadoNombre: string = 'ENF. IVONNE ADELA MARTINEZ MENDOZA';
  public firmaComisionadoCargo: string = 'SUBJEFA DE EDUC DE ENF Y TECNICOS';

  // Implementamos OnInit para mantener la convención, aunque la lógica es mínima.
  ngOnInit(): void {
    // Si necesitas cargar datos de una API al inicializar el componente, lo harías aquí.
  }

}

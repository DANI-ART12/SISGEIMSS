import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pliego-comision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pliego-comision.component.html',
})
export class PliegoComisionComponent {
  rfc = 'OEGP811027BQ5';
  curp = 'OEGP811027MOCRRL08';
  numeroPliego = '______/2024';
  fecha = '21 de mayo 2024';

  solicitanteNombre = 'LIC. SENORINA CASTRO MORENO';
  solicitanteCargo = 'M23 JEFE DE SERVS OOAD B - JEFE DE SERVICIOS DE DESARROLLO DE PERSONAL';
  solicitanteMatricula = '99217598';
  dependencia = 'Órgano de Operación Administrativa Desconcentrada';

  comisionadoNombre = 'LIC. MARIA DEL PILAR ORTEGA GARCÍA';
  comisionadoTipoContratacion = 'Confianza A';
  comisionadoMatricula = '99218665';
  grupoJerarquico = 'N49 JEFE A DEPTO CAPACIT Y TRANSP';
  telefono = '951 515 27 23';

  motivo = 'Asiste a dar capacitación y apoyo para la realización de la declaración patrimonial y de intereses en su modalidad de modificación 2024.';
  lugarComision = 'SALINA CRUZ, OAX';
  periodo = 'Del 22 al 24 de mayo 2024';
  totalDias = 'TRES';
  transporte = 'Traslado terrestre';

  cuotaDiaria = '$1,796.64';
  anticipoViaticos = '-';
  anticipoPasajes = '-';
  subtotal = '_____________________';
  gastoTotal = '-';

  presupuestoDisponible = '$42061603';
  clavePresupuestal = '219001 700100 Cuenta 42061603';
  responsablePresupuesto = 'C. ARACELY RAMÍREZ VÁSQUEZ (MAT 311210232)';

  firmaEmpleado = 'LIC. MARIA DEL PILAR ORTEGA GARCÍA';
}

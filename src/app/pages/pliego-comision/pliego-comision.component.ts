/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pliego-comision',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './pliego-comision.component.html',
  styleUrls: ['./pliego-comision.component.css']
})
export class PliegoComisionComponent {

  // Datos del formulario
  datos = {
    numeroComision: '',
    lugarFecha: '',
    funcionario: '',
    cp: '',
    categoria: '',
    area: '',
    empleado: '',
    gj: '',
    mat: '',
    tc: '',
    puesto: '',
    tel: '',
    depto: '',
    objeto: '',
    destino: '',
    del: '',
    al: '',
    transporte: '',
    chofer: '',
    acompanante: ''
  };

  // Montos financieros
  montos = {
    dias: 0,
    cuotaViaticos: 0,
    viaticos: 0,
    gasolina: 0,
    peaje: 0,
    transporteTerrestre: 0,
    avion: 0
  };

  // Cálculo automático: Subtotal (Sin avión)
  get subtotalSinAvion(): number {
    return (Number(this.montos.viaticos) || 0) + 
           (Number(this.montos.gasolina) || 0) + 
           (Number(this.montos.peaje) || 0) + 
           (Number(this.montos.transporteTerrestre) || 0);
  }

  // Cálculo automático: Gasto Total
  get gastoTotal(): number {
    return this.subtotalSinAvion + (Number(this.montos.avion) || 0);
  }

  imprimir() {
    window.print();
  }
}*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-pliego-comision',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pliego-comision.component.html',
  styleUrls: ['./pliego-comision.component.css']
})
export class PliegoComisionComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription | undefined;
  showModalAdmin = false;
  showModalTraslado = false;
  isAdminOrSub = false;
  isUser = false;

  // Listas para Autocompletado
  listaChoferes: string[] = ['JUAN PÉREZ GARCÍA', 'MARCO ANTONIO SOLÍS', 'RICARDO RODRÍGUEZ LÓPEZ', 'ROBERTO GÓMEZ BOLAÑOS'];

  // Modelo de datos UNIFICADO
  datos = {
    numeroComision: `2025/${Math.floor(Math.random() * 900) + 100}`,
    lugarFecha: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }),
    
    // Datos de Empleado
    empleado: 'DR. ARMANDO CASAS ROBLES',
    gj: 'Z-10', mat: '99283746', tc: '08',
    puesto: 'MÉDICO ESPECIALISTA EN ONCOLOGÍA',
    departamento: 'DEPARTAMENTO DE ESPECIALIDADES MÉDICAS',

    // Campos Modal Admin
    funcionario: '', cp: '', categoria: '', area: '', tel: '',

    // Campos Modal Traslado
    objeto: '', destino: '', del: '', al: '',
    transporte: 'VEHÍCULO OFICIAL', chofer: '', acompanante: '',
    observaciones: '',
    cuota: 0 // Cuota diaria para viáticos
  };

  // Montos base
  montos = {
    viaticos: 0, gasolina: 0, peaje: 0, 
    transporteTerrestre: 0, avion: 0
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.isAdminOrSub = user.role === 'ADMIN' || user.role === 'SUBADMIN';
        this.isUser = true;
      }
    });
  }

  // LÓGICA DE CÁLCULOS
  
  get calcularDias(): number {
    if (!this.datos.del || !this.datos.al) return 0;
    try {
      // Espera formato DD/MM/AAAA
      const [dia1, mes1, anio1] = this.datos.del.split('/').map(Number);
      const [dia2, mes2, anio2] = this.datos.al.split('/').map(Number);
      const inicio = new Date(anio1, mes1 - 1, dia1);
      const fin = new Date(anio2, mes2 - 1, dia2);
      const diff = fin.getTime() - inicio.getTime();
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
      return dias > 0 ? dias : 0;
    } catch (e) {
      return 0;
    }
  }

  get subtotalSinAvion(): number {
    // Calculamos viáticos: días * cuota
    const totalViaticos = this.calcularDias * (Number(this.datos.cuota) || 0);
    this.montos.viaticos = totalViaticos; 

    return totalViaticos + 
           (Number(this.montos.gasolina) || 0) + 
           (Number(this.montos.peaje) || 0) + 
           (Number(this.montos.transporteTerrestre) || 0);
  }

  get gastoTotal(): number {
    return this.subtotalSinAvion + (Number(this.montos.avion) || 0);
  }

  // ACCIONES
  toggleModalAdmin() { this.showModalAdmin = !this.showModalAdmin; }
  toggleModalTraslado() { this.showModalTraslado = !this.showModalTraslado; }
  imprimir() { window.print(); }

  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }
}
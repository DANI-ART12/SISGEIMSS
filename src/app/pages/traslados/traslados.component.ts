import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-traslados',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './traslados.component.html',
  styleUrls: ['./traslados.component.css']
})


export class TrasladosComponent implements OnInit {

  numeroLocal: string = '001';  // ✅ AQUÍ ESTÁ DECLARADA

  traslado = {
    folio: '',
    nombre: '',
    afiliacion: '',
    telefono: '',
    fecha: '',
    origen: '',
    destino: '',
    requiere: '',
    tipoServicio: '',
    posicion: ''
  };

  generarFolio() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    this.traslado.folio = `L${this.numeroLocal}${anio}`;
  }

  ngOnInit() {
    if (!this.traslado.folio) {
      this.generarFolio();
    }
  }

  guardarTraslado() {
    if (this.traslado.folio) {
      console.log("Traslado guardado", this.traslado);
      // aquí va la lógica de guardar
    }
  }

}

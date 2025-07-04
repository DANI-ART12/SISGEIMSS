import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface Ambulancia {
  nombre: string;
  kmMantenimiento: number;
}

@Component({
  selector: 'app-registro-km',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-km.component.html',
})
export class RegistroKmComponent {
  kmForm: FormGroup;
  ambulancias: Ambulancia[] = [
    { nombre: 'Ambulancia A', kmMantenimiento: 150 },
    { nombre: 'Ambulancia B', kmMantenimiento: 200 },
    { nombre: 'Ambulancia C', kmMantenimiento: 250 }
  ];

  totalRecorrido = 0;
  alerta = false;
  umbral = 50;

  constructor(private fb: FormBuilder) {
    this.kmForm = this.fb.group({
      ambulancia: ['', Validators.required],
      kmFaltante: [{ value: 0, disabled: true }, Validators.required],
      kmInicial: [0, [Validators.required, Validators.min(0)]],
      kmFinal: [0, [Validators.required, Validators.min(0)]],
      idaFecha: ['', Validators.required],
      idaHora: ['', Validators.required],
      vueltaFecha: ['', Validators.required],
      vueltaHora: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
      observaciones: ['']
    });

    this.kmForm.get('ambulancia')?.valueChanges.subscribe(nombre => {
      const amb = this.ambulancias.find(a => a.nombre === nombre);
      this.kmForm.get('kmFaltante')?.setValue(amb?.kmMantenimiento ?? 0);
      this.checkAlerta();
    });

    this.kmForm.get('kmInicial')?.valueChanges.subscribe(() => this.updateTotales());
    this.kmForm.get('kmFinal')?.valueChanges.subscribe(() => this.updateTotales());
  }

  private updateTotales() {
    const ini = +this.kmForm.get('kmInicial')?.value;
    const fin = +this.kmForm.get('kmFinal')?.value;
    this.totalRecorrido = fin >= ini ? fin - ini : 0;
    this.checkAlerta();
  }

  private checkAlerta() {
    const falt = +this.kmForm.get('kmFaltante')?.value;
    this.alerta = falt <= this.umbral;
  }

  onSubmit(): void {
    if (this.kmForm.invalid) {
      this.kmForm.markAllAsTouched();
      return;
    }

    const registro = {
      ...this.kmForm.getRawValue(),
      totalRecorrido: this.totalRecorrido
    };
    console.log('Registro enviado:', registro);
    alert('¡Kilometraje registrado correctamente!');

    this.kmForm.reset({
      ambulancia: '',
      kmFaltante: 0,
      kmInicial: 0,
      kmFinal: 0,
      idaFecha: '',
      idaHora: '',
      vueltaFecha: '',
      vueltaHora: '',
      fechaRegistro: '',
      observaciones: ''
    });
    this.totalRecorrido = 0;
    this.alerta = false;
  }
}

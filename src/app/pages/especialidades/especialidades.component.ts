import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

interface LugarComision {
  estado: string;
  region: string;
  nombreHospital: string;
  direccion: string;
  altoCosteVida: boolean;
  porcentaje: number;
}

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './especialidades.component.html',
})
export class EspecialidadesComponent {
  form: FormGroup;
  registros: LugarComision[] = [];
  filtrarEstado = '';
  filtrarRegion = '';
  mostrandoFormulario = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      estado: ['', Validators.required],
      region: ['', Validators.required],
      nombreHospital: ['', Validators.required],
      direccion: ['', Validators.required],
      altoCosteVida: [false],
      porcentaje: [{ value: 0, disabled: true }, [Validators.min(0), Validators.max(100)]]
    });

    this.form.get('altoCosteVida')?.valueChanges.subscribe(val => {
      const pct = this.form.get('porcentaje');
      val ? pct?.enable() : (pct?.disable(), pct?.setValue(0));
    });
  }

  nuevoRegistro() {
    this.mostrandoFormulario = true;
    this.form.reset({ altoCosteVida: false, porcentaje: 0 });
  }

  cancelar() {
    this.mostrandoFormulario = false;
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.registros.push(this.form.getRawValue());
    this.mostrandoFormulario = false;
  }

  get registrosFiltrados() {
    return this.registros.filter(r =>
      (!this.filtrarEstado || r.estado.toLowerCase().includes(this.filtrarEstado.toLowerCase())) &&
      (!this.filtrarRegion || r.region.toLowerCase().includes(this.filtrarRegion.toLowerCase()))
    );
  }
}


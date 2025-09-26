import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LugarComision {
  estado: string;
  region: string;
  nombreHospital: string;
  direccion: string;
  altoCosteVida: boolean;
  porcentaje?: number;
}

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './especialidades.component.html',
})
export class EspecialidadesComponent implements OnInit {
  form: FormGroup;

  registros: LugarComision[] = [
    {
      estado: 'Jalisco',
      region: 'Occidente',
      nombreHospital: 'Hospital Civil de Guadalajara',
      direccion: 'Av. Hospital 123',
      altoCosteVida: true,
      porcentaje: 25,
    },
    {
      estado: 'CDMX',
      region: 'Centro',
      nombreHospital: 'INCMNSZ',
      direccion: 'Insurgentes Sur 1234',
      altoCosteVida: false,
    },
  ];

  filtrarEstado = '';
  filtrarRegion = '';
  mostrandoFormulario = false;
  indiceEditando: number | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      estado: ['', Validators.required],
      region: ['', Validators.required],
      nombreHospital: ['', Validators.required],
      direccion: ['', Validators.required],
      altoCosteVida: [false],
      porcentaje: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    // Habilitar/deshabilitar porcentaje según checkbox
    this.form.get('altoCosteVida')?.valueChanges.subscribe((valor: boolean) => {
      const porcentajeControl = this.form.get('porcentaje');
      if (valor) {
        porcentajeControl?.enable();
        porcentajeControl?.setValidators([Validators.required, Validators.min(1), Validators.max(100)]);
      } else {
        porcentajeControl?.disable();
        porcentajeControl?.clearValidators();
        porcentajeControl?.setValue(null);
      }
      porcentajeControl?.updateValueAndValidity();
    });
  }

  // Filtrado de registros
  get registrosFiltrados(): LugarComision[] {
    return this.registros.filter(
      (r) =>
        (!this.filtrarEstado || r.estado.toLowerCase().includes(this.filtrarEstado.toLowerCase())) &&
        (!this.filtrarRegion || r.region.toLowerCase().includes(this.filtrarRegion.toLowerCase()))
    );
  }

  // Abrir modal
  abrirModal(): void {
    this.form.reset({ altoCosteVida: false });
    this.indiceEditando = null;
    this.mostrandoFormulario = true;
  }

  // Cerrar modal
  cancelar(): void {
    this.form.reset({ altoCosteVida: false });
    this.mostrandoFormulario = false;
    this.indiceEditando = null;
  }

  // Guardar nuevo registro o edición
  guardar(): void {
    if (this.form.invalid) return;

    const nuevo = this.form.getRawValue();

    if (this.indiceEditando !== null) {
      this.registros[this.indiceEditando] = nuevo;
    } else {
      this.registros.push(nuevo);
    }

    this.cancelar();
  }

  // Editar registro existente
  editar(index: number): void {
    const r = this.registros[index];
    this.form.setValue({
      estado: r.estado,
      region: r.region,
      nombreHospital: r.nombreHospital,
      direccion: r.direccion,
      altoCosteVida: r.altoCosteVida,
      porcentaje: r.altoCosteVida ? r.porcentaje : null,
    });

    if (r.altoCosteVida) {
      this.form.get('porcentaje')?.enable();
    } else {
      this.form.get('porcentaje')?.disable();
    }

    this.indiceEditando = index;
    this.mostrandoFormulario = true;
  }

  // Eliminar registro
  eliminar(index: number): void {
    const confirmacion = confirm('¿Deseas eliminar este registro?');
    if (confirmacion) {
      this.registros.splice(index, 1);
    }
  }

  // Cierre con tecla ESC
  @HostListener('document:keydown.escape', ['$event'])
  onEsc(event: KeyboardEvent) {
    if (this.mostrandoFormulario) {
      this.cancelar();
    }
  }
}

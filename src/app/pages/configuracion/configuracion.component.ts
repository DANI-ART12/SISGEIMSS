import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Seccion = 'usuarios' | 'vehiculos';

interface Usuario {
  id?: number;
  nombre: string;
  matricula: string;
  curp: string;
  rfc: string;
  categoria: string;
  asignacion: string;
  estatus: 'alta' | 'baja';
  password: string;
}

interface Vehiculo {
  id?: number;
  tipo: string;
  placas: string;
  modelo: string;
  actualKilometraje: number;
  proximoServicio: string;
  estatus: 'alta' | 'baja' | 'mantenimiento';
  ecco: string;
}

@Component({
  selector: 'app-configuraciones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
  seccionActiva: Seccion = 'usuarios';

  // --- Usuarios ---
  mostrarFormularioUsuario = false;
  editarUsuarioActivo = false;
  usuarioSeleccionado: Usuario | null = null;

  nuevoUsuario: Usuario = this.getNuevoUsuarioVacio();

  usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      matricula: '12345',
      curp: '',
      rfc: '',
      categoria: 'Médico',
      asignacion: '14000',
      estatus: 'alta',
      password: ''
    },
    {
      id: 2,
      nombre: 'Ana Gómez',
      matricula: '67890',
      curp: '',
      rfc: '',
      categoria: 'Enfermera',
      asignacion: '9000',
      estatus: 'alta',
      password: ''
    }
  ];

  // --- Vehículos ---
  mostrarFormularioVehiculo = false;
  editarVehiculoActivo = false;
  vehiculoSeleccionado: Vehiculo | null = null;

  nuevoVehiculo: Vehiculo = this.getNuevoVehiculoVacio();

  vehiculos: Vehiculo[] = [
    {
      id: 1,
      tipo: 'Ambulancia',
      placas: 'ABC-123',
      modelo: 'Ford',
      actualKilometraje: 12000,
      proximoServicio: '14000',
      estatus: 'alta',
      ecco: 'ECCO-001'
    },
    {
      id: 2,
      tipo: 'Camioneta',
      placas: 'XYZ-789',
      modelo: 'Chevrolet',
      actualKilometraje: 8000,
      proximoServicio: '9000',
      estatus: 'baja',
      ecco: 'ECCO-002'
    }
  ];

  cambiarSeccion(seccion: Seccion) {
    this.seccionActiva = seccion;
    this.mostrarFormularioUsuario = false;
    this.editarUsuarioActivo = false;
    this.mostrarFormularioVehiculo = false;
    this.editarVehiculoActivo = false;
    this.usuarioSeleccionado = null;
    this.vehiculoSeleccionado = null;
  }

  // Métodos Usuarios
  getNuevoUsuarioVacio(): Usuario {
    return {
      nombre: '',
      matricula: '',
      curp: '',
      rfc: '',
      categoria: '',
      asignacion: '',
      estatus: 'alta',
      password: ''
    };
  }

  agregarUsuario() {
    this.mostrarFormularioUsuario = true;
    this.editarUsuarioActivo = false;
    this.nuevoUsuario = this.getNuevoUsuarioVacio();
    this.usuarioSeleccionado = null;
  }

  guardarUsuario() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.matricula) {
      alert('Por favor llena todos los campos obligatorios.');
      return;
    }
    const nuevo: Usuario = {
      ...this.nuevoUsuario,
      id: this.usuarios.length ? Math.max(...this.usuarios.map(u => u.id ?? 0)) + 1 : 1,
      password: this.nuevoUsuario.matricula
    };
    this.usuarios.push(nuevo);
    this.mostrarFormularioUsuario = false;
    this.nuevoUsuario = this.getNuevoUsuarioVacio();
  }

  editarUsuario(usuario: Usuario) {
    this.editarUsuarioActivo = true;
    this.mostrarFormularioUsuario = false;
    this.usuarioSeleccionado = { ...usuario };
  }

  guardarCambiosUsuario() {
    if (!this.usuarioSeleccionado) return;
    const index = this.usuarios.findIndex(u => u.id === this.usuarioSeleccionado!.id);
    if (index !== -1) {
      this.usuarios[index] = { ...this.usuarioSeleccionado };
      this.editarUsuarioActivo = false;
      this.usuarioSeleccionado = null;
    }
  }

  toggleEstatusUsuario() {
    if (this.usuarioSeleccionado) {
      this.usuarioSeleccionado.estatus = this.usuarioSeleccionado.estatus === 'alta' ? 'baja' : 'alta';
    }
  }

  // Métodos Vehículos
  getNuevoVehiculoVacio(): Vehiculo {
    return {
      tipo: '',
      placas: '',
      modelo: '',
      actualKilometraje: 0,
      proximoServicio: '',
      estatus: 'alta',
      ecco: ''
    };
  }

  agregarVehiculo() {
    this.mostrarFormularioVehiculo = true;
    this.editarVehiculoActivo = false;
    this.nuevoVehiculo = this.getNuevoVehiculoVacio();
    this.vehiculoSeleccionado = null;
  }

  guardarVehiculo() {
    if (!this.nuevoVehiculo.tipo || !this.nuevoVehiculo.placas || !this.nuevoVehiculo.modelo) {
      alert('Por favor, rellena todos los campos obligatorios del vehículo.');
      return;
    }
    const nuevo: Vehiculo = {
      ...this.nuevoVehiculo,
      id: this.vehiculos.length ? Math.max(...this.vehiculos.map(v => v.id ?? 0)) + 1 : 1
    };
    this.vehiculos.push(nuevo);
    this.mostrarFormularioVehiculo = false;
    this.nuevoVehiculo = this.getNuevoVehiculoVacio();
  }

  editarVehiculo(vehiculo: Vehiculo) {
    this.editarVehiculoActivo = true;
    this.mostrarFormularioVehiculo = false;
    this.vehiculoSeleccionado = { ...vehiculo };
  }

  guardarCambiosVehiculo() {
    if (!this.vehiculoSeleccionado) return;
    const index = this.vehiculos.findIndex(v => v.id === this.vehiculoSeleccionado!.id);
    if (index !== -1) {
      this.vehiculos[index] = { ...this.vehiculoSeleccionado };
      this.editarVehiculoActivo = false;
      this.vehiculoSeleccionado = null;
    }
  }

  toggleEstatusVehiculo() {
    if (this.vehiculoSeleccionado) {
      this.vehiculoSeleccionado.estatus = this.vehiculoSeleccionado.estatus === 'alta' ? 'baja' : 'alta';
    }
  }
}

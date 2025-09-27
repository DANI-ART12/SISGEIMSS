import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuarios.service';
import { VehiculoService } from '../../service/vehiculos.service';
import { TipoVehiculoService } from '../../service/tipo_vehiculo.service';

type Seccion = 'usuarios' | 'vehiculos';

interface Usuario {
  idUsuario?: number;
  nombreUsuario: string;
  apellidoPUsuario: string;
  apellidoMUsuario: string;
  matriculaUsuario: string;
  curpUsuario: string;
  rfcUsuario: string;
  categoriaUsuario: string;
  passwordUsuario: string;
  fkIdTipoUsuario: number;
  statusUsuario: number;
}

interface Vehiculo {
  idVehiculo?: number;
  fkIdTipoVehiculo: number;
  placa: string;
  marca: string;
  modelo: string;
  kilometrajeActual: number;
  proximoServicioKm: string;
  estatus: 'alta' | 'baja' | 'mantenimiento';
  ecco: string;
}

interface TipoVehiculo {
  idTipoVehiculo: number;
  nombreTipo: string;
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
export class ConfiguracionComponent implements OnInit {
  seccionActiva: Seccion = 'usuarios';

  tiposVehiculos: TipoVehiculo[] = []; // aquí guardaremos los tipos

  // --- Usuarios ---
  usuarios: any[] = [];
  usuarioForm: FormGroup;
  mostrarFormularioUsuario = false;
  editarUsuarioActivo = false;
  usuarioSeleccionado: Usuario | null = null;
  nuevoUsuario: Usuario = this.getNuevoUsuarioVacio();

   // --- Vehículos ---
  vehiculos: Vehiculo[] = [];
  mostrarFormularioVehiculo = false;
  editarVehiculoActivo = false;
  vehiculoSeleccionado: Vehiculo | null = null;
  nuevoVehiculo: Vehiculo = this.getNuevoVehiculoVacio();

  isEditing = false;
  selectedUserId: number | null = null;

  constructor(private usuarioService: UsuarioService,
    private vehiculoService: VehiculoService,
     private tipoVehiculoService: TipoVehiculoService,

    private fb: FormBuilder) {
    // ✅ Inicializamos el formulario reactivo
    this.usuarioForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      apellidoPUsuario: ['', Validators.required],
      apellidoMUsuario: ['', Validators.required],
      matriculaUsuario: ['', Validators.required],
      curpUsuario: ['', Validators.required],
      rfcUsuario: ['', Validators.required],
      categoriaUsuario: ['', Validators.required],
      fkIdTipoUsuario: [1, Validators.required], // valor por defecto
      statusUsuario: [1, Validators.required],   // activo por defecto
      passwordUsuario: ['', Validators.required]
    });
  }

   ngOnInit(): void {
    this.getUsuarios();
    this.getVehiculos();
    this.getTiposVehiculos(); // 🚀 cargamos los tipos al iniciar
  }

    cambiarSeccion(seccion: Seccion) {
    this.seccionActiva = seccion;
    this.resetFormularios();
  }

  resetFormularios(){
    this.mostrarFormularioUsuario = false;
    this.editarUsuarioActivo = false;
    this.mostrarFormularioVehiculo = false;
    this.editarVehiculoActivo = false;
    this.usuarioSeleccionado = null;
    this.vehiculoSeleccionado = null;
  }

  // --- Métodos Usuarios ---
  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (response) => {
        console.log('Datos recibidos:', response);
        if (response && response.data) {
          this.usuarios = response.data; // porque la respuesta trae { statusCode, data }
        }
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  // Métodos Usuarios
  getNuevoUsuarioVacio(): Usuario {
    return {
      nombreUsuario: '',
      apellidoPUsuario: '',
      apellidoMUsuario:'',
      matriculaUsuario: '',
      curpUsuario: '',
      rfcUsuario: '',
      categoriaUsuario: '',
      passwordUsuario: '',
      fkIdTipoUsuario: 1,
      statusUsuario: 1
    };
  }

  agregarUsuario() {
    this.mostrarFormularioUsuario = true;
    this.editarUsuarioActivo = false;
    this.nuevoUsuario = this.getNuevoUsuarioVacio();
    this.usuarioSeleccionado = null;
  }

  guardarUsuario() {
    if (!this.nuevoUsuario.nombreUsuario || !this.nuevoUsuario.matriculaUsuario) {
      alert('Por favor llena todos los campos obligatorios.');
      return;
    }
     // Mostrar datos en consola antes de enviar
    console.log('Datos que se enviarán al backend:', this.nuevoUsuario)

    const nuevo: Usuario = {
      ...this.nuevoUsuario,
      idUsuario: this.usuarios.length ? Math.max(...this.usuarios.map(u => u.id ?? 0)) + 1 : 1,
      passwordUsuario: this.nuevoUsuario.matriculaUsuario
    };

    

    this.usuarioService.addUsuario(this.nuevoUsuario).subscribe({
      next: (response) => {
        console.log('Usuario agregado exitosamente:', response);
        alert('Usuario agregado exitosamente');
        this.getUsuarios(); // Refrescar la lista de usuarios
        this.mostrarFormularioUsuario = false;
        this.nuevoUsuario = this.getNuevoUsuarioVacio();
      },
      error: (error) => {
        console.error('Error al agregar usuario:', error);
        alert('Error al agregar usuario. Por favor, intenta de nuevo.');
      }
    })
    this.usuarios.push(nuevo);
  }

  editarUsuario(usuario: Usuario) {
    this.editarUsuarioActivo = true;
    this.mostrarFormularioUsuario = false;
    this.usuarioSeleccionado = { ...usuario };
    console.log('Usuario seleccionado para editar:', this.usuarioSeleccionado);
  }

  guardarCambiosUsuario() {
  if (!this.usuarioSeleccionado || !this.usuarioSeleccionado.idUsuario) {
    alert('No hay usuario seleccionado para editar.');
    return;
  }

  console.log('Datos que se enviarán para actualizar:', this.usuarioSeleccionado);

  this.usuarioService.updateUsuario(this.usuarioSeleccionado.idUsuario, this.usuarioSeleccionado).subscribe({
    next: (response) => {
      console.log('Usuario actualizado con éxito:', response);
      alert('Usuario actualizado correctamente');
      this.getUsuarios(); // Recargar la lista desde la API
      this.editarUsuarioActivo = false;
      this.usuarioSeleccionado = null; // Limpiar selección
    },
    error: (error) => {
      console.error('Error al actualizar usuario:', error);
      alert('Error al actualizar el usuario');
    }
  });
}


  getStatusTexto(statusUsuario: number): string {
  switch (statusUsuario) {
    case 1:
      return 'Alta';
    case 0:
      return 'Baja';
    default:
      return 'Desconocido';
  }
}


tipoUsuarioMap: { [key: number]: string } = {
  5: 'Administrador',
  2: 'Subadministrador',
  3: 'Operador',
  4: 'Administrativo'
};


 // --- Métodos Vehículos ---
getVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe({
      next: (response) => {
        console.log('Datos recibidos:', response);
        this.vehiculos = response?.data || [];
      },
      error: (error) => {
        console.error('Error al obtener vehículos:', error);
      }
    });
  }

  // Métodos Vehículos
  getNuevoVehiculoVacio(): Vehiculo {
    return {
      fkIdTipoVehiculo: 0,
      placa: '',
      modelo: '',
      marca: '',
      kilometrajeActual: 0,
      proximoServicioKm: '',
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
  if (!this.nuevoVehiculo.placa || !this.nuevoVehiculo.modelo) {
    alert('Rellena todos los campos obligatorios.');
    return;
  }

  const vehiculoAEnviar = {
    ...this.nuevoVehiculo,
    fkIdTipoVehiculo: Number(this.nuevoVehiculo.fkIdTipoVehiculo), // 👈 forzar número
    estatus: this.nuevoVehiculo.estatus?.toUpperCase() || 'ALTA'   // 👈 forzar mayúsculas
  };

  console.log('Datos del vehículo a enviar:', vehiculoAEnviar);

  this.vehiculoService.addVehiculo(vehiculoAEnviar).subscribe({
    next: (response) => {
      alert('Vehículo agregado exitosamente');
      this.getVehiculos();
      this.mostrarFormularioVehiculo = false;
      this.nuevoVehiculo = this.getNuevoVehiculoVacio();
    },
    error: (error) => {
      console.error('Error al agregar vehículo:', error);
      alert('Error al agregar vehículo');
    }
  });
}


 getTiposVehiculos(): void {
    this.tipoVehiculoService.getTiposVehiculos().subscribe({
      next: (response) => {
        console.log('Tipos de vehículos recibidos:', response);
        this.tiposVehiculos = response?.data || []; // asumiendo que tu API devuelve {data: [...]}
      },
      error: (error) => {
        console.error('Error al obtener tipos de vehículos:', error);
      }
    });
  }
  editarVehiculo(vehiculo: Vehiculo) {
    this.editarVehiculoActivo = true;
    this.mostrarFormularioVehiculo = false;
    this.vehiculoSeleccionado = { ...vehiculo };
  }



   guardarCambiosVehiculo() {
    if (!this.vehiculoSeleccionado?.idVehiculo) return;

    this.vehiculoService.updateCar(this.vehiculoSeleccionado.idVehiculo, this.vehiculoSeleccionado).subscribe({
      next: () => {
        alert('Vehículo actualizado correctamente');
        this.getVehiculos();
        this.editarVehiculoActivo = false;
        this.vehiculoSeleccionado = null;
      },
      error: (error) => {
        console.error('Error al actualizar vehículo:', error);
        alert('Error al actualizar vehículo');
      }
    });
  }


  tipoVehiculoMap: { [key: number]: string } = {
  1: 'CAMIENOTA',
  2: 'Subadministrador',
  3: 'Operador',
  4: 'Administrativo'
};


  toggleEstatusVehiculo() {
    if (this.vehiculoSeleccionado) {
      this.vehiculoSeleccionado.estatus = this.vehiculoSeleccionado.estatus === 'alta' ? 'baja' : 'alta';
    }
  } 
}

  
  // guardarCambiosVehiculo() {
  //   if (!this.vehiculoSeleccionado) return;
  //   const index = this.vehiculos.findIndex(v => v.idVehiculo === this.vehiculoSeleccionado!.idVehiculo);
  //   if (index !== -1) {
  //     this.vehiculos[index] = { ...this.vehiculoSeleccionado };
  //     this.editarVehiculoActivo = false;
  //     this.vehiculoSeleccionado = null;
  //   }
  // }


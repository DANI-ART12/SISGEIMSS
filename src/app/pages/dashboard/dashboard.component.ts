import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/auth/auth.service';
import { FormsModule } from '@angular/forms';
import{CommonModule} from '@angular/common';

interface Traslado {
  id: number;
  folio: string;
  origen: string;
  destino: string;
  fecha: string;
  estado: string;
}

@Component({
  selector: 'app-dashboard',
  imports:[CommonModule,FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  usuario: User | null = null;
  mensajeBienvenida: string = '';
  trasladosAsignados: Traslado[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.usuario = this.auth.getCurrentUser();

    if (this.usuario) {
      const hora = new Date().getHours();
      let saludo = '';
      if (hora < 12) saludo = 'Buenos días';
      else if (hora < 18) saludo = 'Buenas tardes';
      else saludo = 'Buenas noches';

      let mensajeRol = '';
      switch (this.usuario.role) {
        case 'ADMIN':
          mensajeRol = '¡Tienes acceso completo al sistema!';
          break;
        case 'SUBADMIN':
          mensajeRol = '¡Puedes gestionar algunos recursos del sistema!';
          break;
        case 'USER':
          mensajeRol = '¡Bienvenido! Aquí puedes ver tus traslados asignados.';
          // 🔹 Traslados simulados con folio
          this.trasladosAsignados = [
            { id: 1, folio: 'PL-2025-001', origen: 'CDMX', destino: 'Guadalajara', fecha: '2025-10-03', estado: 'Pendiente' },
            { id: 2, folio: 'PL-2025-002', origen: 'Monterrey', destino: 'CDMX', fecha: '2025-10-05', estado: 'Confirmado' }
          ];
          break;
      }

      this.mensajeBienvenida = `${saludo}, ${this.usuario.role} (${this.usuario.matricula})! ${mensajeRol}`;
    } else {
      this.mensajeBienvenida = 'Bienvenido, Invitado!';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  usuario: User | null = null;
  mensajeBienvenida: string = '';

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
          mensajeRol = '¡Bienvenido! Aquí puedes ver tu información.';
          break;
      }

      this.mensajeBienvenida = `${saludo}, ${this.usuario.role} (${this.usuario.matricula})! ${mensajeRol}`;
    } else {
      this.mensajeBienvenida = 'Bienvenido, Invitado!';
    }
  }
}

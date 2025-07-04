import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  matricula = '';
  password = '';
  error = '';

  imagenesCarrusel: string[] = [
    'assets/imagen12.webp',
    'assets/imagen14.webp',
    'assets/imagen15.webp',
    'assets/imagen16.webp'
  ];
indiceActual =0;
intervalo: any;

  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.preloadImages();
      this.iniciarCarrusel();
    }
  }
  preloadImages() {
    this.imagenesCarrusel.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  iniciarCarrusel() {
    this.intervalo = setInterval(() => {
      this.indiceActual = (this.indiceActual + 1) % this.imagenesCarrusel.length;
    }, 15000); // 15 segundos
  }

  login() {
    if (this.auth.login(this.matricula, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Credenciales inválidas';
    }
  }
}





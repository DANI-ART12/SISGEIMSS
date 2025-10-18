// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../core/auth/auth.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule,CommonModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   matricula = '';
//   password = '';
//   error = '';
//   mostrarPassword = false;

//   imagenesCarrusel: string[] = [
//     'assets/imagen1.png',
//     'assets/imagen2.png',
//     'assets/imagen3.png',
//     'assets/imagen4.png'
//   ];
//   indiceActual = 0;
//   intervalo: any;

//   constructor(private auth: AuthService, private router: Router) {}

//   onLogin() {
//     this.auth.login(this.matricula, this.password).subscribe({
//       next: user => {
//         console.log('✅ Login exitoso:', user);

//         // Redirige según el rol
//         switch (user.role) {
//           case 'ADMIN':
//             this.router.navigate(['/dashboard-admin']);
//             break;
//           case 'SUBADMIN':
//             this.router.navigate(['/dashboard-subadmin']);
//             break;
//           default:
//             this.router.navigate(['/dashboard-user']);
//         }
//       },
//       error: err => {
//         console.error('❌ Error en login', err);
//         this.error = 'Credenciales incorrectas';
//       }
//     });
//   }

//   ngOnInit() {
//     if (typeof window !== 'undefined') {
//       this.preloadImages();
//       this.iniciarCarrusel();
//     }
//   }

//   preloadImages() {
//     this.imagenesCarrusel.forEach(src => {
//       const img = new Image();
//       img.src = src;
//     });
//   }

//   ngOnDestroy() {
//     clearInterval(this.intervalo);
//   }

//   iniciarCarrusel() {
//     this.intervalo = setInterval(() => {
//       this.indiceActual = (this.indiceActual + 1) % this.imagenesCarrusel.length;
//     }, 15000); // cambia cada 15 segundos
//   }

//   login() {
//     if (this.auth.login(this.matricula, this.password)) {
//       this.router.navigate(['/dashboard']);
//     } else {
//       this.error = 'Credenciales inválidas';
//     }
//   }

//   togglePassword() {
//     this.mostrarPassword = !this.mostrarPassword;
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  matricula = '';
  password = '';
  error = '';
  mostrarPassword = false;

  imagenesCarrusel: string[] = [
    'assets/imagen1.png',
    'assets/imagen2.png',
    'assets/imagen3.png',
    'assets/imagen4.png'
  ];
  indiceActual = 0;
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
    }, 15000); // cambia cada 15 segundos
  }

  login() {
    if (this.auth.login(this.matricula, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Credenciales inválidas';
    }
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
}



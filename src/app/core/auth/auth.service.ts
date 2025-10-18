// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, map, Observable } from 'rxjs';

// export type UserRole = 'ADMIN' | 'SUBADMIN' | 'USER';

// export interface User {
//   id: number;
//   matricula: string;
//   nombre: string;
//   password: string;
//   role: UserRole;
// }

// // const SEED_USERS: User[] = [
// //   { matricula: 'A001', password: 'admin123', role: 'ADMIN' },
// //   { matricula: 'S001', password: 'sub123', role: 'SUBADMIN' },
// //   { matricula: 'U001', password: 'user123', role: 'USER' },

// // ];

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private apiUrl = 'http://localhost:5001/api/v1/login-user';
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

//   constructor(private http: HttpClient) {}

//   // login(matricula: string, password: string): boolean {
//   login(matricula: string, password: string): Observable<User> {
//     // const found = SEED_USERS.find(u => u.matricula === matricula && u.password === password);
//     // if (found) {
//     //   this.currentUserSubject.next(found);
//     //   return true;
//     // }
//     // return false;


//       return this.http.post<any>(this.apiUrl, { matricula, password }).pipe(
//       map(response => {
//         const userData = response.usuario;

//         // 🔹 Mapea fkIdTipoUsuario a un rol del frontend
//         let role: UserRole;
//         switch (userData.fkIdTipoUsuario) {
//           case 1:
//             role = 'ADMIN';
//             break;
//           case 2:
//             role = 'SUBADMIN';
//             break;
//           default:
//             role = 'USER';
//         }

//         const user: User = {
//           id: userData.idUsuario,
//           matricula: userData.matriculaUsuario,
//           nombre: userData.nombreUsuario,
//           password: userData.passwordUsuario,
//           role
//         };

//         // Guarda el usuario en memoria y en localStorage
//         this.currentUserSubject.next(user);
//         localStorage.setItem('currentUser', JSON.stringify(user));

//         return user;
//       })
//     );
//   }

//   logout() {
//     this.currentUserSubject.next(null);
//   }

//   getCurrentUser(): User | null {
//     return this.currentUserSubject.value;
//   }

//   getRole(): UserRole | null {
//     return this.currentUserSubject.value?.role || null;
//   }

//   isLoggedIn(): boolean {
//     return !!this.currentUserSubject.value;
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserRole = 'ADMIN' | 'SUBADMIN' | 'USER';

export interface User {
  matricula: string;
  password: string;
  role: UserRole;
}

const SEED_USERS: User[] = [
  { matricula: 'A001', password: 'admin123', role: 'ADMIN' },
  { matricula: 'S001', password: 'sub123', role: 'SUBADMIN' },
  { matricula: 'U001', password: 'user123', role: 'USER' },

];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  login(matricula: string, password: string): boolean {
    const found = SEED_USERS.find(u => u.matricula === matricula && u.password === password);
    if (found) {
      this.currentUserSubject.next(found);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getRole(): UserRole | null {
    return this.currentUserSubject.value?.role || null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
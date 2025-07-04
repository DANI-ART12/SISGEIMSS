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


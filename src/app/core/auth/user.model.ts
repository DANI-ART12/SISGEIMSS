export type UserRole = 'ADMIN' | 'SUBADMIN' | 'USER';

export interface User {
  password: string;
  matricula: string;
  role: UserRole;
}

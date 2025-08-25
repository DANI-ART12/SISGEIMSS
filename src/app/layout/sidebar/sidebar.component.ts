import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Corrección aquí

import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { UserRole } from '../../core/auth/user.model';
import {
  LucideAngularModule,
  Car, Users, Route as RouteIcon, File, Settings, 
  HelpCircle, LogOut, Search, History, FileSearch, ScrollText,FileText, ChartBar, BookOpenText,           // botones al pie
  HospitalIcon, FilePen, FilePenLine, FileMinus,
  ContactRound, BadgeDollarSign,
} from 'lucide-angular';

const iconMap = {
  Car,
  Users,
  Route: RouteIcon,
  File,
  Settings,
  ChartBar,
  HelpCircle,
  LogOut,
  Search,
  History,
  FileSearch,
  ScrollText,
  FileText,
  HospitalIcon,
  FilePen,
  FilePenLine,
  FileMinus,
  BookOpenText,
  ContactRound,
  BadgeDollarSign
};

interface SidebarLink {
  label: string;
  icon: keyof typeof iconMap; // lucide icon name
  route: string;
}

const LINKS: Record<UserRole, SidebarLink[]> = {
  ADMIN: [
    { label: 'Traslados Locales', icon: 'FileText', route: '/traslados' },
    { label: 'Informe Comisión', icon: 'FileSearch', route: '/informecomision' },
    { label: 'Pliego Comisión', icon: 'ScrollText', route: '/pliego-comision' },
    { label: 'Registro KM', icon: 'Car', route: '/registro-km' },
    {label:'Pliego Confianza', icon:'BookOpenText', route:'/pliegoactual'},
    {label:'Historial de Pacientes',icon:'ContactRound',route:'/registropacientes'},
    { label: 'Traslados Viajes', icon: 'Route', route: '/viajes' },
    { label: 'Gráficos', icon: 'ChartBar', route: '/graficos' },
    { label: 'Hospitales', icon: 'HospitalIcon', route: '/especialidades' },
    { label: 'Historial', icon: 'History', route: '/historial' },
    {label:'Pagados',icon:'BadgeDollarSign',route:'/historialpagos'},
    { label: 'Configuración', icon: 'Settings', route: '/configuracion' }
  ],

  SUBADMIN: [
    { label: 'Traslados Locales', icon: 'FileText', route: '/traslados' },
    { label: 'Informe Comisión', icon: 'FileSearch', route: '/informecomision' },
    { label: 'Pliego Comisión', icon: 'ScrollText', route: '/pliego-comision' },
    {label:'Pliego Confianza', icon:'BookOpenText', route:'/pliegoactual'},
    {label:'Historial de Pacientes',icon:'ContactRound',route:'/registropacientes'},
    { label: 'Registro KM', icon: 'Car', route: '/registro-km' },
    { label: 'Traslados Viajes', icon: 'Route', route: '/viajes' },
    { label: 'Historial', icon: 'History', route: '/historial' },
    {label:'Pagados',icon:'BadgeDollarSign',route:'/historialpagos'}
  ],

  USER: [
    { label: 'Pliego Comisión', icon: 'ScrollText', route: '/pliego-comision' },
    { label: 'Pliego Confianza', icon: 'BookOpenText', route: '/pliegoactual' },
    { label: 'Registro KM', icon: 'Car', route: '/registro-km' },
    { label: 'Informe Comisión', icon: 'FileSearch', route: '/informecomision' },
    { label: 'Historial', icon: 'History', route: '/historial' }
  ]
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    LucideAngularModule
],
  templateUrl: './sidebar.component.html',
  //styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() role: UserRole = 'USER';

  readonly icons = iconMap;

  constructor(private auth: AuthService, private router: Router) {}

  get links(): SidebarLink[] {
    return LINKS[this.role];
  }

  logout() {
    this.auth.logout(); // Llama al servicio de logout
    localStorage.clear(); // Limpiar cualquier información persistida en el almacenamiento local
    sessionStorage.clear(); // Limpiar el almacenamiento de sesión si es necesario
    this.router.navigate(['/login']); // Redirige al login
  }

  user = {
    name: 'John Doe',
    role: 'Product Designer',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026708c'
  };
}


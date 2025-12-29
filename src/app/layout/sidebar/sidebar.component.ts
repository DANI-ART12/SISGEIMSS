import { Component, Input, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 

import { AuthService } from '../../core/auth/auth.service';
import { UserRole } from '../../core/auth/user.model';
import {
    LucideAngularModule,
    Car, Users, Route as RouteIcon, File, Settings, 
    HelpCircle, LogOut, Search, History, FileSearch, ScrollText,FileText, Wrench, ChartBar, BookOpenText,
    HospitalIcon, FilePen, FilePenLine, FileMinus,
    ContactRound, BadgeDollarSign, Bus, ChevronDown,
} from 'lucide-angular';

// Mantenemos iconMap
const iconMap = {
    Car, Users, Route: RouteIcon, File, Settings, 
    ChartBar, HelpCircle, LogOut, Search, History, 
    FileSearch, ScrollText, FileText, HospitalIcon, 
    FilePen, FilePenLine, FileMinus, BookOpenText, 
    ContactRound, BadgeDollarSign, Bus, Wrench, ChevronDown
};

// --- Tipos de Datos para la nueva estructura de Menú ---

interface SimpleLink {
    label: string;
    icon: keyof typeof iconMap;
    route: string;
}

interface ParentLink {
    label: string;
    icon: keyof typeof iconMap;
    children: SimpleLink[]; // Submenú
}

type SidebarMenuItem = SimpleLink | ParentLink;

// --- Definición de enlaces con estructura jerárquica ---

const LINKS: Record<UserRole, SidebarMenuItem[]> = {
    ADMIN: [
        // AGRUPACIÓN: Documentos y Pliegos (CON submenú)
        {
            label: 'Pliegos y Reportes',
            icon: 'FileText', // Usamos un ícono para la categoría
            children: [
                { label: 'Pliego Comisión', icon: 'ScrollText', route: '/pliego-comision' },
                { label: 'Informe Comisión', icon: 'FileSearch', route: '/informecomision' },
                { label: 'Pliego Confianza', icon: 'BookOpenText', route: '/pliegoactual' },
                //{ label: 'Comprobación', icon: 'FileText', route: '/comprobacion' },
               // { label: 'Viáticos y Pasajes', icon: 'BadgeDollarSign', route: '/viaticos-pasajes' },
                {label: 'Desglose de Gastos', icon: 'FileText', route:'/gastos'},
               // {label: ' Solictid de Viaticos y Pasajes', icon: 'FileText', route:'/solicitudvyp'},
               // {label: ' Informe comision nuevo', icon: 'FileText', route:'/nuevoinforme'},
                {label: 'Oficio', icon:'FileText', route:'/pliego'},


            ]
        },
        // ELEMENTOS SIMPLES RESTANTES
        { label: 'Traslados', icon: 'Bus', route: '/trasladosfl' },
        { label: 'Traslados Locales', icon: 'FileText', route: '/traslados' },
        { label: 'Registro KM', icon: 'Car', route: '/registro-km' },
        { label: 'Historial de Pacientes', icon: 'ContactRound', route: '/registropacientes' },
        { label: 'Traslados ', icon: 'Route', route: '/viajes' },
        { label: 'Gráficos', icon: 'ChartBar', route: '/graficos' },
        { label: 'Hospitales', icon: 'HospitalIcon', route: '/especialidades' },
        { label: 'Historial', icon: 'History', route: '/historial' },
        { label: 'Pagados', icon: 'BadgeDollarSign', route: '/historialpagos' },
        { label: 'Historial de Vehiculos', icon: 'Wrench', route: '/historialvehiculos' },
        { label: 'Configuración', icon: 'Settings', route: '/configuracion' },
    ],

    SUBADMIN: [
        // AGRUPACIÓN: Documentos y Pliegos (CON submenú)
        {
            label: 'Pliegos y Reportes',
            icon: 'FileText',
            children: [
                { label: 'Pliego Comisión', icon: 'ScrollText', route: '/pliego-comision' },
                { label: 'Informe Comisión', icon: 'FileSearch', route: '/informecomision' },
                { label: 'Pliego Confianza', icon: 'BookOpenText', route: '/pliegoactual' },
               // { label: 'Comprobación', icon: 'FileText', route: '/comprobacion' },
               // { label: 'Viáticos y Pasajes', icon: 'BadgeDollarSign', route: '/viaticos-pasajes' },
                {label: 'Desglose de Gastos', icon: 'FileText', route:'/gastos'},
               // {label: ' Solictid de Viaticos y Pasajes', icon: 'FileText', route:'/solicitudvyp'},
               //{label: ' Informe comision nuevo', icon: 'FileText', route:'/nuevoinforme'},
               {label: 'Oficio', icon:'FileText', route:'/pliego'},
                
            ]
        },
        // ELEMENTOS SIMPLES RESTANTES
        { label: 'Traslados', icon: 'Bus', route: '/trasladosfl' },
        { label: 'Traslados Locales', icon: 'FileText', route: '/traslados' },
        { label: 'Registro KM', icon: 'Car', route: '/registro-km' },
        { label: 'Historial de Pacientes', icon: 'ContactRound', route: '/registropacientes' },
        { label: 'Traslados ', icon: 'Route', route: '/viajes' },
        { label: 'Historial', icon: 'History', route: '/historial' },
        { label: 'Pagados', icon: 'BadgeDollarSign', route: '/historialpagos' },
        { label: 'Historial de Vehiculos', icon: 'Wrench', route: '/historialvehiculos' },
        { label: 'Configuración', icon: 'Settings', route: '/configuracion' }
    ],

    USER: [
        // ELEMENTOS SIMPLES (SIN submenú)
         { label: 'Pliego Comisión', icon: 'ScrollText', route: '/pliego-comision' },
         { label: 'Informe Comisión', icon: 'FileSearch', route: '/informecomision' },
         { label: 'Pliego Confianza', icon: 'BookOpenText', route: '/pliegoactual' },
        {label: 'Desglose de Gastos', icon: 'FileText', route:'/gastos'},
        { label: 'Registro KM', icon: 'Car', route: '/registro-km' },
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
    
    // Estado para controlar qué submenú está abierto (usando el índice del enlace como clave)
    // Inicialmente, no hay submenú abierto
    openedSubmenuIndex = signal<number | null>(null);

    constructor(private auth: AuthService, private router: Router) {}

    get links(): SidebarMenuItem[] {
        return LINKS[this.role];
    }

    // Función para alternar el estado del submenú
    toggleSubmenu(index: number) {
        this.openedSubmenuIndex.update(current => 
            current === index ? null : index
        );
    }
    
    // Función de ayuda para determinar si un elemento es un grupo (tiene hijos)
    isParentLink(link: SidebarMenuItem): link is ParentLink {
        return 'children' in link;
    }
    
    // Función de ayuda para determinar si el submenú está abierto
    isSubmenuOpen(index: number): boolean {
        return this.openedSubmenuIndex() === index;
    }

    logout() {
        this.auth.logout();
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    user = {
        name: 'John Doe',
        role: 'Product Designer',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026708c'
    };
}
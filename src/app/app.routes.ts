
import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import path from 'path';


export const routes: Routes = [
    {
      path: 'login',
      loadComponent: () =>
        import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
      path: '',
      loadComponent: () =>
        import('./layout/layout.component').then(m => m.LayoutComponent),
      canActivate: [AuthGuard],
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        {
          path: 'dashboard',
          loadComponent: () =>
            import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
        },
        // Nuevas rutas
        {
          path: 'registro-km',
          loadComponent: () =>
            import('./pages/registro-km/registro-km.component').then(m => m.RegistroKmComponent)
        },
        {
          path: 'viajes',
          loadComponent: () =>
            import('./pages/viajes/viajes.component').then(m=>m.ViajesComponent)
        },
        {
          path: 'traslados',
          loadComponent: () =>
            import('./pages/traslados/traslados.component').then(m => m.TrasladosComponent)
        },
        {
          path: 'configuracion',
          loadComponent: () =>
            import('./pages/configuracion/configuracion.component').then(m => m.ConfiguracionComponent)
        },
        {
          path: 'especialidades',
          loadComponent: () =>
            import('./pages/especialidades/especialidades.component').then(m => m.EspecialidadesComponent)
        },
        {
          path: 'informecomision',
          loadComponent: () =>
            import('./pages/informecomision/informecomision.component').then(m => m.InformeComisionComponent)
        },
        {
          path: 'historial',
          loadComponent: () =>
            import('./pages/historial/historial.component').then(m => m.HistorialComponent)
        },
        {
          path: 'pliego-comision',
          loadComponent: () =>
            import('./pages/pliego-comision/pliego-comision.component').then(m => m.PliegoComisionComponent)
        },
        {
          path: 'graficos',
          loadComponent: () =>
            import('./pages/graficos/graficos.component').then(m => m.GraficosComponent)
        },
        {
          path: 'pliegoactual',
          loadComponent: () =>
            import('./pages/pliegoactual/pliegoactual.component').then(m => m.PliegoactualComponent)
        },
        {
          path:'historialpagos',
          loadComponent:() =>
            import('./pages/historialpagos/historialpagos.component').then(m => m.HistorialpagosComponent)
        },
        {
          path: 'registropacientes',
          loadComponent: () =>
            import('./pages/registropacientes/registropacientes.component').then(m => m.RegistropacientesComponent)
        },
        {
         path: 'historialvehiculos',
         loadComponent:()=>
          import('./pages/historialvehiculos/historialvehiculos.component').then(m => m.HistorialvehiculosComponent)
          },
          {
            path: 'trasladosfl',
            loadComponent:()=>
             import('./pages/trasladosfl/trasladosfl.component').then(m => m.TrasladosflComponent)
             },
      

        // Fin nuevas rutas
        {
          path: '403',
          loadComponent: () =>
            import('./pages/forbidden/forbidden.component').then(m => m.ForbiddenComponent)
        }
      ]
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full'  }
  ];


// import { RenderMode, ServerRoute } from '@angular/ssr';

// export const serverRoutes: ServerRoute[] = [
//   // Login: renderizado en cada request (SSR clásico)
//   { path: 'login', renderMode: RenderMode.Server },

//   // Rutas internas: renderizadas también en el servidor
//   { path: 'dashboard', renderMode: RenderMode.Server },
//   { path: 'registro-km', renderMode: RenderMode.Server },
//   { path: 'viajes', renderMode: RenderMode.Server },
//   { path: 'traslados', renderMode: RenderMode.Server },
//   { path: 'configuracion', renderMode: RenderMode.Server },
//   { path: 'especialidades', renderMode: RenderMode.Server },
//   { path: 'informecomision', renderMode: RenderMode.Server },
//   { path: 'historial', renderMode: RenderMode.Server },
//   { path: 'pliego-comision', renderMode: RenderMode.Server },
//   { path: 'graficos', renderMode: RenderMode.Server },
//   { path: 'pliegoactual', renderMode: RenderMode.Server },
//   { path: 'historialpagos', renderMode: RenderMode.Server },
//   { path: 'registropacientes', renderMode: RenderMode.Server },
//   { path: 'historialvehiculos', renderMode: RenderMode.Server },
//   { path: 'trasladosfl', renderMode: RenderMode.Server },
//   { path: '403', renderMode: RenderMode.Server },

//   // Wildcard: prerender de todo lo demás
//   { path: '**', renderMode: RenderMode.Prerender }
// ];

// import { RenderMode, ServerRoute } from '@angular/ssr';

// export const serverRoutes: ServerRoute[] = [
//   // Si quieres prerenderizar login también, déjalo así;
//   // si no, pon RenderMode.Server para que se renderice en cada request
//   // { path: 'login', renderMode: RenderMode.Server },

//   // // Wildcard: renderiza (o prerenderiza) cualquier otra URL
//   // { path: '**', renderMode: RenderMode.Prerender }








//    { path: 'login', renderMode: RenderMode.Server },

//   // Dashboard y rutas autenticadas también dinámicas
//   { path: 'dashboard', renderMode: RenderMode.Server },
//   // { path: 'perfil', renderMode: RenderMode.Server },

//   // Otras rutas públicas prerenderizadas
//   // { path: '', renderMode: RenderMode.Prerender },
//   { path: '**', renderMode: RenderMode.Prerender }
// ];
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Si quieres prerenderizar login también, déjalo así;
  // si no, pon RenderMode.Server para que se renderice en cada request
  { path: 'login', renderMode: RenderMode.Server },

  // Wildcard: renderiza (o prerenderiza) cualquier otra URL
  { path: '**', renderMode: RenderMode.Prerender }
];
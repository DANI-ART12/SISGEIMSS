import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Si quieres prerenderizar login también, déjalo así;
  // si no, pon RenderMode.Server para que se renderice en cada request
  { path: 'login', renderMode: RenderMode.Server },

  // Wildcard: renderiza (o prerenderiza) cualquier otra URL
  { path: '**', renderMode: RenderMode.Prerender }
];

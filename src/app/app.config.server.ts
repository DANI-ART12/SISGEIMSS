import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering,withRoutes } from '@angular/ssr';   // ← nuevo import    // ← reemplaza provideServerRouting
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';


export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(
      withRoutes(serverRoutes)   // 👈 inyectas SOLO las rutas de servidor
    )
  ]
};
export const config = mergeApplicationConfig(appConfig, serverConfig);

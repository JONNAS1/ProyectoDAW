import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'chuletas/:id',
    renderMode: RenderMode.Server //Esto hace que NO la pre-renderice en el build
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender //El resto de páginas estáticas sí se pre-renderizan
  }
];
// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

const LS_TOKEN = 'chuletarium_token';

/**
 * Interceptor funcional: anade el header Authorization: Bearer <token>
 * a todas las peticiones al backend si hay token en localStorage.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(LS_TOKEN);

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};

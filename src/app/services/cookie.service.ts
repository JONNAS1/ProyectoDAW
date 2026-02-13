// src/app/services/cookie.service.ts
import { Injectable } from '@angular/core';

/**
 * Servicio generico para leer/escribir cookies desde Angular.
 * Se usa principalmente para la cookie `idioma` que establece el backend PHP.
 */
@Injectable({ providedIn: 'root' })
export class CookieService {

  /**
   * Obtener el valor de una cookie por su nombre
   */
  get(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : null;
  }

  /**
   * Establecer una cookie
   * @param name    Nombre de la cookie
   * @param value   Valor
   * @param days    Dias de expiracion (por defecto 30)
   * @param path    Path (por defecto /)
   */
  set(name: string, value: string, days: number = 30, path: string = '/'): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 86400000);
    document.cookie =
      `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=${path};SameSite=Lax`;
  }

  /**
   * Eliminar una cookie
   */
  delete(name: string, path: string = '/'): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
  }
}

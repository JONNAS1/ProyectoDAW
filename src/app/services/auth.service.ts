// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export type AppUser = {
  id: number;
  username: string;
  email: string;
  rol: number;    // 0 = normal, 1 = admin
  idioma: string; // 'es', 'en', 'fr'...
};

const LS_TOKEN   = 'chuletarium_token';
const LS_SESSION = 'chuletarium_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userSubject = new BehaviorSubject<AppUser | null>(this.readSession());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // Si hay token guardado, verificar la sesion con el backend
    if (this.getToken()) {
      this.verificarSesion();
    }
  }

  get user(): AppUser | null {
    return this.userSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  get isAdmin(): boolean {
    return this.userSubject.value?.rol === 1;
  }

  getToken(): string | null {
    return localStorage.getItem(LS_TOKEN);
  }

  // ── Registro ──────────────────────────────────────────

  async register(
    username: string,
    email: string,
    password: string,
    idioma: string = 'es'
  ): Promise<{ ok: boolean; message?: string }> {
    try {
      const res = await firstValueFrom(
        this.http.post<any>(`${this.apiUrl}/auth/registro.php`, {
          username,
          email,
          password,
          idioma,
        })
      );

      // Despues de registrar, hacer login automatico
      return this.login(email, password);
    } catch (err: any) {
      const msg =
        err?.error?.error ?? 'Error al registrarte.';
      return { ok: false, message: msg };
    }
  }

  // ── Login ─────────────────────────────────────────────

  async login(
    email: string,
    password: string
  ): Promise<{ ok: boolean; message?: string }> {
    try {
      const res = await firstValueFrom(
        this.http.post<any>(`${this.apiUrl}/auth/login.php`, {
          email,
          password,
        })
      );

      const token: string = res.token;
      const usuario: AppUser = res.usuario;

      // Guardar token y sesion
      localStorage.setItem(LS_TOKEN, token);
      localStorage.setItem(LS_SESSION, JSON.stringify(usuario));
      this.userSubject.next(usuario);

      return { ok: true };
    } catch (err: any) {
      const msg =
        err?.error?.error ?? 'Error al iniciar sesion.';
      return { ok: false, message: msg };
    }
  }

  // ── Logout ────────────────────────────────────────────

  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await firstValueFrom(
          this.http.post<any>(`${this.apiUrl}/auth/logout.php`, {})
        );
      } catch {
        // Si falla el logout remoto, limpiar localmente igual
      }
    }

    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_SESSION);
    this.userSubject.next(null);
  }

  // ── Verificar sesion activa ───────────────────────────

  private async verificarSesion(): Promise<void> {
    try {
      const res = await firstValueFrom(
        this.http.get<any>(`${this.apiUrl}/auth/perfil.php`)
      );

      const usuario: AppUser = res.usuario;
      localStorage.setItem(LS_SESSION, JSON.stringify(usuario));
      this.userSubject.next(usuario);
    } catch {
      // Token invalido o expirado: limpiar sesion
      localStorage.removeItem(LS_TOKEN);
      localStorage.removeItem(LS_SESSION);
      this.userSubject.next(null);
    }
  }

  // ── Leer sesion local (arranque rapido) ───────────────

  private readSession(): AppUser | null {
    try {
      return JSON.parse(
        localStorage.getItem(LS_SESSION) || 'null'
      ) as AppUser | null;
    } catch {
      return null;
    }
  }
}

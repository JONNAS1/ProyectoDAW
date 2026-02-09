// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppUser = {
  id: string;
  username: string;
  email: string;
};

type StoredUser = AppUser & {
  password: string; // ⚠️ MOCK: NO hacerlo así en producción
};

const LS_USERS = 'chuletarium_users';
const LS_SESSION = 'chuletarium_session';

function uid(): string {
  return crypto?.randomUUID?.() ?? Math.random().toString(16).slice(2) + Date.now().toString(16);
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<AppUser | null>(this.readSession());
  user$ = this.userSubject.asObservable();

  get user(): AppUser | null {
    return this.userSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  register(username: string, email: string, password: string): { ok: boolean; message?: string } {
    const users = this.readUsers();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, message: 'Ese email ya está registrado.' };

    const newUser: StoredUser = { id: uid(), username, email, password };
    users.push(newUser);
    localStorage.setItem(LS_USERS, JSON.stringify(users));

    // Auto-login
    const sessionUser: AppUser = { id: newUser.id, username: newUser.username, email: newUser.email };
    localStorage.setItem(LS_SESSION, JSON.stringify(sessionUser));
    this.userSubject.next(sessionUser);

    return { ok: true };
  }

  login(email: string, password: string): { ok: boolean; message?: string } {
    const users = this.readUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!found) return { ok: false, message: 'No existe una cuenta con ese email.' };
    if (found.password !== password) return { ok: false, message: 'Contraseña incorrecta.' };

    const sessionUser: AppUser = { id: found.id, username: found.username, email: found.email };
    localStorage.setItem(LS_SESSION, JSON.stringify(sessionUser));
    this.userSubject.next(sessionUser);

    return { ok: true };
  }

  logout() {
    localStorage.removeItem(LS_SESSION);
    this.userSubject.next(null);
  }

  private readUsers(): StoredUser[] {
    try {
      return JSON.parse(localStorage.getItem(LS_USERS) || '[]') as StoredUser[];
    } catch {
      return [];
    }
  }

  private readSession(): AppUser | null {
    try {
      return JSON.parse(localStorage.getItem(LS_SESSION) || 'null') as AppUser | null;
    } catch {
      return null;
    }
  }
}

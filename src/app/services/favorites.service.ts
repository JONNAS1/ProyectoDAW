// src/app/services/favorites.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private apiUrl = environment.apiUrl;
  private favsSubject = new BehaviorSubject<string[]>([]);
  favs$ = this.favsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    // Cuando el usuario cambia, recargar favoritos
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.cargarFavoritos();
      } else {
        this.favsSubject.next([]);
      }
    });
  }

  isFavorite(fichaId: string): boolean {
    return this.favsSubject.value.includes(fichaId);
  }

  getFavorites(): string[] {
    return this.favsSubject.value;
  }

  // ── Toggle favorito (backend) ─────────────────────────

  async toggle(fichaId: string): Promise<boolean> {
    try {
      const res = await firstValueFrom(
        this.http.post<any>(`${this.apiUrl}/favoritos/toggle.php`, {
          ficha_id: fichaId,
        })
      );

      // Actualizar lista local
      await this.cargarFavoritos();

      return res.accion === 'agregado';
    } catch {
      return false;
    }
  }

  // ── Cargar favoritos desde el backend ─────────────────

  async cargarFavoritos(): Promise<void> {
    try {
      const res = await firstValueFrom(
        this.http.get<any>(`${this.apiUrl}/favoritos/listar.php`)
      );

      const ids: string[] = (res.favoritos ?? []).map(
        (f: any) => f.ficha_id
      );
      this.favsSubject.next(ids);
    } catch {
      this.favsSubject.next([]);
    }
  }
}

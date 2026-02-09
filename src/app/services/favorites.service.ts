// src/app/services/favorites.service.ts
import { Injectable } from '@angular/core';

const LS_FAVS = 'chuletarium_favorites';

type FavStore = Record<string, string[]>; // userId -> [fichaId]

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  isFavorite(userId: string, fichaId: string): boolean {
    const store = this.readStore();
    return (store[userId] ?? []).includes(fichaId);
  }

  toggle(userId: string, fichaId: string): boolean {
    const store = this.readStore();
    const list = new Set(store[userId] ?? []);

    if (list.has(fichaId)) list.delete(fichaId);
    else list.add(fichaId);

    store[userId] = Array.from(list);
    localStorage.setItem(LS_FAVS, JSON.stringify(store));

    return store[userId].includes(fichaId); // estado final
  }

  getFavorites(userId: string): string[] {
    const store = this.readStore();
    return store[userId] ?? [];
  }

  private readStore(): FavStore {
    try {
      return JSON.parse(localStorage.getItem(LS_FAVS) || '{}') as FavStore;
    } catch {
      return {};
    }
  }
}

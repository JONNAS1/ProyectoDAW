// src/app/pages/user/user.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';
import { FICHAS } from '../../data/fichas.data';
import { Ficha } from '../../models/ficha.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user.html',
  styleUrls: ['./user.scss'],
})
export class UserComponent {
  constructor(
    public auth: AuthService,
    private favs: FavoritesService,
    private router: Router
  ) {}

  get favoritos(): Ficha[] {
    const u = this.auth.user;
    if (!u) return [];
    const ids = new Set(this.favs.getFavorites(u.id));
    return FICHAS.filter(f => ids.has(f.id));
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}

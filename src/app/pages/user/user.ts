// src/app/pages/user/user.ts
import { Component, OnInit } from '@angular/core';
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
export class UserComponent implements OnInit {
  favoritos: Ficha[] = [];

  constructor(
    public auth: AuthService,
    private favs: FavoritesService,
    private router: Router
  ) {}

  ngOnInit() {
    // Suscribirse a cambios de favoritos para actualizar la lista
    this.favs.favs$.subscribe((ids) => {
      const idSet = new Set(ids);
      this.favoritos = FICHAS.filter((f) => idSet.has(f.id));
    });
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/']);
  }
}

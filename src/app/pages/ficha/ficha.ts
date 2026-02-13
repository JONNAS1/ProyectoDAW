// src/app/pages/ficha/ficha.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FICHAS } from '../../data/fichas.data';
import { Ficha } from '../../models/ficha.model';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-ficha',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ficha.html',
  styleUrls: ['./ficha.scss'],
})
export class FichaComponent {
  ficha?: Ficha;
  toggling = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    public favs: FavoritesService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.ficha = FICHAS.find((f) => f.id === id);
  }

  get isFav(): boolean {
    if (!this.ficha || !this.auth.user) return false;
    return this.favs.isFavorite(this.ficha.id);
  }

  async toggleFav() {
    if (!this.ficha) return;

    if (!this.auth.user) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }

    this.toggling = true;
    await this.favs.toggle(this.ficha.id);
    this.toggling = false;
  }
}

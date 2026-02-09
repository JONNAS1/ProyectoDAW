// src/app/ficha-list/ficha-list.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FichaItemComponent } from '../ficha-item/ficha-item';
import { FICHAS } from '../../data/fichas.data';
import { Ficha } from '../../models/ficha.model';

@Component({
  selector: 'app-ficha-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FichaItemComponent],
  templateUrl: './ficha-list.html',
  styleUrls: ['./ficha-list.scss'],
})
export class FichaListComponent {
  fichas: Ficha[] = FICHAS as unknown as Ficha[];

  // filtros UI
  categorias: string[] = [];
  categoriaActiva: string = 'Todas';
  searchQuery: string = '';

  constructor(private route: ActivatedRoute) {
    // construir categorías (incluye "Todas")
    const uniques = Array.from(new Set(this.fichas.map((f) => f.categoria))).sort();
    this.categorias = ['Todas', ...uniques];

    //  leer query params: /chuletas?categoria=Python&q=algo
    this.route.queryParamMap.subscribe((params) => {
      const cat = params.get('categoria');
      const q = params.get('q');

      if (cat && cat.trim()) {
        this.categoriaActiva = cat.trim();
        // por si llega una categoría que no estaba en el array
        if (!this.categorias.includes(this.categoriaActiva)) {
          this.categorias.push(this.categoriaActiva);
        }
      } else {
        this.categoriaActiva = 'Todas';
      }

      if (q !== null) {
        this.searchQuery = q;
      }
    });
  }

  setCategoria(cat: string) {
    this.categoriaActiva = cat;
  }

  get fichasFiltradas(): Ficha[] {
    const q = (this.searchQuery || '').trim().toLowerCase();

    return this.fichas.filter((f) => {
      const okCategoria = this.categoriaActiva === 'Todas' || f.categoria === this.categoriaActiva;

      const titulo = (f.titulo ?? '').toLowerCase();
      const desc = (f.descripcion ?? '').toLowerCase();
      const cat = (f.categoria ?? '').toLowerCase();
      const tags = (f.tags ?? []).map((t) => t.toLowerCase());

      const okQuery =
        !q ||
        titulo.includes(q) ||
        desc.includes(q) ||
        cat.includes(q) ||
        tags.some((t) => t.includes(q));

      return okCategoria && okQuery;
    });
  }
}

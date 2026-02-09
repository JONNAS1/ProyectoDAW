import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FICHAS } from '../../data/fichas.data';

type Tone = 'green' | 'blue' | 'purple' | 'red' | 'amber';

type Item = {
  key: string;
  name: string;
  short: string;
  tone: Tone;
  slug?: string;
};

function pickBestSlugForCategory(cat: string): string | undefined {
  const matches = FICHAS.filter(
    (f) => (f.categoria || '').toLowerCase() === cat.toLowerCase()
  );
  if (!matches.length) return undefined;

  const preferred =
    matches.find((f) => f.id.toLowerCase().includes('basics')) ?? matches[0];

  return preferred.id;
}

@Component({
  selector: 'app-databases',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './databases.html',
  styleUrls: ['./databases.scss'],
})
export class DatabasesComponent {
  query = '';

  private base: Omit<Item, 'slug'>[] = [
    { key: 'PostgreSQL', name: 'PostgreSQL', short: 'PG', tone: 'blue' },
    { key: 'MySQL', name: 'MySQL', short: 'my', tone: 'amber' },
    { key: 'SQLite', name: 'SQLite', short: 'SQL', tone: 'green' },
    { key: 'MariaDB', name: 'MariaDB', short: 'MDB', tone: 'red' },
    { key: 'MongoDB', name: 'MongoDB', short: 'Mo', tone: 'green' },
    { key: 'Redis', name: 'Redis', short: 'Rd', tone: 'red' },
  ];

  items: Item[] = this.base.map((l) => ({
    ...l,
    slug: pickBestSlugForCategory(l.key),
  }));

  get filtered(): Item[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.items;

    return this.items.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.key.toLowerCase().includes(q) ||
        l.short.toLowerCase().includes(q)
    );
  }
}

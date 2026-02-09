import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FICHAS } from '../../data/fichas.data';

type Tone = 'green' | 'blue' | 'purple' | 'red' | 'amber';

type LangItem = {
  key: string;      // coincide con FICHAS.categoria (ej: 'TypeScript')
  name: string;     // visible
  short: string;    // iconito
  tone: Tone;
  slug?: string;    // si existe ficha => id de esa ficha (ej: 'typescript-basics')
};

function pickBestSlugForCategory(cat: string): string | undefined {
  const matches = FICHAS.filter(
    (f) => (f.categoria || '').toLowerCase() === cat.toLowerCase()
  );

  if (!matches.length) return undefined;

  // Si hay varias, preferimos la que tenga "basics" (por ejemplo Python)
  const preferred =
    matches.find((f) => f.id.toLowerCase().includes('basics')) ?? matches[0];

  return preferred.id;
}

@Component({
  selector: 'app-programming',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './programming.html',
  styleUrls: ['./programming.scss'],
})
export class ProgrammingComponent {
  query = '';

  private base: Omit<LangItem, 'slug'>[] = [
    { key: 'JavaScript', name: 'JavaScript', short: 'JS', tone: 'amber' },
    { key: 'TypeScript', name: 'TypeScript', short: 'TS', tone: 'blue' },
    { key: 'Python', name: 'Python', short: 'Py', tone: 'blue' },
    { key: 'Java', name: 'Java', short: 'J', tone: 'red' },

    { key: 'C#', name: 'C#', short: 'C#', tone: 'purple' },
    { key: 'C', name: 'C', short: 'C', tone: 'blue' },
    { key: 'C++', name: 'C++', short: 'C++', tone: 'blue' },
    { key: 'PHP', name: 'PHP', short: 'PHP', tone: 'blue' },

    { key: 'Go', name: 'Go', short: 'Go', tone: 'blue' },
    { key: 'Rust', name: 'Rust', short: 'Rs', tone: 'red' },
    { key: 'Kotlin', name: 'Kotlin', short: 'Kt', tone: 'purple' },
    { key: 'Swift', name: 'Swift', short: 'Sw', tone: 'red' },

    { key: 'HTML', name: 'HTML', short: '<>', tone: 'red' },
    { key: 'CSS3', name: 'CSS3', short: 'CSS', tone: 'blue' },
    { key: 'Sass', name: 'Sass', short: 'S', tone: 'purple' },
    { key: 'Markdown', name: 'Markdown', short: 'MD', tone: 'purple' },

    { key: 'JSON', name: 'JSON', short: '{}', tone: 'blue' },
    { key: 'YAML', name: 'YAML', short: 'Y', tone: 'red' },
    { key: 'Bash', name: 'Bash', short: '>_', tone: 'green' },
    { key: 'Git', name: 'Git', short: 'git', tone: 'amber' },

    { key: 'Docker', name: 'Docker', short: 'dk', tone: 'blue' },
  ];

  langs: LangItem[] = this.base.map((l) => ({
    ...l,
    slug: pickBestSlugForCategory(l.key),
  }));

  get filtered(): LangItem[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.langs;

    return this.langs.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.key.toLowerCase().includes(q) ||
        l.short.toLowerCase().includes(q)
    );
  }
}

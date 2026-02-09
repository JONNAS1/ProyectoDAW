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
    matches.find((f) => f.id.toLowerCase().includes('common')) ??
    matches.find((f) => f.id.toLowerCase().includes('basics')) ??
    matches.find((f) => f.id.toLowerCase().includes('essential')) ??
    matches[0];

  return preferred.id;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './terminal.html',
  styleUrls: ['./terminal.scss'],
})
export class TerminalComponent {
  query = '';

  private base: Omit<Item, 'slug'>[] = [
    { key: 'Linux', name: 'Linux', short: 'ln', tone: 'green' },
    { key: 'Windows', name: 'Windows', short: 'win', tone: 'blue' },
    { key: 'MacOS', name: 'MacOS', short: 'mac', tone: 'purple' },
    { key: 'Bash', name: 'Bash', short: '>_', tone: 'green' },
    { key: 'PowerShell', name: 'PowerShell', short: 'PS', tone: 'blue' },
    { key: 'Git', name: 'Git', short: 'git', tone: 'amber' },
    { key: 'Docker', name: 'Docker', short: 'dk', tone: 'blue' },
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

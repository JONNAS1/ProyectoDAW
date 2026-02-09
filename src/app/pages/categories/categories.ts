// src/app/pages/categories/categories.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type CategoryGroup = {
  title: string;
  subtitle: string;
  icon: string;
  tags: string[];
  route: string;
  cta: string;
};

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss'],
})
export class CategoriesComponent {
  groups: CategoryGroup[] = [
    {
      title: 'Lenguajes de Programación',
      subtitle: 'Frontend, backend y lenguajes populares.',
      icon: '</>',
      tags: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C#', 'HTML', 'CSS3', 'PHP'],
      route: '/categories/programming',
      cta: 'Ver lenguajes',
    },
    {
      title: 'Bases de datos',
      subtitle: 'SQL y NoSQL para guardar y consultar datos.',
      icon: '⛁',
      tags: ['PostgreSQL', 'MySQL', 'SQLite', 'MariaDB', 'MongoDB', 'Redis'],
      route: '/categories/databases',
      cta: 'Ver bases de datos',
    },
    {
      title: 'Consola y sistema',
      subtitle: 'Comandos y utilidades para terminal y SO.',
      icon: '>_',
      tags: ['Windows', 'Linux', 'MacOS', 'Bash', 'PowerShell', 'Git', 'Docker'],
      route: '/categories/terminal',
      cta: 'Ver consola',
    },
  ];
}

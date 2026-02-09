// src/app/pages/home/home.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FICHAS } from '../../data/fichas.data';
import { Ficha } from '../../models/ficha.model';

type TagGroup = {
  title: string;
  icon: string;
  tags: string[];
};

type Snippet = {
  badge: string;
  title: string;
  code: string;
  desc: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {
  groups = [
    {
      title: 'Lenguajes de Programación',
      icon: '</>',
      tags: [
        'JavaScript',
        'TypeScript',
        'Python',
        'Java',
        'C#',
        'C',
        'C++',
        'PHP',
        'Go',
        'Rust',
        'Kotlin',
        'Swift',
        'HTML',
        'CSS3',
        'Sass',
        'Markdown',
        'JSON',
        'YAML',
        'Bash',
      ],
    },
    {
      title: 'Consultas en Base de Datos',
      icon: '⛁',
      tags: ['SQL', 'PostgreSQL', 'MySQL', 'MariaDB', 'SQLite', 'MongoDB', 'Redis'],
    },
    {
      title: 'Comandos de SO',
      icon: '>_',
      tags: ['Linux', 'Windows', 'MacOS', 'Git', 'Docker'],
    },
  ];

  snippets: Snippet[] = [
    {
      badge: 'Python',
      title: 'Saludo personalizado',
      code: `nombre = input("¿Cómo te llamas? ")
print("Hola,", nombre, "— bienvenido a Chuletarium")`,
      desc: 'Un saludo usando input() y print().',
    },
    {
      badge: 'JavaScript',
      title: 'Fecha actual formateada',
      code: `const fecha = new Date();
const opciones = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
console.log(fecha.toLocaleDateString("es-ES", opciones));`,
      desc: 'Formatea la fecha actual en español.',
    },
    {
      badge: 'SQL',
      title: 'Contar registros',
      code: `-- Contar usuarios activos por país
SELECT pais, COUNT(*) AS total_usuarios
FROM usuarios
WHERE activo = 1
GROUP BY pais
ORDER BY total_usuarios DESC;`,
      desc: 'Agrupa y cuenta resultados rápidamente.',
    },
  ];

  // “Últimas chuletas” (por ahora: 3 primeras del array)
  latest: Ficha[] = FICHAS.slice(0, 3);

  steps = [
    { n: '01', title: 'Explora', desc: 'Navega por categorías o busca por lenguaje.' },
    { n: '02', title: 'Aprende rápido', desc: 'Entra a una chuleta y copia ejemplos listos.' },
    { n: '03', title: 'Guarda', desc: 'Marca tus favoritas y consúltalas en tu perfil.' },
  ];
}

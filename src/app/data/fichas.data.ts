// src/app/data/fichas.data.ts
import { Ficha } from '../models/ficha.model';

export const FICHAS: Ficha[] = [
  {
    id: 'java-basics',
    titulo: 'Java cheatsheet',
    categoria: 'Java',
    descripcion: 'Repaso rápido de sintaxis básica: strings, arrays y ejemplos típicos.',
    tags: ['String', 'Array', 'Sintaxis', 'Básico'],
    nivel: 'Básico',
    updatedAt: '2026-01-05',
    secciones: [
      {
        id: 'strings',
        titulo: 'Strings',
        bloques: [
          {
            texto: 'Creación y operaciones comunes con String.',
            codigo: `String s1 = "value";
String s2 = new String("value");

int len = s1.length();
boolean eq = s1.equals("value");
String sub = s1.substring(0, 3);
String[] parts = "a,b,c".split(",");`,
          },
          {
            notas: [
              'Usa equals() para comparar contenido.',
              'substring(inicio, fin) no incluye fin.',
            ],
          },
        ],
      },
      {
        id: 'arrays',
        titulo: 'Arrays',
        bloques: [
          {
            texto: 'Declaración e inicialización de arrays.',
            codigo: `int[] a1;
int[] a2 = {1, 2, 3};
int[] a3 = new int[]{1, 2, 3};

int[] a4 = new int[3];
a4[0] = 1;
a4[1] = 2;
a4[2] = 3;`,
          },
          {
            texto: 'Recorrido con for-each.',
            codigo: `for (int n : a2) {
  System.out.println(n);
}`,
          },
        ],
      },
    ],
  },
  {
    id: 'python-input-print',
    titulo: 'Input y print()',
    categoria: 'Python',
    descripcion: 'Entrada/salida básica: input(), print(), f-strings y conversión de tipos.',
    tags: ['input', 'print', 'f-string', 'int'],
    nivel: 'Básico',
    secciones: [
      {
        id: 'input',
        titulo: 'input()',
        bloques: [
          {
            texto: 'input() siempre devuelve str.',
            codigo: `nombre = input("¿Cómo te llamas? ")
print("Hola,", nombre)

edad = int(input("Edad: "))
print(f"Tienes {edad} años")`,
          },
        ],
      },
    ],
  },
  {
    id: 'sql-select-basico',
    titulo: 'SELECT básico',
    categoria: 'SQL',
    descripcion: 'SELECT, WHERE, ORDER BY y LIMIT con ejemplos claros.',
    tags: ['SELECT', 'WHERE', 'ORDER BY', 'LIMIT'],
    nivel: 'Básico',
    secciones: [
      {
        id: 'select',
        titulo: 'SELECT',
        bloques: [
          {
            codigo: `SELECT nombre, email
FROM usuarios
WHERE activo = 1
ORDER BY nombre ASC
LIMIT 10;`,
          },
          {
            notas: ['LIMIT puede variar según el motor (TOP, FETCH FIRST, etc.).'],
          },
        ],
      },
    ],
  },
  // =========================
  // TypeScript
  // =========================
  {
    id: 'typescript-basics',
    titulo: 'TypeScript cheatsheet',
    categoria: 'TypeScript',
    descripcion: 'Tipos, interfaces, generics y utilidades básicas.',
    tags: ['types', 'interfaces', 'generics'],
    nivel: 'Básico',
    updatedAt: '2026-01-05',
    secciones: [
      {
        id: 'types',
        titulo: 'Tipos',
        bloques: [
          {
            texto: 'Primitivos + Arrays',
            codigo: `let age: number = 20;
let name: string = "Ana";
let ok: boolean = true;

let nums: number[] = [1,2,3];
let tuple: [string, number] = ["id", 1];`,
          },
          {
            texto: 'Union y Literal types',
            codigo: `type Role = "admin" | "user";
let role: Role = "user";

let id: string | number = "a1";
id = 123;`,
          },
          {
            notas: ['Los literal types son muy útiles para estados y roles.'],
          },
        ],
      },
      {
        id: 'interfaces-generics',
        titulo: 'Interfaces y generics',
        bloques: [
          {
            texto: 'Interface + Optional',
            codigo: `interface User {
  id: string;
  email: string;
  username?: string;
}

const u: User = { id: "1", email: "a@a.com" };`,
          },
          {
            texto: 'Generic function',
            codigo: `function first<T>(arr: T[]): T {
  return arr[0];
}

first<number>([1,2,3]);
first(["a","b"]);`,
          },
        ],
      },
    ],
  },

  // =========================
  // Python
  // =========================
  {
    id: 'python-basics',
    titulo: 'Python cheatsheet',
    categoria: 'Python',
    descripcion: 'Entrada/salida, listas/diccionarios, f-strings y funciones.',
    tags: ['input', 'print', 'list', 'dict', 'functions'],
    nivel: 'Básico',
    secciones: [
      {
        id: 'basics',
        titulo: 'Básicos',
        bloques: [
          {
            texto: 'Input / Print',
            codigo: `name = input("Nombre: ")
print(f"Hola, {name}!")`,
          },
          {
            texto: 'Listas y slicing',
            codigo: `nums = [10, 20, 30, 40]
print(nums[0])
print(nums[1:3])  # [20, 30]
nums.append(50)`,
          },
          {
            texto: 'Diccionarios',
            codigo: `user = {"id": 1, "name": "Pepe"}
print(user["name"])
user["email"] = "pepe@mail.com"`,
          },
        ],
      },
      {
        id: 'functions',
        titulo: 'Funciones',
        bloques: [
          {
            texto: 'Función + default',
            codigo: `def greet(name="mundo"):
    return f"Hola, {name}"

print(greet())
print(greet("Ana"))`,
          },
          {
            texto: 'List comprehensions',
            codigo: `squares = [x*x for x in range(1, 6)]
# [1,4,9,16,25]`,
          },
        ],
      },
    ],
  },

  // =========================
  // Git
  // =========================
  {
    id: 'git-essential',
    titulo: 'Git esencial',
    categoria: 'Git',
    descripcion: 'Flujo básico: clonar, commits, ramas, pull/push y stash.',
    tags: ['clone', 'commit', 'branch', 'merge', 'stash'],
    nivel: 'Básico',
    secciones: [
      {
        id: 'git-basic',
        titulo: 'Básico',
        bloques: [
          {
            texto: 'Clonar + estado',
            codigo: `git clone <url>
git status
git log --oneline --decorate --graph --all`,
          },
          {
            texto: 'Add / commit',
            codigo: `git add .
git commit -m "feat: nueva sección de home"`,
          },
          {
            texto: 'Pull / push',
            codigo: `git pull
git push`,
          },
        ],
      },
      {
        id: 'git-branches',
        titulo: 'Ramas',
        bloques: [
          {
            texto: 'Crear / cambiar',
            codigo: `git checkout -b feature/login
# o
git switch -c feature/login`,
          },
          {
            texto: 'Merge',
            codigo: `git checkout main
git merge feature/login`,
          },
          {
            texto: 'Stash',
            codigo: `git stash
git stash pop`,
          },
        ],
      },
    ],
  },

  // =========================
  // Docker
  // =========================
  {
    id: 'docker-basics',
    titulo: 'Docker básico',
    categoria: 'Docker',
    descripcion: 'Imágenes, contenedores, logs, puertos y limpieza.',
    tags: ['images', 'containers', 'ports', 'compose'],
    nivel: 'Básico',
    secciones: [
      {
        id: 'docker-cli',
        titulo: 'Comandos clave',
        bloques: [
          {
            texto: 'Imágenes y contenedores',
            codigo: `docker images
docker ps -a

docker run --name web -p 8080:80 nginx`,
          },
          {
            texto: 'Logs / exec',
            codigo: `docker logs -f web
docker exec -it web sh`,
          },
          {
            texto: 'Parar / borrar',
            codigo: `docker stop web
docker rm web
docker rmi nginx`,
          },
        ],
      },
      {
        id: 'docker-compose',
        titulo: 'Docker Compose',
        bloques: [
          {
            texto: 'compose.yaml mini',
            codigo: `services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: pass
    ports:
      - "5432:5432"`,
          },
          {
            texto: 'Levantar / bajar',
            codigo: `docker compose up -d
docker compose down`,
          },
        ],
      },
    ],
  },

  // =========================
  // PostgreSQL
  // =========================
  {
    id: 'postgresql-select-joins',
    titulo: 'PostgreSQL: SELECT + JOIN',
    categoria: 'PostgreSQL',
    descripcion: 'Consultas típicas con filtros, orden, join y agregaciones.',
    tags: ['select', 'join', 'group by'],
    nivel: 'Intermedio',
    secciones: [
      {
        id: 'pg-select',
        titulo: 'SELECT',
        bloques: [
          {
            texto: 'WHERE + ORDER BY + LIMIT',
            codigo: `SELECT id, username
FROM users
WHERE active = true
ORDER BY created_at DESC
LIMIT 20;`,
          },
          {
            texto: 'LIKE / ILIKE',
            codigo: `SELECT *
FROM cheatsheets
WHERE title ILIKE '%javascript%';`,
          },
        ],
      },
      {
        id: 'pg-join-group',
        titulo: 'JOIN + GROUP BY',
        bloques: [
          {
            texto: 'JOIN favoritos',
            codigo: `SELECT c.id, c.title
FROM favorites f
JOIN cheatsheets c ON c.id = f.cheatsheet_id
WHERE f.user_id = 1;`,
          },
          {
            texto: 'COUNT por categoría',
            codigo: `SELECT category, COUNT(*) AS total
FROM cheatsheets
GROUP BY category
ORDER BY total DESC;`,
          },
        ],
      },
    ],
  },

  // =========================
  // MySQL
  // =========================
  {
    id: 'mysql-crud',
    titulo: 'MySQL: CRUD rápido',
    categoria: 'MySQL',
    descripcion: 'Crear, leer, actualizar y borrar con ejemplos claros.',
    tags: ['insert', 'select', 'update', 'delete'],
    nivel: 'Básico',
    secciones: [
      {
        id: 'mysql-crud',
        titulo: 'CRUD',
        bloques: [
          {
            texto: 'INSERT',
            codigo: `INSERT INTO users (username, email)
VALUES ('pepe', 'pepe@mail.com');`,
          },
          {
            texto: 'SELECT',
            codigo: `SELECT id, username
FROM users
WHERE email LIKE '%@mail.com'
ORDER BY id DESC;`,
          },
          {
            texto: 'UPDATE',
            codigo: `UPDATE users
SET username = 'pepito'
WHERE id = 1;`,
          },
          {
            texto: 'DELETE',
            codigo: `DELETE FROM users
WHERE id = 1;`,
          },
        ],
      },
    ],
  },

  // =========================
  // Linux
  // =========================
  {
    id: 'linux-common',
    titulo: 'Linux: comandos comunes',
    categoria: 'Linux',
    descripcion: 'Navegación, archivos, permisos, procesos y red.',
    tags: ['ls', 'chmod', 'ps', 'curl'],
    nivel: 'Básico',
    secciones: [
      {
        id: 'linux-files',
        titulo: 'Archivos y carpetas',
        bloques: [
          {
            texto: 'ls / cd / pwd',
            codigo: `pwd
ls -la
cd /var/www`,
          },
          {
            texto: 'cp / mv / rm',
            codigo: `cp file.txt backup.txt
mv old.txt new.txt
rm -rf carpeta/`,
          },
        ],
      },
      {
        id: 'linux-perms-procs',
        titulo: 'Permisos y procesos',
        bloques: [
          {
            texto: 'chmod / chown',
            codigo: `chmod +x script.sh
chown -R user:user carpeta/`,
          },
          {
            texto: 'ps / top / kill',
            codigo: `ps aux | grep node
top
kill -9 <PID>`,
          },
        ],
      },
      {
        id: 'linux-network',
        titulo: 'Red',
        bloques: [
          {
            texto: 'curl / ping / netstat',
            codigo: `curl -I https://example.com
ping -c 4 google.com
netstat -tulpn`,
          },
        ],
      },
    ],
  },
];

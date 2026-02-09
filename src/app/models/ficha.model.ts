// src/app/models/ficha.model.ts

export type FichaNivel = 'Básico' | 'Intermedio' | 'Avanzado';

export interface FichaBloque {
  titulo?: string;
  texto?: string;
  codigo?: string;
  notas?: string[];
}

export interface FichaSeccion {
  id: string;        // para anchors (#strings, #arrays, etc.)
  titulo: string;
  bloques: FichaBloque[];
}

export interface Ficha {
  id: string;
  titulo: string;
  categoria: string;

  descripcion: string;
  tags: string[];
  nivel?: FichaNivel;
  updatedAt?: string; // ISO o texto

  secciones: FichaSeccion[];
}

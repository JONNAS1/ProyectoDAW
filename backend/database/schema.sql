-- ============================================
-- Chuletarium - Esquema de Base de Datos
-- Importar en phpMyAdmin
-- Base de datos: chuletarium
-- ============================================

CREATE DATABASE IF NOT EXISTS chuletarium
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE chuletarium;

-- ============================================
-- Tabla: usuarios
-- Roles: 0 = usuario normal, 1 = admin
-- ============================================
CREATE TABLE IF NOT EXISTS usuarios (
    id          INT(11)      NOT NULL AUTO_INCREMENT,
    username    VARCHAR(100) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL COMMENT 'Hash bcrypt generado con password_hash()',
    rol         TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '0=normal, 1=admin',
    idioma      VARCHAR(5)   NOT NULL DEFAULT 'es' COMMENT 'Idioma preferido: es, en, fr...',
    fecha_creacion DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activo      TINYINT(1)   NOT NULL DEFAULT 1 COMMENT '1=activo, 0=desactivado',
    PRIMARY KEY (id),
    UNIQUE KEY uk_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: sesiones
-- Control de sesiones con tokens
-- ============================================
CREATE TABLE IF NOT EXISTS sesiones (
    id                INT(11)      NOT NULL AUTO_INCREMENT,
    usuario_id        INT(11)      NOT NULL,
    token             VARCHAR(255) NOT NULL,
    fecha_creacion    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion  DATETIME     NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_token (token),
    KEY idx_usuario_id (usuario_id),
    KEY idx_fecha_expiracion (fecha_expiracion),
    CONSTRAINT fk_sesiones_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: categorias
-- Grupos principales: Programacion, Bases de datos, Terminal
-- ============================================
CREATE TABLE IF NOT EXISTS categorias (
    id          INT(11)      NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(100) NOT NULL COMMENT 'Ej: Java, Python, SQL, Git, Docker...',
    grupo       ENUM('programacion','bases_datos','terminal') NOT NULL COMMENT 'Grupo al que pertenece',
    descripcion VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: fichas (chuletas)
-- Cada ficha pertenece a una categoria
-- ============================================
CREATE TABLE IF NOT EXISTS fichas (
    id          VARCHAR(100) NOT NULL COMMENT 'Slug unico, ej: java-basics',
    titulo      VARCHAR(255) NOT NULL,
    categoria_id INT(11)     NOT NULL,
    descripcion TEXT         DEFAULT NULL,
    nivel       ENUM('Basico','Intermedio','Avanzado') DEFAULT 'Basico',
    fecha_actualizacion DATE DEFAULT NULL,
    fecha_creacion DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_categoria (categoria_id),
    CONSTRAINT fk_fichas_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: fichas_tags
-- Tags asociados a cada ficha (N:M)
-- ============================================
CREATE TABLE IF NOT EXISTS fichas_tags (
    id       INT(11)      NOT NULL AUTO_INCREMENT,
    ficha_id VARCHAR(100) NOT NULL,
    tag      VARCHAR(50)  NOT NULL,
    PRIMARY KEY (id),
    KEY idx_ficha (ficha_id),
    KEY idx_tag (tag),
    CONSTRAINT fk_tags_ficha
        FOREIGN KEY (ficha_id)
        REFERENCES fichas (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: secciones
-- Cada ficha tiene varias secciones
-- ============================================
CREATE TABLE IF NOT EXISTS secciones (
    id          INT(11)      NOT NULL AUTO_INCREMENT,
    ficha_id    VARCHAR(100) NOT NULL,
    slug        VARCHAR(100) NOT NULL COMMENT 'Anchor: strings, arrays, etc.',
    titulo      VARCHAR(255) NOT NULL,
    orden       INT(11)      NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY idx_ficha_orden (ficha_id, orden),
    CONSTRAINT fk_secciones_ficha
        FOREIGN KEY (ficha_id)
        REFERENCES fichas (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: bloques
-- Cada seccion tiene varios bloques (texto, codigo, notas)
-- ============================================
CREATE TABLE IF NOT EXISTS bloques (
    id          INT(11)  NOT NULL AUTO_INCREMENT,
    seccion_id  INT(11)  NOT NULL,
    titulo      VARCHAR(255) DEFAULT NULL,
    texto       TEXT         DEFAULT NULL,
    codigo      TEXT         DEFAULT NULL,
    orden       INT(11)  NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY idx_seccion_orden (seccion_id, orden),
    CONSTRAINT fk_bloques_seccion
        FOREIGN KEY (seccion_id)
        REFERENCES secciones (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: bloques_notas
-- Notas asociadas a un bloque (1:N)
-- ============================================
CREATE TABLE IF NOT EXISTS bloques_notas (
    id        INT(11)      NOT NULL AUTO_INCREMENT,
    bloque_id INT(11)      NOT NULL,
    nota      TEXT         NOT NULL,
    orden     INT(11)      NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY idx_bloque (bloque_id),
    CONSTRAINT fk_notas_bloque
        FOREIGN KEY (bloque_id)
        REFERENCES bloques (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: favoritos
-- Relacion N:M entre usuarios y fichas
-- ============================================
CREATE TABLE IF NOT EXISTS favoritos (
    id              INT(11)      NOT NULL AUTO_INCREMENT,
    usuario_id      INT(11)      NOT NULL,
    ficha_id        VARCHAR(100) NOT NULL,
    fecha_creacion  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_usuario_ficha (usuario_id, ficha_id),
    KEY idx_usuario (usuario_id),
    KEY idx_ficha (ficha_id),
    CONSTRAINT fk_favoritos_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_favoritos_ficha
        FOREIGN KEY (ficha_id)
        REFERENCES fichas (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: snippets
-- Snippets destacados de la comunidad
-- ============================================
CREATE TABLE IF NOT EXISTS snippets (
    id          INT(11)      NOT NULL AUTO_INCREMENT,
    badge       VARCHAR(50)  NOT NULL COMMENT 'Ej: Python, JavaScript, SQL',
    titulo      VARCHAR(255) NOT NULL,
    codigo      TEXT         NOT NULL,
    descripcion TEXT         DEFAULT NULL,
    usuario_id  INT(11)      DEFAULT NULL COMMENT 'NULL = snippet del sistema',
    fecha_creacion DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_badge (badge),
    KEY idx_usuario (usuario_id),
    CONSTRAINT fk_snippets_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATOS INICIALES: Categorias
-- ============================================
INSERT INTO categorias (nombre, grupo, descripcion) VALUES
('JavaScript',  'programacion',  'Lenguaje de programacion web'),
('TypeScript',  'programacion',  'Superset tipado de JavaScript'),
('Python',      'programacion',  'Lenguaje versatil y facil de aprender'),
('Java',        'programacion',  'Lenguaje orientado a objetos'),
('C#',          'programacion',  'Lenguaje de Microsoft/.NET'),
('C',           'programacion',  'Lenguaje de bajo nivel'),
('C++',         'programacion',  'Extension orientada a objetos de C'),
('PHP',         'programacion',  'Lenguaje de servidor web'),
('Go',          'programacion',  'Lenguaje de Google para sistemas'),
('Rust',        'programacion',  'Lenguaje de sistemas seguro'),
('Kotlin',      'programacion',  'Lenguaje moderno para JVM/Android'),
('Swift',       'programacion',  'Lenguaje de Apple para iOS/macOS'),
('HTML',        'programacion',  'Lenguaje de marcado web'),
('CSS3',        'programacion',  'Hojas de estilo'),
('Sass',        'programacion',  'Preprocesador CSS'),
('SQL',         'bases_datos',   'Lenguaje de consultas estandar'),
('PostgreSQL',  'bases_datos',   'SGBD relacional avanzado'),
('MySQL',       'bases_datos',   'SGBD relacional popular'),
('MariaDB',     'bases_datos',   'Fork open source de MySQL'),
('SQLite',      'bases_datos',   'Base de datos embebida'),
('MongoDB',     'bases_datos',   'Base de datos NoSQL documental'),
('Redis',       'bases_datos',   'Almacen clave-valor en memoria'),
('Linux',       'terminal',      'Sistema operativo open source'),
('Windows',     'terminal',      'Sistema operativo Microsoft'),
('MacOS',       'terminal',      'Sistema operativo Apple'),
('Bash',        'terminal',      'Shell de Unix/Linux'),
('Git',         'terminal',      'Control de versiones'),
('Docker',      'terminal',      'Contenedores y virtualizacion');

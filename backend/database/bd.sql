-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2026 a las 16:04:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `chuletarium`
--
CREATE DATABASE IF NOT EXISTS `chuletarium` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `chuletarium`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloques`
--

CREATE TABLE `bloques` (
  `id` int(11) NOT NULL,
  `seccion_id` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `texto` text DEFAULT NULL,
  `codigo` text DEFAULT NULL,
  `orden` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloques_notas`
--

CREATE TABLE `bloques_notas` (
  `id` int(11) NOT NULL,
  `bloque_id` int(11) NOT NULL,
  `nota` text NOT NULL,
  `orden` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL COMMENT 'Ej: Java, Python, SQL, Git, Docker...',
  `grupo` enum('programacion','bases_datos','terminal') NOT NULL COMMENT 'Grupo al que pertenece',
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `grupo`, `descripcion`) VALUES
(1, 'JavaScript', 'programacion', 'Lenguaje de programacion web'),
(2, 'TypeScript', 'programacion', 'Superset tipado de JavaScript'),
(3, 'Python', 'programacion', 'Lenguaje versatil y facil de aprender'),
(4, 'Java', 'programacion', 'Lenguaje orientado a objetos'),
(5, 'C#', 'programacion', 'Lenguaje de Microsoft/.NET'),
(6, 'C', 'programacion', 'Lenguaje de bajo nivel'),
(7, 'C++', 'programacion', 'Extension orientada a objetos de C'),
(8, 'PHP', 'programacion', 'Lenguaje de servidor web'),
(9, 'Go', 'programacion', 'Lenguaje de Google para sistemas'),
(10, 'Rust', 'programacion', 'Lenguaje de sistemas seguro'),
(11, 'Kotlin', 'programacion', 'Lenguaje moderno para JVM/Android'),
(12, 'Swift', 'programacion', 'Lenguaje de Apple para iOS/macOS'),
(13, 'HTML', 'programacion', 'Lenguaje de marcado web'),
(14, 'CSS3', 'programacion', 'Hojas de estilo'),
(15, 'Sass', 'programacion', 'Preprocesador CSS'),
(16, 'SQL', 'bases_datos', 'Lenguaje de consultas estandar'),
(17, 'PostgreSQL', 'bases_datos', 'SGBD relacional avanzado'),
(18, 'MySQL', 'bases_datos', 'SGBD relacional popular'),
(19, 'MariaDB', 'bases_datos', 'Fork open source de MySQL'),
(20, 'SQLite', 'bases_datos', 'Base de datos embebida'),
(21, 'MongoDB', 'bases_datos', 'Base de datos NoSQL documental'),
(22, 'Redis', 'bases_datos', 'Almacen clave-valor en memoria'),
(23, 'Linux', 'terminal', 'Sistema operativo open source'),
(24, 'Windows', 'terminal', 'Sistema operativo Microsoft'),
(25, 'MacOS', 'terminal', 'Sistema operativo Apple'),
(26, 'Bash', 'terminal', 'Shell de Unix/Linux'),
(27, 'Git', 'terminal', 'Control de versiones'),
(28, 'Docker', 'terminal', 'Contenedores y virtualizacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `ficha_id` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichas`
--

CREATE TABLE `fichas` (
  `id` varchar(100) NOT NULL COMMENT 'Slug unico, ej: java-basics',
  `titulo` varchar(255) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `nivel` enum('Basico','Intermedio','Avanzado') DEFAULT 'Basico',
  `fecha_actualizacion` date DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichas_tags`
--

CREATE TABLE `fichas_tags` (
  `id` int(11) NOT NULL,
  `ficha_id` varchar(100) NOT NULL,
  `tag` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secciones`
--

CREATE TABLE `secciones` (
  `id` int(11) NOT NULL,
  `ficha_id` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL COMMENT 'Anchor: strings, arrays, etc.',
  `titulo` varchar(255) NOT NULL,
  `orden` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones`
--

CREATE TABLE `sesiones` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_expiracion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `snippets`
--

CREATE TABLE `snippets` (
  `id` int(11) NOT NULL,
  `badge` varchar(50) NOT NULL COMMENT 'Ej: Python, JavaScript, SQL',
  `titulo` varchar(255) NOT NULL,
  `codigo` text NOT NULL,
  `descripcion` text DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL COMMENT 'NULL = snippet del sistema',
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL COMMENT 'Hash bcrypt generado con password_hash()',
  `rol` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=normal, 1=admin',
  `idioma` varchar(5) NOT NULL DEFAULT 'es' COMMENT 'Idioma preferido: es, en, fr...',
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=activo, 0=desactivado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indices para tablas volcadas
--

ALTER TABLE `bloques`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_seccion_orden` (`seccion_id`,`orden`);

ALTER TABLE `bloques_notas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_bloque` (`bloque_id`);

ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_nombre` (`nombre`);

ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_usuario_ficha` (`usuario_id`,`ficha_id`),
  ADD KEY `idx_usuario` (`usuario_id`),
  ADD KEY `idx_ficha` (`ficha_id`);

ALTER TABLE `fichas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_categoria` (`categoria_id`);

ALTER TABLE `fichas_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_ficha` (`ficha_id`),
  ADD KEY `idx_tag` (`tag`);

ALTER TABLE `secciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_ficha_orden` (`ficha_id`,`orden`);

ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_token` (`token`),
  ADD KEY `idx_usuario_id` (`usuario_id`),
  ADD KEY `idx_fecha_expiracion` (`fecha_expiracion`);

ALTER TABLE `snippets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_badge` (`badge`),
  ADD KEY `idx_usuario` (`usuario_id`);

ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

ALTER TABLE `bloques`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `bloques_notas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

ALTER TABLE `favoritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `fichas_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `secciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `sesiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `snippets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

ALTER TABLE `bloques`
  ADD CONSTRAINT `fk_bloques_seccion` FOREIGN KEY (`seccion_id`) REFERENCES `secciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `bloques_notas`
  ADD CONSTRAINT `fk_notas_bloque` FOREIGN KEY (`bloque_id`) REFERENCES `bloques` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `favoritos`
  ADD CONSTRAINT `fk_favoritos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `fichas`
  ADD CONSTRAINT `fk_fichas_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `fichas_tags`
  ADD CONSTRAINT `fk_tags_ficha` FOREIGN KEY (`ficha_id`) REFERENCES `fichas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `secciones`
  ADD CONSTRAINT `fk_secciones_ficha` FOREIGN KEY (`ficha_id`) REFERENCES `fichas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `sesiones`
  ADD CONSTRAINT `fk_sesiones_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `snippets`
  ADD CONSTRAINT `fk_snippets_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

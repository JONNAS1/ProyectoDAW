-- ============================================
-- ProyectoDAW - Esquema de Base de Datos
-- Importar en phpMyAdmin
-- ============================================

CREATE DATABASE IF NOT EXISTS proyectodaw
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE proyectodaw;

-- ============================================
-- Tabla: usuarios
-- Roles: 0 = normal, 1 = admin
-- ============================================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0=normal, 1=admin',
    idioma VARCHAR(5) NOT NULL DEFAULT 'es' COMMENT 'Idioma preferido: es, en, fr...',
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activo TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=activo, 0=desactivado',
    PRIMARY KEY (id),
    UNIQUE KEY uk_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: sesiones
-- Control de sesiones con tokens
-- ============================================
CREATE TABLE IF NOT EXISTS sesiones (
    id INT(11) NOT NULL AUTO_INCREMENT,
    usuario_id INT(11) NOT NULL,
    token VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion DATETIME NOT NULL,
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
-- Usuario admin por defecto
-- Password: admin123 (hasheado con password_hash)
-- IMPORTANTE: Cambiar la password en produccion
-- ============================================
-- Nota: El hash se genera con PHP, este es un ejemplo.
-- Usa el script insertar_admin.php para crear el admin real.

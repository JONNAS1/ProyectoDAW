<?php

//Middleware: Verificar autenticacion
//Incluir en los endpoints que requieran login
//Despues de incluir este archivo, $usuario_actual
//contendra los datos del usuario autenticado.

require_once __DIR__ . '/../config/database.php';

/**
 * Verificamos el token de sesion y devolvemos los datos del usuario
 * Usamos consultas parametrizadas para prevenir inyeccion SQL
 */
function verificarAuth(): array {
    $headers = getallheaders();
    $auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : '';

    if (empty($auth_header) || !str_starts_with($auth_header, 'Bearer ')) {
        http_response_code(401);
        echo json_encode(["error" => "No autorizado"]);
        exit;
    }

    $token = substr($auth_header, 7);

    try {
        $db = new Database();
        $conn = $db->getConnection();

        //Verificar token y que no haya expirado (consulta parametrizada)
        $stmt = $conn->prepare(
            "SELECT u.id, u.username, u.email, u.rol, u.idioma, u.activo
             FROM sesiones s
             INNER JOIN usuarios u ON s.usuario_id = u.id
             WHERE s.token = :token
             AND s.fecha_expiracion > NOW()"
        );
        $stmt->execute([':token' => $token]);
        $usuario = $stmt->fetch();

        if (!$usuario) {
            http_response_code(401);
            echo json_encode(["error" => "Sesion invalida o expirada"]);
            exit;
        }

        if (!$usuario['activo']) {
            http_response_code(403);
            echo json_encode(["error" => "Cuenta desactivada"]);
            exit;
        }

        return $usuario;

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Error en el servidor"]);
        exit;
    }
}

/**
 * Verificar que el usuario sea admin (rol = 1)
 */
function verificarAdmin(array $usuario): void {
    if ((int) $usuario['rol'] !== 1) {
        http_response_code(403);
        echo json_encode(["error" => "Acceso solo para administradores"]);
        exit;
    }
}
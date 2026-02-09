<?php
// ============================================
// API: Logout de usuario
// POST /api/auth/logout.php
// Header: Authorization: Bearer <token>
// ============================================

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Metodo no permitido"]);
    exit;
}

// Obtener token del header Authorization
$headers = getallheaders();
$auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if (empty($auth_header) || !str_starts_with($auth_header, 'Bearer ')) {
    http_response_code(401);
    echo json_encode(["error" => "Token no proporcionado"]);
    exit;
}

$token = substr($auth_header, 7);

try {
    $db = new Database();
    $conn = $db->getConnection();

    // Eliminar la sesion (consulta parametrizada)
    $stmt = $conn->prepare("DELETE FROM sesiones WHERE token = :token");
    $stmt->execute([':token' => $token]);

    // Eliminar cookie de idioma
    setcookie('idioma', '', [
        'expires'  => time() - 3600,
        'path'     => '/',
        'secure'   => false,
        'httponly'  => false,
        'samesite' => 'Lax',
    ]);

    http_response_code(200);
    echo json_encode(["mensaje" => "Sesion cerrada correctamente"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error en el servidor"]);
}

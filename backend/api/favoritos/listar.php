<?php
// ============================================
// API: Listar favoritos del usuario
// GET /api/favoritos/listar.php
// Header: Authorization: Bearer <token>
// ============================================

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../middleware/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Metodo no permitido"]);
    exit;
}

// Verificar autenticacion
$usuario_actual = verificarAuth();

try {
    $db = new Database();
    $conn = $db->getConnection();

    // Obtener IDs de fichas favoritas del usuario (consulta parametrizada)
    // No hace JOIN con fichas porque el frontend Angular usa datos locales (FICHAS array)
    $stmt = $conn->prepare(
        "SELECT ficha_id, fecha_creacion
         FROM favoritos
         WHERE usuario_id = :usuario_id
         ORDER BY fecha_creacion DESC"
    );
    $stmt->execute([':usuario_id' => $usuario_actual['id']]);
    $favoritos = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode([
        "total"     => count($favoritos),
        "favoritos" => $favoritos,
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al obtener favoritos"]);
}

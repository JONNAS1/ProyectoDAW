<?php
// ============================================
// API: Toggle favorito (anadir/quitar)
// POST /api/favoritos/toggle.php
// Body: { "ficha_id": "java-basics" }
// Header: Authorization: Bearer <token>
// ============================================

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../middleware/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Metodo no permitido"]);
    exit;
}

// Verificar autenticacion
$usuario_actual = verificarAuth();

$datos = json_decode(file_get_contents("php://input"), true);

if (empty($datos['ficha_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "ficha_id es obligatorio"]);
    exit;
}

$ficha_id = trim($datos['ficha_id']);
$usuario_id = $usuario_actual['id'];

try {
    $db = new Database();
    $conn = $db->getConnection();

    // Comprobar si ya es favorito (consulta parametrizada)
    $stmt = $conn->prepare(
        "SELECT id FROM favoritos WHERE usuario_id = :usuario_id AND ficha_id = :ficha_id"
    );
    $stmt->execute([
        ':usuario_id' => $usuario_id,
        ':ficha_id'   => $ficha_id,
    ]);
    $existente = $stmt->fetch();

    if ($existente) {
        // Ya es favorito -> quitar (consulta parametrizada)
        $stmt = $conn->prepare(
            "DELETE FROM favoritos WHERE usuario_id = :usuario_id AND ficha_id = :ficha_id"
        );
        $stmt->execute([
            ':usuario_id' => $usuario_id,
            ':ficha_id'   => $ficha_id,
        ]);

        http_response_code(200);
        echo json_encode([
            "mensaje"  => "Favorito eliminado",
            "favorito" => false,
            "accion"   => "eliminado",
        ]);
    } else {
        // No es favorito -> anadir (consulta parametrizada)
        $stmt = $conn->prepare(
            "INSERT INTO favoritos (usuario_id, ficha_id) VALUES (:usuario_id, :ficha_id)"
        );
        $stmt->execute([
            ':usuario_id' => $usuario_id,
            ':ficha_id'   => $ficha_id,
        ]);

        http_response_code(201);
        echo json_encode([
            "mensaje"  => "Favorito anadido",
            "favorito" => true,
            "accion"   => "agregado",
        ]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al gestionar favorito"]);
}

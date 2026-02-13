<?php

//API: Cambiar idioma del usuario
//PUT /api/idioma/cambiar.php
//Body: { "idioma": "en" }
//Header: Authorization: Bearer <token>
//Actualiza la cookie y la BD

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../middleware/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(["error" => "Metodo no permitido"]);
    exit;
}

//Verificar autenticacion
$usuario_actual = verificarAuth();

$datos = json_decode(file_get_contents("php://input"), true);

$idiomas_validos = ['es', 'en', 'fr', 'de', 'it', 'pt', 'ca'];

if (empty($datos['idioma']) || !in_array($datos['idioma'], $idiomas_validos)) {
    http_response_code(400);
    echo json_encode([
        "error" => "Idioma no valido. Valores permitidos: " . implode(', ', $idiomas_validos)
    ]);
    exit;
}

$idioma = $datos['idioma'];

try {
    $db = new Database();
    $conn = $db->getConnection();

    //Actualizar idioma en la BD (consulta parametrizada)
    $stmt = $conn->prepare("UPDATE usuarios SET idioma = :idioma WHERE id = :id");
    $stmt->execute([
        ':idioma' => $idioma,
        ':id'     => $usuario_actual['id'],
    ]);

    //Actualizar cookie de idioma
    setcookie('idioma', $idioma, [
        'expires'  => time() + (86400 * 30), // 30 dias
        'path'     => '/',
        'secure'   => false,
        'httponly'  => false, //Angular necesita leerla
        'samesite' => 'Lax',
    ]);

    http_response_code(200);
    echo json_encode([
        "mensaje" => "Idioma actualizado correctamente",
        "idioma"  => $idioma,
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al actualizar el idioma"]);
}

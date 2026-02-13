<?php

//API: Obtener perfil del usuario autenticado
//GET /api/auth/perfil.php
//Header: Authorization: Bearer <token>

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../middleware/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Metodo no permitido"]);
    exit;
}

//Verificar autenticacion
$usuario_actual = verificarAuth();

http_response_code(200);
echo json_encode([
    "usuario" => [
        "id"       => (int) $usuario_actual['id'],
        "username" => $usuario_actual['username'],
        "email"    => $usuario_actual['email'],
        "rol"      => (int) $usuario_actual['rol'],
        "idioma"   => $usuario_actual['idioma'],
    ]
]);

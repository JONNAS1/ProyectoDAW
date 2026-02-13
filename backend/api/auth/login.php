<?php

//API: Login de usuario
//POST /api/auth/login.php
//Body: { "email": "", "password": "" }
//Devuelve token de sesion + cookie de idioma

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Metodo no permitido"]);
    exit;
}

$datos = json_decode(file_get_contents("php://input"), true);

if (empty($datos['email']) || empty($datos['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Email y password son obligatorios"]);
    exit;
}

$email = trim($datos['email']);
$password = $datos['password'];

try {
    $db = new Database();
    $conn = $db->getConnection();

    //Buscar usuario por email (consulta parametrizada)
    $stmt = $conn->prepare(
        "SELECT id, username, email, password, rol, idioma, activo
         FROM usuarios
         WHERE email = :email"
    );
    $stmt->execute([':email' => $email]);
    $usuario = $stmt->fetch();

    //Verificar que el usuario existe
    if (!$usuario) {
        http_response_code(401);
        echo json_encode(["error" => "Credenciales incorrectas"]);
        exit;
    }

    //Verificar que el usuario esta activo
    if (!$usuario['activo']) {
        http_response_code(403);
        echo json_encode(["error" => "Cuenta desactivada"]);
        exit;
    }

    //Verificar la password con password_verify
    if (!password_verify($password, $usuario['password'])) {
        http_response_code(401);
        echo json_encode(["error" => "Credenciales incorrectas"]);
        exit;
    }

    //Generar token de sesion seguro
    $token = bin2hex(random_bytes(32));
    $expiracion = date('Y-m-d H:i:s', strtotime('+24 hours'));

    //Guardar sesion en la base de datos (consulta parametrizada)
    $stmt = $conn->prepare(
        "INSERT INTO sesiones (usuario_id, token, fecha_expiracion)
         VALUES (:usuario_id, :token, :fecha_expiracion)"
    );
    $stmt->execute([
        ':usuario_id'       => $usuario['id'],
        ':token'            => $token,
        ':fecha_expiracion' => $expiracion,
    ]);

    //Establecer cookie de idioma para ngx-translate
    setcookie('idioma', $usuario['idioma'], [
        'expires'  => time() + (86400 * 30), // 30 dias
        'path'     => '/',
        'secure'   => false, // Cambiar a true en produccion con HTTPS
        'httponly'  => false, // false para que Angular pueda leerla
        'samesite' => 'Lax',
    ]);

    http_response_code(200);
    echo json_encode([
        "mensaje" => "Login correcto",
        "token"   => $token,
        "usuario" => [
            "id"       => (int) $usuario['id'],
            "username" => $usuario['username'],
            "email"    => $usuario['email'],
            "rol"      => (int) $usuario['rol'],
            "idioma"   => $usuario['idioma'],
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error en el servidor"]);
}
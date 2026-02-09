<?php
// ============================================
// API: Registro de usuario
// POST /api/auth/registro.php
// Body: { "nombre": "", "email": "", "password": "", "idioma": "es" }
// ============================================

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Metodo no permitido"]);
    exit;
}

// Leer datos del body
$datos = json_decode(file_get_contents("php://input"), true);

// Validar campos obligatorios
if (
    empty($datos['nombre']) ||
    empty($datos['email']) ||
    empty($datos['password'])
) {
    http_response_code(400);
    echo json_encode(["error" => "Nombre, email y password son obligatorios"]);
    exit;
}

$nombre = trim($datos['nombre']);
$email = trim($datos['email']);
$password = $datos['password'];
$idioma = isset($datos['idioma']) ? trim($datos['idioma']) : 'es';

// Validar formato de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Formato de email no valido"]);
    exit;
}

// Validar longitud de password (minimo 6 caracteres)
if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(["error" => "La password debe tener al menos 6 caracteres"]);
    exit;
}

try {
    $db = new Database();
    $conn = $db->getConnection();

    // Verificar si el email ya existe (consulta parametrizada)
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = :email");
    $stmt->execute([':email' => $email]);

    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(["error" => "El email ya esta registrado"]);
        exit;
    }

    // Hashear la password con password_hash (bcrypt por defecto)
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Insertar usuario (consulta parametrizada)
    $stmt = $conn->prepare(
        "INSERT INTO usuarios (nombre, email, password, rol, idioma)
         VALUES (:nombre, :email, :password, :rol, :idioma)"
    );

    $stmt->execute([
        ':nombre'   => $nombre,
        ':email'    => $email,
        ':password' => $password_hash,
        ':rol'      => 0, // Siempre usuario normal al registrarse
        ':idioma'   => $idioma,
    ]);

    $usuario_id = $conn->lastInsertId();

    http_response_code(201);
    echo json_encode([
        "mensaje" => "Usuario registrado correctamente",
        "usuario" => [
            "id"     => (int) $usuario_id,
            "nombre" => $nombre,
            "email"  => $email,
            "rol"    => 0,
            "idioma" => $idioma,
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al registrar el usuario"]);
}

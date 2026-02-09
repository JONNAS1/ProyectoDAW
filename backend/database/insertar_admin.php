<?php
// ============================================
// Script: Crear usuario admin por defecto
// Ejecutar UNA VEZ desde terminal:
//   php insertar_admin.php
// ============================================

require_once __DIR__ . '/../config/database.php';

$username = "admin";
$email = "admin@chuletarium.com";
$password = "admin123"; // Cambiar en produccion

try {
    $db = new Database();
    $conn = $db->getConnection();

    // Verificar si ya existe
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = :email");
    $stmt->execute([':email' => $email]);

    if ($stmt->fetch()) {
        echo "El usuario admin ya existe.\n";
        exit;
    }

    // Hashear password con password_hash (bcrypt)
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Insertar admin (consulta parametrizada)
    $stmt = $conn->prepare(
        "INSERT INTO usuarios (username, email, password, rol, idioma)
         VALUES (:username, :email, :password, :rol, :idioma)"
    );

    $stmt->execute([
        ':username' => $username,
        ':email'    => $email,
        ':password' => $password_hash,
        ':rol'      => 1, // Admin
        ':idioma'   => 'es',
    ]);

    echo "Usuario admin creado correctamente.\n";
    echo "Email: {$email}\n";
    echo "Password: {$password}\n";
    echo "IMPORTANTE: Cambia la password en produccion.\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

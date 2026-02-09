<?php
// ============================================
// API: Detalle de una ficha completa
// GET /api/fichas/detalle.php?id=java-basics
// Devuelve ficha con secciones, bloques y notas
// ============================================

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Metodo no permitido"]);
    exit;
}

if (empty($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "El parametro id es obligatorio"]);
    exit;
}

$ficha_id = trim($_GET['id']);

try {
    $db = new Database();
    $conn = $db->getConnection();

    // Obtener ficha (consulta parametrizada)
    $stmt = $conn->prepare(
        "SELECT f.id, f.titulo, f.descripcion, f.nivel, f.fecha_actualizacion,
                c.nombre AS categoria
         FROM fichas f
         INNER JOIN categorias c ON f.categoria_id = c.id
         WHERE f.id = :id"
    );
    $stmt->execute([':id' => $ficha_id]);
    $ficha = $stmt->fetch();

    if (!$ficha) {
        http_response_code(404);
        echo json_encode(["error" => "Ficha no encontrada"]);
        exit;
    }

    // Obtener tags (consulta parametrizada)
    $stmtTags = $conn->prepare(
        "SELECT tag FROM fichas_tags WHERE ficha_id = :ficha_id ORDER BY id"
    );
    $stmtTags->execute([':ficha_id' => $ficha_id]);
    $ficha['tags'] = $stmtTags->fetchAll(PDO::FETCH_COLUMN);

    // Obtener secciones con bloques y notas (consulta parametrizada)
    $stmtSec = $conn->prepare(
        "SELECT id, slug, titulo FROM secciones WHERE ficha_id = :ficha_id ORDER BY orden"
    );
    $stmtSec->execute([':ficha_id' => $ficha_id]);
    $secciones = $stmtSec->fetchAll();

    foreach ($secciones as &$seccion) {
        // Bloques de cada seccion (consulta parametrizada)
        $stmtBloq = $conn->prepare(
            "SELECT id, titulo, texto, codigo FROM bloques WHERE seccion_id = :seccion_id ORDER BY orden"
        );
        $stmtBloq->execute([':seccion_id' => $seccion['id']]);
        $bloques = $stmtBloq->fetchAll();

        foreach ($bloques as &$bloque) {
            // Notas de cada bloque (consulta parametrizada)
            $stmtNotas = $conn->prepare(
                "SELECT nota FROM bloques_notas WHERE bloque_id = :bloque_id ORDER BY orden"
            );
            $stmtNotas->execute([':bloque_id' => $bloque['id']]);
            $notas = $stmtNotas->fetchAll(PDO::FETCH_COLUMN);
            if (!empty($notas)) {
                $bloque['notas'] = $notas;
            }
            unset($bloque['id']); // No exponer IDs internos
        }

        $seccion['bloques'] = $bloques;
        unset($seccion['id']); // No exponer IDs internos
    }

    $ficha['secciones'] = $secciones;

    http_response_code(200);
    echo json_encode($ficha);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al obtener la ficha"]);
}

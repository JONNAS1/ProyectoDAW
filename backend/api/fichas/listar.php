<?php

//API: Listar fichas (con filtros opcionales)
//GET /api/fichas/listar.php
//GET /api/fichas/listar.php?categoria=Java
//GET /api/fichas/listar.php?q=strings
//GET /api/fichas/listar.php?grupo=programacion

require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["error" => "Metodo no permitido"]);
    exit;
}

$categoria = isset($_GET['categoria']) ? trim($_GET['categoria']) : null;
$grupo     = isset($_GET['grupo'])     ? trim($_GET['grupo'])     : null;
$busqueda  = isset($_GET['q'])         ? trim($_GET['q'])         : null;

try {
    $db = new Database();
    $conn = $db->getConnection();

    $sql = "SELECT f.id, f.titulo, f.descripcion, f.nivel, f.fecha_actualizacion,
                   c.nombre AS categoria, c.grupo
            FROM fichas f
            INNER JOIN categorias c ON f.categoria_id = c.id
            WHERE 1=1";
    $params = [];

    //Filtro por categoria (consulta parametrizada)
    if ($categoria) {
        $sql .= " AND c.nombre = :categoria";
        $params[':categoria'] = $categoria;
    }

    //Filtro por grupo (consulta parametrizada)
    if ($grupo) {
        $sql .= " AND c.grupo = :grupo";
        $params[':grupo'] = $grupo;
    }

    //Busqueda por titulo o descripcion (consulta parametrizada)
    if ($busqueda) {
        $sql .= " AND (f.titulo LIKE :busqueda OR f.descripcion LIKE :busqueda2)";
        $params[':busqueda']  = "%{$busqueda}%";
        $params[':busqueda2'] = "%{$busqueda}%";
    }

    $sql .= " ORDER BY f.fecha_creacion DESC";

    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $fichas = $stmt->fetchAll();

    //Obtener tags para cada ficha
    foreach ($fichas as &$ficha) {
        $stmtTags = $conn->prepare(
            "SELECT tag FROM fichas_tags WHERE ficha_id = :ficha_id ORDER BY id"
        );
        $stmtTags->execute([':ficha_id' => $ficha['id']]);
        $ficha['tags'] = $stmtTags->fetchAll(PDO::FETCH_COLUMN);
    }

    http_response_code(200);
    echo json_encode([
        "total"  => count($fichas),
        "fichas" => $fichas,
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al obtener las fichas"]);
}
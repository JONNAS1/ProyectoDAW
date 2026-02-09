<?php
// ============================================
// Conexion a la Base de Datos con PDO
// ============================================

class Database {
    private string $host = "localhost";
    private string $db_name = "proyectodaw";
    private string $username = "root";
    private string $password = "";
    private string $charset = "utf8mb4";

    private ?PDO $conn = null;

    /**
     * Obtener la conexion a la base de datos
     * Usa PDO con consultas parametrizadas para prevenir inyecciones SQL
     */
    public function getConnection(): PDO {
        if ($this->conn === null) {
            try {
                $dsn = "mysql:host={$this->host};dbname={$this->db_name};charset={$this->charset}";

                $options = [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ];

                $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(["error" => "Error de conexion a la base de datos"]);
                exit;
            }
        }

        return $this->conn;
    }
}

<?php
include "../database.php"; // Importando database

class ContratosController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllContratos()
    {
        $sql = "SELECT * FROM tipo_contrato";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $contratos = $db->fetchAll(PDO::FETCH_ASSOC);
        return $contratos;
    }

}

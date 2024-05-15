<?php
include "../database.php"; //importando database

class RelatorioController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllUsers()
    {
        $sql = "SELECT Cliente.id ,cliente_id,Cliente.nome,Vendedor.id,Vendedor.nome FROM Contrato JOIN Cliente ON Cliente.id = Contrato.cliente_id JOIN Vendedor ON Vendedor.id = Contrato.vendedor_id;";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }

}    
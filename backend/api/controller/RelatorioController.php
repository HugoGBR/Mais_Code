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

    public function BuscaRelatorio()
    {
        $sql = "select * from produtos;";

        
        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }
}

<?php
include "../database.php";

class UserFinanceiro
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllFinan()
    {
        $sql = "SELECT * FROM mais_code.usuarios WHERE cargo_id = 2 or cargo_id = 1" ;
        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }
  
}



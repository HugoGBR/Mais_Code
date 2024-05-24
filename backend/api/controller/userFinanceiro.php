<?php
include "../database.php"; //importando database

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
        $sql = "SELECT * FROM usuarios" ;
        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }

    

   

    
  
}



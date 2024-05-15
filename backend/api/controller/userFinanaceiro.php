<?php
include "../database.php"; 

class Financontroller
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getfinanceiro()
    {
        $sql = "SELECT * FROM usuarios";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }
}
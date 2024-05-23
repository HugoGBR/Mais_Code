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
        $sql = "SELECT 
        usuarios.id,
        usuarios.nome,
        usuarios.senha,
        usuarios.email,
        cargos.nome AS cargo_nome
        FROM 
        usuarios
        JOIN 
        cargos ON usuarios.cargo_id = cargos.id;" ;
        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }

    

   

    
  
}



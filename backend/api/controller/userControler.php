<?php
include "../database.php"; //importando database

class Usercontroller
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllUsers()
    {
        $sql = "SELECT * FROM usuarios";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }

    public function CreateNewUser()
    {
        $user = json_decode(file_get_contents("php//input"));
        $sql = "INSERT INTO usuarios(nome,telefone,senha,email) VALUES (:nome,:telefone,:senha,:email)";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome", $user->nome);
        $db->bindParam(":telefone", $user->telefone);
        $db->bindParam(":senha", $user->password_hash);
        $db->bindParam(":email", $user->email);
        $db->execute();

        if($db->execute()){
            $resposta = ["Mensagem"=> "Usuario Cadastrado com Sucesso!"];
        }

        return $resposta;
    }
}
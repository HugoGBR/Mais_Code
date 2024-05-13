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
        $sql = "INSERT INTO usuarios(nome,cargo_id,telefone,senha,email) VALUES (:nome,:cargo_id,:telefone,:senha,:email)";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome", $user->nome);
        $db->bindParam("cargo_id", $user->cargo_id);
        $db->bindParam(":telefone", $user->telefone);
        $db->bindParam(":senha", $user->password_hash);
        $db->bindParam(":email", $user->email);
        $db->execute();

        if ($db->execute()) {
            $resposta = ["Mensagem" => "Usuario Cadastrado com Sucesso!"];
        }

        return $resposta;
    }

    public function getUserById(int $id)
    {
        try {
            $sql = "SELECT * FROM usuarios WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $user = $db->fetch(PDO::FETCH_ASSOC);
            return $user;

        } catch (Exception $th) {
            echo "Erro ao buscar o usuario: " . $th->getMessage();
            return null;
        }
    }

    public function createNewUserGestao()
    {
        try {
            $user = json_decode(file_get_contents("php://input"));
            $sql = "INSERT INTO usuarios (id, nome, cargo_id, telefone, senha, email) VALUES (:id, :nome, :cargo_id, :telefone, :senha, :email)";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $user->id);
            $db->bindParam(":nome", $user->nome);
            $db->bindParam(":cargo_id", $user->cargo_id);
            $db->bindParam(":telefone", $user->telefone);
            $db->bindParam(":senha", $user->password_hash);
            $db->bindParam(":email", $user->email);
            $db->execute();

            $resposta = ["Mensagem" => "Usuario Cadastrado com Sucesso!"];
            return $resposta;
        } catch (Exception $e) {
            echo 'Erro ao criar usuário: ' . $e->getMessage();
            return null;
        }
    }
}


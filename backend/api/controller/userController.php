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
        $db->bindParam(":cargo_id", $user->cargo_id);
        $db->bindParam(":telefone", $user->telefone);
        $db->bindParam(":senha", $user->password_hash);
        $db->bindParam(":email", $user->email);
        $db->execute();

        if ($db->execute()) {
            $resposta = ["Mensagem" => "Usuario Cadastrado com Sucesso!"];
        }

        return $resposta;
    }

    public function validacaoLogin()
    {
        $user = json_decode(file_get_contents("php://input"));
        $sql = "SELECT * FROM usuarios WHERE email = :email AND senha = :senha";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":email", $user->email);
        $db->bindParam(":senha", $user->senha);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);


        if ($users) {
            $resposta = 1;
        }else{
            $resposta = 0;
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

        } catch (\Exception $th) {
            echo "Erro ao buscar o usuario: " . $th->getMessage();
            return null;
        }
    }

    public function createNewUserGestao() {
        try {
            $user = json_decode(file_get_contents("php://input"));

            if (!$user || !isset($user->nome) || !isset($user->cargo_id) || !isset($user->senha) || !isset($user->email) ) {
                return json_encode(['status' => 0, 'message' => 'Dados incompletos.']);
            }

            $userExists = $this->checkUserExists($user->email);
            if ($userExists) {
                return json_encode(['status' => 0, 'message' => 'Usuário já existe.']);
            }

            $sql = "INSERT INTO usuarios (nome,cargo_id, senha, email) VALUES (:nome, :cargo_id, :senha, :email)";
            $db = $this->conn->prepare($sql);

            $db->bindParam(":nome", $user->nome);
            $db->bindParam("cargo_id", $user->cargo_id);
            $db->bindParam(":senha", $user->senha);
            $db->bindParam(":email", $user->email);

            if ($db->execute()) {
                $resposta = 1;
            } else {
                $resposta = 0;
            }

            return json_encode($resposta);

        } catch (\Exception $e) {
            error_log('Erro ao criar usuário: ' . $e->getMessage());
            return json_encode(['status' => 0, 'message' => 'Erro ao criar usuário.']);
        }
    }



    private function checkUserExists(string $email) {
        $query = "SELECT COUNT(*) FROM usuarios WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }
}
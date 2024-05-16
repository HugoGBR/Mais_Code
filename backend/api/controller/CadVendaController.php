<?php
include "../database.php";
class Contratocontroller
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getClientById(int $id)
    {
        try {
            $sql = "SELECT * FROM clientes WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $user = $db->fetch(PDO::FETCH_ASSOC);
            return $user;

        } catch (\Exception $th) {
            echo "Erro ao buscar o cliente: " . $th->getMessage();
            return null;
        }
    }

    public function CreateNewContract()
    {
        $user = json_decode(file_get_contents("php//input"));
        $sql = "INSERT INTO vendas(cargo_id,telefone,senha,email) VALUES (:nome,:cargo_id,:telefone,:senha,:email)";
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


    // public function createNewUserGestao()
    // {
    //      try{
    //     //     $userExists = $this->checkUserExists($id);
    //     //     if (!$userExists) {
    //     //         return ['status' => 0, 'message' => 'Usuário não encontrado.'];
    //     //     }
    //         $user = json_decode(file_get_contents("php://input"));
    //         $sql = "INSERT INTO usuarios (nome, senha, email) VALUES (:nome, :senha, :email)";
    //         $db = $this->conn->prepare($sql);

    //         $db->bindParam(":nome", $user->nome);
    //         $db->bindParam(":senha", $user->senha);
    //         $db->bindParam(":email", $user->email);
    
    //         if ($db->execute()) {
    //             $resposta = ["Mensagem" => "Usuario Cadastrado com Sucesso!"];
    //         }
    //         // if ($db->execute()) {
    //         //     $response = ['status' => 1, 'message' => 'Registro atualizado com sucesso.'];
    //         // } else {
    //         //     $response = ['status' => 0, 'message' => 'Falha ao atualizar o registro.'];
    //         // }
    //         return $resposta;
    //     }catch (Exception $e) {
    //         echo 'Erro ao criar usuário: ' . $e->getMessage();
    //         return null;
    //     }
    // } 
}


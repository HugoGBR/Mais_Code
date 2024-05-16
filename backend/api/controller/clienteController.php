<?php
include "../database.php";


class Clientecontroller
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function updateClientByID(int $id)
    {
        try {
            $userExists = $this->checkUserExists($id);
            if (!$userExists) {
                return ['status' => 0, 'message' => 'Cliente não encontrado.'];
            }

            $user = json_decode(file_get_contents('php://input'));

            $sql = "UPDATE clientes SET nome = :nome, email = :email, telefone = :telefone, cpf_cnpj = :cpf_cnpj WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':nome', $user->nome);
            $stmt->bindParam(':email', $user->email);
            $stmt->bindParam(':telefone', $user->telefone);
            $stmt->bindParam(':cpf_cnpj', $user->cpf_cnpj);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Registro atualizado com sucesso.'];
            } else {
                $response = ['status' => 0, 'message' => 'Falha ao atualizar o registro.'];
            }

            return $response;
        } catch (Exception $e) {
            echo 'Erro ao atualizar Cliente: ' . $e->getMessage();
            return null;
        }
    }


    public function createNewCliente()
    {
        try {
        $user = json_decode(file_get_contents("php://input"));
        $sql = "INSERT INTO clientes(nome,email,telefone,cpf_cnpj) VALUES (:nome,:email,:telefone,:cpf_cnpj)";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome", $user->nome);
        $db->bindParam("email", $user->email);
        $db->bindParam(":telefone", $user->telefone);
        $db->bindParam(":cpf_cnpj", $user->cpf_cnpj);
        $db->execute();

        if ($db->execute()) {
            $resposta = ["Mensagem" => "Cliente Cadastrado com Sucesso!"];
        }
        } catch (Exception $e) {
            echo 'Erro ao criar cliente: ' . $e->getMessage();
            return null;            
        }
        return $resposta;

    }
//---
    public function getAllClient()
    {
        $query = "SELECT * FROM CLIENTES";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }
//ME


    private function checkUserExists(int $id)
    {
        $query = "SELECT COUNT(*) FROM clientes WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }
}


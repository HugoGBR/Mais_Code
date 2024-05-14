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
                return ['status' => 0, 'message' => 'Usuário não encontrado.'];
            }

            $user = json_decode(file_get_contents('php://input'));

            $sql = "UPDATE clientes SET nome = :nome, endereco = :endereco, telefone = :telefone, cpf_cnpj = :cpf_cnpj WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':nome', $user->nome);
            $stmt->bindParam(':endereco', $user->endereco);
            $stmt->bindParam(':telefone', $user->telefone);
            $stmt->bindParam(':cpf_cnpj', $user->cpf_cnpj);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Registro atualizado com sucesso.'];
            } else {
                $response = ['status' => 0, 'message' => 'Falha ao atualizar o registro.'];
            }

            return $response;
        } catch (Exception $e) {
            echo 'Erro ao atualizar usuário: ' . $e->getMessage();
            return null;
        }
    }


    public function createNewCliente()
    {
        try {
        $user = json_decode(file_get_contents("php//input"));
        $sql = "INSERT INTO usuarios(id,nome,endereco,telefone,cpf_cnpj) VALUES (:id,:nome,:endereco,:telefone,:cpf_cnpj)";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":id", $user->id);
        $db->bindParam(":nome", $user->nome);
        $db->bindParam("endereco", $user->endereco);
        $db->bindParam(":telefone", $user->telefone);
        $db->bindParam(":cpf_cnpj", $user->cpf_cnpj);
        $db->execute();

        if ($db->execute()) {
            $resposta = ["Mensagem" => "Usuario Cadastrado com Sucesso!"];
        }

        return $resposta;
    }catch (Exception $e) {
        echo 'Erro ao criar usuário: ' . $e->getMessage();
        return null;
    }
}
}

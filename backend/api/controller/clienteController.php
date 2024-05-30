<?php
include_once "../database.php";

class ClienteController
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
            if (!$user) {
                return ['status' => 0, 'message' => 'Dados do cliente inválidos.'];
            }

            $sql = "UPDATE clientes SET nome = :nome, email = :email, telefone = :telefone, cpf_cnpj = :cpf_cnpj WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':nome', $user->nome);
            $stmt->bindParam(':email', $user->email);
            $stmt->bindParam(':telefone', $user->telefone);
            $stmt->bindParam(':cpf_cnpj', $user->cpf_cnpj);

            if ($stmt->execute()) {
                return ['status' => 1, 'message' => 'Registro atualizado com sucesso.'];
            } else {
                return ['status' => 0, 'message' => 'Falha ao atualizar o registro.'];
            }
        } catch (Exception $e) {
            return ['status' => 0, 'message' => 'Erro ao atualizar Cliente: ' . $e->getMessage()];
        }
    }

    public function createNewCliente()
    {
        try {
            $user = json_decode(file_get_contents("php://input"));
            if (!$user) {
                return ['status' => 0, 'message' => 'Dados do cliente inválidos.'];
            }

            $sql = "INSERT INTO clientes (nome, email, telefone, cpf_cnpj) VALUES (:nome, :email, :telefone, :cpf_cnpj)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(":nome", $user->nome);
            $stmt->bindParam(":email", $user->email);
            $stmt->bindParam(":telefone", $user->telefone);
            $stmt->bindParam(":cpf_cnpj", $user->cpf_cnpj);

            if ($stmt->execute()) {
                return ["Mensagem" => "Cliente Cadastrado com Sucesso!"];
            } else {
                return ["status" => 0, "message" => "Falha ao cadastrar cliente."];
            }
        } catch (Exception $e) {
            return ['status' => 0, 'message' => 'Erro ao criar cliente: ' . $e->getMessage()];
        }
    }

    public function getAllClient()
    {
        try {
            $sql = "SELECT * FROM clientes";
            $db = $this->conn->prepare($sql);
            $db->execute();
            $users = $db->fetchAll(PDO::FETCH_ASSOC);
            return $users;
        } catch (Exception $e) {
            return ['status' => 0, 'message' => 'Erro ao buscar clientes: ' . $e->getMessage()];
        }
    }

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
?>

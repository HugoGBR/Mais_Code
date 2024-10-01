<?php
include "../database.php"; // Importando database

class TipoContratoController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllTipoContratoController()
    {
        $sql = "SELECT * FROM tipo_contrato";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $tipo_contrato = $db->fetchAll(PDO::FETCH_ASSOC);
        return $tipo_contrato;
    }

    public function createNewTipoContrato()
    {
        $tipo_contrato = json_decode(file_get_contents("php://input"));

        $sql = "INSERT INTO tipo_contrato(nome) VALUES (:nome)";

        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome", $tipo_contrato->nome);
     
        if ($db->execute()) {
            $resposta = ["Mensagem" => "Tipo Contrato Cadastrado com Sucessso!"];
        } else {
            $resposta = ["Mensagem" => "Erro ao cadastrar Tipo Contrato"];
        }
        return $resposta;
    }
    public function updateContratoById(int $id){
        try {
            $user = json_decode(file_get_contents('php://input'));
    
            $userExists = $this->checkContratoExistsById($id);
            if (!$userExists) {
                return json_encode(['status' => 0, 'message' => 'Usuário não encontrado.']);
            }
    
            $sql = "UPDATE tipo_contrato SET nome = :nome WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':nome', $user->nome);
            if ($stmt->execute()) {
                return json_encode(['status' => 1, 'message' => 'Registro atualizado com sucesso.']);
            } else {
                return json_encode(['status' => 0, 'message' => 'Falha ao atualizar o registro.']);
            }
        } catch (\Exception $e) {
            error_log('Erro ao atualizar usuário: ' . $e->getMessage());
            return json_encode(['status' => 0, 'message' => 'Erro ao atualizar usuário.']);
        }
    }
    
public function getContratoById(int $id)
{
    try {
        $sql = "SELECT * FROM tipo_contrato WHERE id = :id";
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

    private function checkContratoExistsById(int $id){
        $query = "SELECT COUNT(*) FROM tipo_contrato WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }

    public function getProdutoById(int $id)
    {
        try {
            $sql = "SELECT * FROM produtos WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $tipo_contrato = $db->fetch(PDO::FETCH_ASSOC);
            return $tipo_contrato;
        } catch (\Exception $th) {
            echo "Erro ao buscar o Tipo Contrato: " . $th->getMessage();
            return null;
        }
    }
}

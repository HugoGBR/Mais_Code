<?php
include "../database.php"; 

class ProdutoController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllProduto()
    {
        $sql = "SELECT * FROM produtos";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $produtos = $db->fetchAll(PDO::FETCH_ASSOC);
        return $produtos;
    }

    public function createNewProduto()
    {
        $produto = json_decode(file_get_contents("php://input"));
        $sql = "INSERT INTO produtos(nome, horas_trabalhadas, descricao_produto, comissao_antiga, comissao_nova) VALUES (
            :nome, 
            :horas_trabalhadas, 
            :descricao_produto, 
            :comissao_antiga,
            :comissao_nova)";

        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome", $produto->nome);
        $db->bindParam(":horas_trabalhadas", $produto->horas_trabalhadas);
        $db->bindParam(":descricao_produto", $produto->descricao_produto);
        $db->bindParam(":comissao_antiga", $produto->comissaoAntigo);
        $db->bindParam(":comissao_nova", $produto->comissaoNovo);

        if ($db->execute()) {
            $resposta = ["Mensagem" => "Produto Cadastrado com Sucesso!"];
        } else {
            $resposta = ["Mensagem" => "Erro ao cadastrar produto"];
        }
        return $resposta;
    }

    public function updateProdutoById(int $id)
    {
        try {
            $produto = json_decode(file_get_contents("php://input"));
    
            $produtoExists = $this->checkProdutoExistsById($id);
            if (!$produtoExists) {
                return json_encode(['status' => 0, 'message' => 'Produto não encontrado.']);
            }
    
            $sql = "UPDATE produtos SET nome = :nome, horas_trabalhadas = :horas_trabalhadas, descricao_produto = :descricao_produto,
                    comissao_antiga = :comissao_antiga, comissao_nova = :comissao_nova WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(':id', $id);
            $db->bindParam(":nome", $produto->nome);
            $db->bindParam(":horas_trabalhadas", $produto->horas_trabalhadas);
            $db->bindParam(":descricao_produto", $produto->descricao_produto);
            $db->bindParam(":comissao_nova", $produto->comissao_nova);
            $db->bindParam(":comissao_antiga", $produto->comissao_antiga);
    
            if ($db->execute()) {
                return json_encode(['status' => 1, 'message' => 'Registro atualizado com sucesso.']);
            } else {
                return json_encode(['status' => 0, 'message' => 'Falha ao atualizar o registro.']);
            }
    
        } catch (\Exception $e) {
            error_log('Erro ao atualizar produto: ' . $e->getMessage());
            return json_encode(['status' => 0, 'message' => 'Erro ao atualizar produto.']);
        }
    }
    
    private function checkProdutoExistsById(int $id)
    {
        $query = "SELECT COUNT(*) FROM produtos WHERE id = :id";
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
            $produto = $db->fetch(PDO::FETCH_ASSOC);
            return $produto;
        } catch (\Exception $e) {
            error_log("Erro ao buscar o produto: " . $e->getMessage());
            return null;
        }
    }
    public function getAllTiposClientes()
    {
        $sql = "SELECT * FROM tipo_cliente";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $produtos = $db->fetchAll(PDO::FETCH_ASSOC);
        return $produtos;
    }
}

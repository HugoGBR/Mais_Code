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
    try {
        $produto = json_decode(file_get_contents("php://input"));
        $sql = "INSERT INTO produtos(nome, horas_trabalhadas, descricao_produto, comissao_antiga, comissao_nova) VALUES (
            :nome, 
            :horas_trabalhadas, 
            :descricao_produto, 
            :comissao_antiga, 
            :comissao_nova
        )";
        
        if (!$produto || !isset($produto->nome) || !isset($produto->horas_trabalhadas) || !isset($produto->descricao_produto) || !isset($produto->comissaoAntigo) || !isset($produto->comissaoNovo)) {
            return json_encode(['status' => 0, 'message' => 'Dados incompletos.']);
        }

        $ProdutoExists = $this->checkProdutoExistsName($produto->nome);
        if ($ProdutoExists) {
            return json_encode(['status' => 3, 'message' => 'Usuário já existe.']);
        }else{
            $sql = "INSERT INTO produtos (nome, horas_trabalhadas, descricao_produto, comissao_antiga, comissao_nova) 
                VALUES (:nome, :horas_trabalhadas, :descricao_produto, :comissao_antiga, :comissao_nova)";
        

        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome", $produto->nome);
        $db->bindParam(":horas_trabalhadas", $produto->horas_trabalhadas);
        $db->bindParam(":descricao_produto", $produto->descricao_produto);
        $db->bindParam(":comissao_antiga", $produto->comissaoAntigo);
        $db->bindParam(":comissao_nova", $produto->comissaoNovo);

        if ($db->execute()) {
            $resposta = ['status' => 1, 'message' => 'Sucesso.'];
        } else {
            $resposta = ['status' => 0, 'message' => 'Erro ao cadastrar'];
        }

        return json_encode($resposta);
        }

        
    } catch (\Exception $e) {
        error_log('Erro ao criar produto: ' . $e->getMessage());
        return json_encode(['status' => 0, 'message' => 'Erro ao criar produto.']);
    }
}


public function updateProdutoById(int $id)
{
    try {
        $produto = json_decode(file_get_contents("php://input"));
        if (
            !$produto || 
            !isset($produto->nome) || 
            !isset($produto->horas_trabalhadas) || 
            !isset($produto->descricao_produto) || 
            !isset($produto->comissao_antiga) || 
            !isset($produto->comissao_nova)
        ) {
            return json_encode(['status' => 3, 'message' => 'Dados incompletos.']);
        }

        $produtoExists = $this->checkProdutoExistsById($id);
        if (!$produtoExists) {
            return json_encode(['status' => 0, 'message' => 'Produto não encontrado.']);
        }

        $sql = "UPDATE produtos SET 
                    nome = :nome, 
                    horas_trabalhadas = :horas_trabalhadas, 
                    descricao_produto = :descricao_produto,
                    comissao_antiga = :comissao_antiga, 
                    comissao_nova = :comissao_nova 
                WHERE id = :id";
        $db = $this->conn->prepare($sql);
        $db->bindParam(':id', $id);
        $db->bindParam(":nome", $produto->nome);
        $db->bindParam(":horas_trabalhadas", $produto->horas_trabalhadas);
        $db->bindParam(":descricao_produto", $produto->descricao_produto);
        $db->bindParam(":comissao_antiga", $produto->comissao_antiga);
        $db->bindParam(":comissao_nova", $produto->comissao_nova);

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

    private function checkProdutoExistsName($nome)
    {
        $query = "SELECT COUNT(*) FROM produtos WHERE nome = :nome";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nome', $nome);
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

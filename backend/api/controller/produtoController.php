<?php
include "../database.php"; // Importando database

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
        
        $sql = "INSERT INTO produtos(nome, comissaoA, comissaoB, horas_trabalhadas, descricao_produto) VALUES (:nome, :comissaoA, :comissaoB, :horas_trabalhadas, :descricao_produto)";
        
        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome", $produto->nome);
        $db->bindParam(":horas_trabalhadas", $produto->horas_trabalhadas);
        $db->bindParam(":comissaoA", $produto->comissaoA);
        $db->bindParam(":comissaoB", $produto->comissaoB);
        $db->bindParam(":descricao_produto", $produto->descricao_produto);
    
        if ($db->execute()) {
            $resposta = ["Mensagem" => "Produto Cadastrado com Sucesso!"];
        } else {
            $resposta = ["Mensagem" => "Erro ao cadastrar produto"];
        }
    
        return $resposta;

    }
 

    public function getProdutoById(int $id)
    {
        try {
            $sql = "SELECT * FROM produtos WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $produtos = $db->fetch(PDO::FETCH_ASSOC);
            return $produtos;
        } catch (\Exception $th) {
            echo "Erro ao buscar o produto: " . $th->getMessage();
            return null;
        }
    }
}

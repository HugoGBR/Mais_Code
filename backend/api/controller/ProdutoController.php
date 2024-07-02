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


    public function createNewProdutoRepeater($produto, $tipoCliente) {
        $sql = "INSERT INTO produtos(nome, horas_trabalhadas, descricao_produto, tipo_cliente_id) VALUES (:nome, :horas_trabalhadas, :descricao_produto, :tipo_cliente_id)";
    
        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome", $produto->nome);
        $db->bindParam(":horas_trabalhadas", $produto->horas_trabalhadas);
        $db->bindParam(":descricao_produto", $produto->descricao_produto);
        $db->bindParam(":tipo_cliente_id", $tipoCliente);
    
        if ($db->execute()) {
            $resposta = ["Mensagem" => "Produto Cadastrado com Sucesso!"];
        } else {
            $resposta = ["Mensagem" => "Erro ao cadastrar produto"];
        }
        return $resposta;
    }
    
    public function createNewProduto() {
        $produto = json_decode(file_get_contents("php://input"));
        $respostaA = $this->createNewProdutoRepeater($produto, $produto->tipo_cliente_idA);
        $respostaB = $this->createNewProdutoRepeater($produto, $produto->tipo_cliente_idB);
    
        return ["respostaA" => $respostaA, "respostaB" => $respostaB];
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
    public function getAllTiposClientes()
    {
        $sql = "SELECT * FROM tipo_cliente";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $produtos = $db->fetchAll(PDO::FETCH_ASSOC);
        return $produtos;
    }
}

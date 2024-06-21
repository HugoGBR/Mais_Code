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

<?php
include "../database.php"; // Importando database

class TipoClienteController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getAllTipoClienteController()
    {
        $sql = "SELECT * FROM tipo_cliente";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $tipo_cliente = $db->fetchAll(PDO::FETCH_ASSOC);
        return $tipo_cliente;
    }

    public function createNewTipoCliente()
    {
        $tipo_cliente = json_decode(file_get_contents("php://input"));

        $sql = "INSERT INTO tipo_cliente(nome, porcentagem) VALUES (:nome, :porcentagem)";

        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome", $tipo_cliente->nome);
        $db->bindParam(":porcentagem", $tipo_cliente->porcentagem);
     
        if ($db->execute()) {
            $resposta = ["Mensagem" => "Tipo Cliente Cadastrado com Sucessso!"];
        } else {
            $resposta = ["Mensagem" => "Erro ao cadastrar Tipo Cliente"];
        }
        return $resposta;
    }
}

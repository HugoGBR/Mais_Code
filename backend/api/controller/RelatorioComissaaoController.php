<?php
include "../database.php"; 

class RelatorioComissaoController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function gerarRelatorioComissao()
    {
        $sql = "SELECT Contrato.id, Cliente.nome as nome_cliente, Contrato.status, Contrato.parcelas, Contrato.valor, Contrato.comissao,
                TipoContrato.nome as tipo_contrato, Contrato.data
                FROM Contrato
                JOIN Cliente ON Cliente.id = Contrato.cliente_id
                JOIN Vendedor ON Vendedor.id = Contrato.vendedor_id
                JOIN TipoContrato ON TipoContrato.id = Contrato.tipo_contrato_id";

        $db = $this->conn->prepare($sql);
        $db->execute();

        $relatorioComissao = $db->fetchAll(PDO::FETCH_ASSOC);

        header("Content-Type: application/json");

        echo json_encode($relatorioComissao);
    }
}

$relatorioController = new RelatorioComissaoController();
$relatorioController->gerarRelatorioComissao();

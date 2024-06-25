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

    public function gerarRelatorioComissao(int $id)
    {
        $sql = "SELECT
        vendas.tipo_contrato_id,
        vendas.inicio_contrato,
        clientes.nome AS nome_cliente,
        tipo_contrato.nome AS nome_tipo_contrato,
        parcelas.numero_parcela,
        vendas.valor_total
    FROM
        vendas
    JOIN
    clientes ON vendas.cliente_id = clientes.id
    JOIN
    tipo_contrato ON vendas.tipo_contrato_id = tipo_contrato.id
    JOIN
    parcelas ON vendas.parcela_id = parcelas.id
    WHERE
        vendas.status IN ('concluido', 'em andamento')  
    ORDER BY
        vendas.inicio_contrato DESC
    LIMIT 0, 1000;";


        $db = $this->conn->prepare($sql);
        $db->bindParam(':id', $id);
        $db->execute();

        $relatorioComissao = $db->fetchAll(PDO::FETCH_ASSOC);

        return $relatorioComissao;
    }
}

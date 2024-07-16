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

    public function gerarRelatorioComissao($usuario_id)
    {
        $sql = "SELECT 
            vendas.id AS numero_contrato,
            vendas.inicio_contrato,
            clientes.nome AS nome_cliente,
            tipo_contrato.nome AS tipo_contrato,
            vendas.numero_parcela,
            vendas.valor_total,
            ROUND (vendas.status_cliente / 100 * vendas.valor_total, 2) AS comissao_produto
        FROM
            vendas
        JOIN
            clientes ON vendas.cliente_id = clientes.id
        JOIN
            produtos ON vendas.produto_id = produtos.id
        JOIN
            tipo_contrato ON vendas.tipo_contrato_id = tipo_contrato.id
        WHERE
            vendas.status = 'em andamento'
            AND vendas.usuario_id = :usuario_id"; 
    
        $db = $this->conn->prepare($sql);
        $db->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
        $db->execute();
    
        $relatorioComissao = $db->fetchAll(PDO::FETCH_ASSOC);
        return $relatorioComissao;
    }

    public function remuneracaoComissao($usuario_id)
    {
        $sql = "SELECT
        SUM(comissao_total)
        FROM bancocomissao
        WHERE user_id = :usuario_id AND (status = 2)
        ";
        $db = $this->conn->prepare($sql);
        $db->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
        $db->execute();

        $remuneracaoComissao = $db->fetchAll(PDO::FETCH_ASSOC);
        return $remuneracaoComissao;
    }
}

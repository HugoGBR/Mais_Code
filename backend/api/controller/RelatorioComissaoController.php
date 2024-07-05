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
        $sql = "SELECT 
            vendas.id AS numero_contrato,
            vendas.inicio_contrato,
            clientes.nome AS nome_cliente,
            tipo_contrato.nome AS tipo_contrato,
            vendas.numero_parcela,
            vendas.valor_total,
            produtos.comissao_antiga AS comissao_produtoA,
            produtos.comissao_nova AS comissao_produtoB
        FROM
            vendas
        JOIN
            clientes ON vendas.cliente_id = clientes.id
        JOIN
            produtos ON vendas.produto_id = produtos.id
        JOIN
            tipo_contrato ON vendas.tipo_contrato_id = tipo_contrato.id
        WHERE
            vendas.status = 'em andamento'"; 
    
        $db = $this->conn->prepare($sql);
        $db->execute();
    
        $relatorioComissao = $db->fetchAll(PDO::FETCH_ASSOC);
        return $relatorioComissao;
    }
}


            

   

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

    public function gerarRelatorioComissao($termoBusca = null)
    {

        
            $sql = "SELECT vendas.tipo_contrato_id,
                vendas.inicio_contrato,
                clientes.nome AS nome_cliente,
                vendas.status,
                vendas.parcela_id,
                vendas.valor_total,
                tipo_cliente.porcentagem
            FROM 
                vendas 
            JOIN 
                clientes ON vendas.cliente_id = clientes.id
            JOIN 
                produtos ON vendas.produto_id = produtos.id
            JOIN 
                tipo_cliente ON produtos.tipo_cliente_id = tipo_cliente.id;";

        $db = $this->conn->prepare($sql);
        $db->execute();
        $relatorioComissao = $db->fetchAll(PDO::FETCH_ASSOC);

        return $relatorioComissao;
    }
}

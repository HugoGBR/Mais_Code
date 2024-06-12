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
                clientes.nome as nome_cliente,
                tipo_contrato.nome,
                parcelas.numero_parcela,
                vendas.valor_total,
                tipo_cliente.porcentagem
            FROM
                vendas
            JOIN
                clientes ON vendas.cliente_id = clientes.id
            JOIN
                produtos ON vendas.produto_id = produtos.id
            JOIN
                tipo_cliente ON produtos.tipo_cliente_id = tipo_cliente.id
            JOIN
                tipo_contrato ON vendas.tipo_contrato_id = tipo_contrato.id
            JOIN
                parcelas ON vendas.parcela_id = parcelas.id
            WHERE
                vendas.usuario_id = :id";
        

            $db = $this->conn->prepare($sql);
            $db->bindParam(':id', $id);
            $db->execute();
        
            $relatorioComissao = $db->fetchAll(PDO::FETCH_ASSOC);
        
            return $relatorioComissao;
        }
}


            

   

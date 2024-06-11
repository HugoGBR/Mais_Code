<?php
include "../database.php";

class RelatorioController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function BuscaRelatorioVenda()
    {
        $sql = "SELECT 
        vendas.id,
        inicio_contrato,
        clientes.nome,
        vendas.valor_total,
        vendas.status,
        tipo_cliente.nome as Tipo_cliente_nome
        
    FROM 
        vendas
    JOIN 
        clientes ON vendas.cliente_id = clientes.id
    JOIN 
        produtos ON vendas.produto_id = produtos.id
    JOIN 
        tipo_cliente ON produtos.tipo_cliente_id = tipo_cliente.id
    JOIN 
        usuarios ON vendas.usuario_id = usuarios.id;";

        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }
}

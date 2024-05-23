<?php
include "../database.php"; //importando database

class RelatorioController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function BuscaRelatorio()
    {
        $sql = "SELECT 
        vendas.id,
        clientes.nome,
        clientes.email,
        produtos.nome as nome_P,
        vendas.valor_total,
        vendas.status,
        tipo_cliente.nome as Tipo_cliente_nome,
        usuarios.nome as nome_vendedor
    FROM 
        vendas
    join 
        clientes on vendas.cliente_id = clientes.id
    join        
        produtos on vendas.produto_id = produtos.id
    join
        tipo_cliente on produtos.tipo_cliente_id = tipo_cliente.id
    join
        tipo_contrato on vendas.tipo_contrato_id = tipo_contrato.id
    join
        parcelas on vendas.parcela_id = parcelas.id
    join
        usuarios on vendas.usuario_id = usuarios.id;";
        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }
}

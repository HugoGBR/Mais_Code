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

        vendas.id AS numero_contrato,
        vendas.inicio_contrato AS data_inicio, 
        vendas.final_contrato AS data_fim, 
        clientes.nome AS nome_cliente, 
        usuarios.nome AS nome_vendedor, 
        vendas.valor_total, vendas.status
        
        FROM vendas
        
        JOIN clientes ON vendas.cliente_id = clientes.id
        
        JOIN usuarios ON vendas.usuario_id = usuarios.id
        
        WHERE vendas.status IN ('concluido', 'em andamento',)
        
        ORDER BY vendas.inicio_contrato DESC
        
        LIMIT 0,1000;";

        $db = $this->conn->prepare($sql);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }
    public function BuscaRelatorioVendaByData()
    {

        $dados = json_decode(file_get_contents("php://input"));
        $sql = "SELECT 

        vendas.id AS numero_contrato,
        vendas.inicio_contrato AS data_inicio, 
        vendas.final_contrato AS data_fim, 
        clientes.nome AS nome_cliente, 
        usuarios.nome AS nome_vendedor, 
        vendas.valor_total, vendas.status
        
        FROM vendas
        
        JOIN clientes ON vendas.cliente_id = clientes.id
        
        JOIN usuarios ON vendas.usuario_id = usuarios.id
        
        WHERE vendas.status IN ('concluido', 'em andamento') AND MONTH(vendas.inicio_contrato) = MONTH(:data)
        
        ORDER BY vendas.inicio_contrato DESC
        
        LIMIT 0,1000;";

        $db = $this->conn->prepare($sql);
        $db->bindParam(":data", $dados->data);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }
    public function BuscaRelatorioVendaByYear()
    {

        $dados = json_decode(file_get_contents("php://input"));
        $sql = "SELECT 

        vendas.id AS numero_contrato,
        vendas.inicio_contrato AS data_inicio, 
        vendas.final_contrato AS data_fim, 
        clientes.nome AS nome_cliente, 
        usuarios.nome AS nome_vendedor, 
        vendas.valor_total, vendas.status
        
        FROM vendas
        
        JOIN clientes ON vendas.cliente_id = clientes.id
        
        JOIN usuarios ON vendas.usuario_id = usuarios.id
        
        WHERE vendas.status IN ('concluido', 'em andamento', 'cancelado ') AND YEAR(vendas.inicio_contrato) = YEAR(:data)
   
        ORDER BY vendas.inicio_contrato DESC
        
        LIMIT 0,1000;";

        $db = $this->conn->prepare($sql);
        $db->bindParam(":data", $dados->data);
        $db->execute();
        $users = $db->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }
}

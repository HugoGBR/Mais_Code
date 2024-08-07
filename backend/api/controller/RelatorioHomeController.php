<?php
include "../database.php"; //importando database

class RelatorioHomeController
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }

    public function getRelatorioHome()
    {
        $sql = "SELECT 
        vendas.id as NºContrato,
        inicio_contrato as Data_Venda,
        clientes.nome as Cliente,
        vendas.valor_total as Valor,
        vendas.status
    FROM 
        vendas
    join 
        clientes on vendas.cliente_id = clientes.id
    order by 
        vendas.inicio_contrato desc
    limit 4;";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $relatorio_home = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $relatorio_home;
    }

    public function getDadosGrafico()
    {
        $sql = "SELECT COUNT(id) as valor FROM vendas
        WHERE YEAR(inicio_contrato) = YEAR(SYSDATE())
        GROUP BY
            MONTH(inicio_contrato);";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $dados_grafico = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $dados_grafico;
    }
}
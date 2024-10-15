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
        $sql = "WITH meses AS (
            SELECT 1 AS mes, 'January' AS nome_mes UNION ALL
            SELECT 2 AS mes, 'February' UNION ALL
            SELECT 3 AS mes, 'March' UNION ALL
            SELECT 4 AS mes, 'April' UNION ALL
            SELECT 5 AS mes, 'May' UNION ALL
            SELECT 6 AS mes, 'June' UNION ALL
            SELECT 7 AS mes, 'July' UNION ALL
            SELECT 8 AS mes, 'August' UNION ALL
            SELECT 9 AS mes, 'September' UNION ALL
            SELECT 10 AS mes, 'October' UNION ALL
            SELECT 11 AS mes, 'November' UNION ALL
            SELECT 12 AS mes, 'December'
          )
          SELECT 
            COALESCE(COUNT(v.id), 0) AS valor
          FROM 
            meses
          LEFT JOIN 
            vendas v
            ON MONTH(v.inicio_contrato) = meses.mes 
            AND YEAR(v.inicio_contrato) = YEAR(SYSDATE())
          GROUP BY 
            meses.mes, meses.nome_mes
          ORDER BY 
            meses.mes;";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $dados_grafico = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $dados_grafico;
    }
}
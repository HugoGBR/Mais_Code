<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../controller/userFinanceiro.php';

$financeiro = new UserFinanceiro();

$acao = isset($_REQUEST["acao"]) ? $_REQUEST["acao"] : null;
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "getAllFinan":
        if ($id !== null) {
            echo "Ação 'getAllFinan' não aceita um ID";
        } else {
            $users = $financeiro->getAllFinan();
            echo json_encode($users); 
        }
        break;

    
        
    default:
        echo "Rota não encontrada";
}

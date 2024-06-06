<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../controller/RelatorioController.php';

$relatorioManager = new RelatorioController();

$acao = isset($_REQUEST["acao"]) ? $_REQUEST["acao"] : null;
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "BuscaRelatorio":
        if ($id !== null) {
            echo "Ação 'BuscaRelatorio' não aceita um ID";
        } else {
            $users = $relatorioManager->BuscaRelatorio();
            echo json_encode($users); 
        }
        break;
    default:
        echo "Rota não encontrada";
}

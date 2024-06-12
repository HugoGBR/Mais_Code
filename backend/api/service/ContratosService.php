<?php
include "../controller/ContratosController.php";

$ContratoController = new ContratosController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$acao = $_REQUEST["acao"];
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "getAllContratos":
        if ($id != null) {
            echo json_encode(["error" => "Ação GetAllContratos não aceita um ID"]);
        } else {
            $contratos = $ContratoController->getAllContratos();
            echo json_encode($contratos);
        }
        break;

    case "createNewContratos":
        if ($id != null) {
            echo json_encode(["error" => "Ação CreateNewContratos não aceita um ID"]);
        } else {

            $mensagem = $ContratosController->CreateNewContratos();
            echo json_encode($mensagem);
        }
        break;
    default:
        echo "Rota não encontrada";
}
?>
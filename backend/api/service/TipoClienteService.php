<?php
include "../controller/TipoClienteController.php";

$TipoClienteController = new TipoClienteController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$acao = $_REQUEST["acao"];
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "getAllTipoClienteService":
        if ($id != null) {
            echo json_encode(["error" => "Ação getAllTipoClienteController não aceita um ID"]);
        } else {
            $tipo_contrato = $TipoClienteController->getAllTipoClienteController();
            echo json_encode($tipo_contrato);
        }
        break;

    case "createNewTipoCliente":
        if ($id != null) {
            echo json_encode(["error" => "Ação createNewTipoCliente não aceita um ID"]);
        } else {
            $mensagem = $TipoClienteController->createNewTipoCliente();
            echo json_encode($mensagem);
        }
        break;
    default:
        echo "Rota não encontrada";
}
?>
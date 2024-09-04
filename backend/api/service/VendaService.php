<?php
include "../controller/VendaController.php";

$vendaController = new Vendacontroller();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$acao = isset($_REQUEST["acao"]) ? $_REQUEST["acao"] : null;
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "createNewSell":
        if ($id !== null) {
            echo json_encode(["error" => "Ação não suportada com ID"]);
        } else {
            $mensagem = $vendaController->createNewSell();
            echo json_encode($mensagem);
        }
        break;

    case "updateContratoByID":
        if ($id !== null) {
            $user = $vendaController->updateContratoByID($id);
            echo json_encode($user);
        } else {
            echo json_encode(["error" => "Ação updateContratoByID necessita de um ID"]);
        }
        break;

    case "getAllProductById":
        if ($id !== null) {
            $user = $vendaController->getAllProductById($id);
            echo json_encode($user);
        } else {
            echo json_encode(["error" => "Ação getAllProductById necessita de um ID"]);
        }
        break;

    case "GetVendaById":
        if ($id !== null) {
            $user = $vendaController->getVendaById($id);
            echo json_encode($user);
        } else {
            echo json_encode(["error" => "Ação GetVendaById necessita de um ID"]);
        }
        break;
    case "createNewlistParcelas":
        if ($id !== null) {
            echo json_encode(["error" => "Ação não suportada com ID"]);
        } else {
            $mensagem = $vendaController->createNewlistParcelas();
            echo json_encode($mensagem);
        }
        break;
    default:
        echo json_encode(["error" => "Rota não encontrada"]);
        break;
}

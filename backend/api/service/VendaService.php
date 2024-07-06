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
            echo "Ação nao suportada";
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
            echo json_encode(["error" => "Ação GetUserById necessita de um ID"]);
        }
        break;
    case "checkContratoExistsById":
            if ($id !== null) {
                $user = $vendaController->checkContratoExistsById($id);
                echo json_encode($user);
            } else {
                echo json_encode(["error" => "Ação checkContratoExistsById necessita de um ID"]);
            }
        break;
    
    case "GetVendaById":
        if ($id !== null) {
            $user = $vendaController->getVendaById($id);
            echo json_encode($user);
        } else {
            echo json_encode(["error" => "Ação checkContratoExistsById necessita de um ID"]);
        }
        break;
    
    default:
        echo "Rota não encontrada";
}


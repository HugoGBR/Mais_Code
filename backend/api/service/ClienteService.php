<?php
include_once "../controller/ClienteController.php";

$clienteController = new ClienteController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$acao = isset($_REQUEST["acao"]) ? $_REQUEST["acao"] : null;
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "getAllClient":
        if ($id != null) {
            echo json_encode(["error" => "Ação 'GetAllClient' não aceita um ID"]);
        } else {
            $response = $clienteController->getAllClient();
            echo json_encode($response);
        }
        break;

    case "createNewCliente":
        if ($id != null) {
            echo json_encode(["error" => "Ação 'createNewCliente' não aceita um ID"]);
        } else {
            $response = $clienteController->createNewCliente();
            echo json_encode($response);
        }
        break;        

    case "updateClientByID":
        if ($id != null) {
            $response = $clienteController->updateClientByID($id);
            echo json_encode($response);
        } else {
            echo json_encode(["error" => "Ação 'updateClientByID' necessita de um ID"]);
        }
        break;

    case "getClienteById":
        if ($id !== null) {
            $cliente = $clienteController->getClienteById($id);
            echo json_encode($cliente);
        } else {
            echo json_encode(["error" => "Ação GetClientById necessita de um ID"]);
        }
        break;
    

    default:
        echo json_encode(["error" => "Ação não suportada."]);
        break;
}
?>

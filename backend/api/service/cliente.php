<?php
include "../controller/clienteController.php";
include "../controller/userController.php";

$clienteController = new Clientecontroller();
$userController = new Usercontroller();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$acao = isset($_REQUEST["acao"]) ? $_REQUEST["acao"] : null;
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "updateClientByID":
        if ($id !== null) {
            $users = $clienteController->updateClientByID($id);
            echo json_encode($users);
        } else {
            echo "Ação 'updateClientByID' necessita de um ID";
        }
        break;


    case "createNewCliente":
        if ($id != null) {
            echo "Ação createNewCliente não aceitar um ID";
        } else {
            $mensagem = $clienteController->createNewCliente();
            echo json_encode($mensagem);
        }
        break;
    default:
        // Ação não suportada.
        return json_encode(["error" => "Ação não suportada."]);
//--ME
    case "GetAllClient":
        if ($id !== null) {
            echo "Ação 'GetAllClient' não aceita um ID";
        } else {
            $users = $userController->getAllUser();
            echo json_encode($users); // Saída em formato JSON
        }
        break;
//--
}


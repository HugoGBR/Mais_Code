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
        if ($id != null) {
            echo "Ação createNewSell não aceitar um ID";
        } else {
            $mensagem = $vendaController->createNewSell();
            echo json_encode($mensagem);
        }
        break;
    default:
        // Ação não suportada.
        return json_encode(["error" => "Ação não suportada."]);
//--ME
    case "getAllProductById":
        if ($id !== null) {
            $users = $vendaController->getAllProductById($id);
            echo json_encode($users); // Saída em formato JSON
        } else {
            echo "Ação 'GetAllProductById' não aceita um ID";
        }
        break;
//--
}
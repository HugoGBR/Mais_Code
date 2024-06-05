<?php
include "../controller/produtoController.php";

$produtoController = new ProdutoController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$acao = $_REQUEST["acao"];
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "getAllProduto":
        if ($id != null) {
            echo json_encode(["error" => "Ação GetAllProduto não aceita um ID"]);
        } else {
            $produtos = $produtoController->getAllProduto();
            echo json_encode($produtos);
        }
        break;

    case "getAllTipoCliente":
        if ($id != null) {
            echo json_encode(["error" => "Ação getAllTipoCliente não aceita um ID"]);
        } else {
            $tipo_cliente = $produtoController->getAllTipoCliente();
            echo json_encode($tipo_cliente);
        }
        break;


    case "createNewProduto":
        if ($id != null) {
            echo json_encode(["error" => "Ação CreateNewProduto não aceita um ID"]);
        } else {
            
            $mensagem = $produtoController->CreateNewProduto();
            echo json_encode($mensagem);
        }
        break;
}
?>
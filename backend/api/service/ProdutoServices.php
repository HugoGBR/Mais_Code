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

        case "getAllTiposClientes":
            if ($id != null) {
                echo json_encode(["error" => "Ação GetAllProduto não aceita um ID"]);
            } else {
                $tipoClientes = $produtoController->getAllTiposClientes();
                echo json_encode($tipoClientes);
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
    case "checkProdutoExistsName":
        if ($id !== null) {
            $user = $produtoController->checkProdutoExistsName($nome);
            echo json_encode($produto);
        } else {
            echo json_encode(["error" => "Ação checkProdutoExistsById necessita de um ID"]);
        }
        break;

    case "updateProdutoById":
        if ($id !== null) {
            $user = $produtoController->updateProdutoById($id);
            echo json_encode($user);
        } else {
            echo json_encode(["error" => "Ação updateProdutoById necessita de um ID"]);
        }
        break;
    case "getProdutoById":
        if ($id !== null) {
            $user = $produtoController->getProdutoById($id);
            echo json_encode($user);
        } else {
            echo json_encode(["error" => "Ação GetUserById necessita de um ID"]);
        }
        break;
    default:
        echo "Rota não encontrada";


}
?>
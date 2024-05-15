<?php
include "../controller/userControler.php";

$userController = new Usercontroller();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$acao = isset($_REQUEST["acao"]) ? $_REQUEST["acao"] : null;
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "getAllUsers":
        if ($id != null) {
            echo json_encode(["error" => "Ação GetAllUsers não aceita um ID"]);
        } else {
            $users = $userController->getAllUsers();
            echo json_encode($users);
        }
        break;


    case "CreateNewUser":
        if ($id !== null) {
            echo json_encode(["error" => "Ação CreateNewUser não aceita um ID"]);
        } else {
            $mensagem = $userController->CreateNewUser();
            echo json_encode($mensagem);
        }
        break;


    case "getUserById":
        if ($id !== null) {
            $user = $userController->getUserById($id);
            echo json_encode($user);
        } else {
            echo json_encode(["error" => "Ação getUserById necessita de um ID"]);
        }
        break;

    case "createNewUserGestao":
        if ($id !== null) {
            echo json_encode(["error" => "Ação createNewUserGestao não aceita um ID"]);
        } else {
            $mensagem = $userController->createNewUserGestao();
            echo json_encode($mensagem);
        }
        break;

    default:
        echo json_encode(["error" => "Ação não suportada."]);
        break;

    case "DeleteUserById":
        if ($id !== null) {
            $users = $userController->deleteUser($id);
            echo json_encode($users);
        } else {
            echo "Ação 'DeleteUserById' necessita de um ID";
        }
        break;

    case "UpdateUserById":
        if ($id !== null) {
            $users = $userController->updateUserById($id);
            echo json_encode($users);
        } else {
            echo "Ação 'UpdateUserById' necessita de um ID";
        }
        break;
    // Adicione outros casos conforme necessário para outras rotas
    default:
        echo "Rota não encontrada";
        break;
}



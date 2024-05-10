<?php
include "../controller/userController.php";

$userController = new UserController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$acao = $_REQUEST["acao"];

switch ($acao) {
    case "GetAllUsers":
        if ($id != null) {
            echo "Ação createNewUser não aceitar um ID";
        } else {
            $users = $userController->getAllUsers();
            echo json_encode($users);
        }
        break;

    case "CreateNewUsers":
        if ($id != null) {
            echo "Ação createNewUser não aceitar um ID";
        } else {
            $mensagem = $userController->CreateNewUser();
            echo json_encode($mensagem);
        }
        break;

    case "getUserById":
        if ($id != null) {
            $user = $userController->getUserById($id);
            echo json_encode($user);
        } else {
            echo "Ação getUseById necessita de um ID";
        }
        break;

    default:
        // Ação não suportada.
        return json_encode(["error" => "Ação não suportada."]);
}
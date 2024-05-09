<?php
include "../controller/userController.php";

$userController = new UserController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$acao = $_REQUEST["acao"];

switch ($acao){
    case "GetAllUsers": // ação desejada do endpoint
        $users = $userController->getAllUsers();
        echo json_encode($users);
        break; // <--- added semicolon
    
    case "CreateNewUsers":
        $mensagem = $userController->CreateNewUser(); // <--- fixed typo: $usersController -> $userController
        echo json_encode($mensagem);
        break; // <--- added semicolon
}
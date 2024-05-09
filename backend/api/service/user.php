<?php
include "../controller/userController.php";

$userController = new UserController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$acao = $_REQUEST["acao"];

switch ($acao){
    case "GetAllUsers":
        $users = $userController->getAllUsers();
        echo json_encode($users);
        break;
    
    case "CreateNewUsers":
        $mensagem = $userController->CreateNewUser(); 
        echo json_encode($mensagem);
        break; 
}
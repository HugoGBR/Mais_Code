<?php
include "../controller/userController.php";

$userController = new UserController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Verifica se a chave "acao" está definida em $_REQUEST
if(isset($_REQUEST["acao"])) {
    $acao = $_REQUEST["acao"];
    $id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

    switch ($acao) {
        case "getAllUsers":
            if ($id != null) {
                echo json_encode(["error" => "Ação GetAllUsers não aceita um ID"]);
            } else {
                $users = $userController->getAllUser();
                echo json_encode($users);
            }
            break;

        case "CreateNewUser":
            if ($id != null) {
                echo json_encode(["error" => "Ação CreateNewUser não aceita um ID"]);
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
                echo json_encode(["error" => "Ação getUserById necessita de um ID"]);
            }
            break;
        
        case "createNewUserGestao":
            if ($id != null) {
                echo json_encode(["error" => "Ação createNewUserGestao não aceita um ID"]);
            } else {
                $mensagem = $userController->createNewUserGestao();
                echo json_encode($mensagem);
            }
            break;
        
        default:
            echo json_encode(["error" => "Ação não suportada."]);
            break;
    }
} else {
    echo json_encode(["error" => "Ação não especificada."]);
}
?>

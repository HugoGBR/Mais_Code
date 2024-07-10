<?php
include "../controller/TipoContratoController.php";

$TipoContratoController = new TipoContratoController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$acao = $_REQUEST["acao"];
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;

switch ($acao) {
    case "getAllTipoContratoService":
        if ($id != null) {
            echo json_encode(["error" => "Ação getAllTipoContratoController não aceita um ID"]);
        } else {
            $tipo_contrato = $tipo_contrato->getAllTipoContratoController();
            echo json_encode($tipo_contrato);
        }
        break;
        case "getContratoById":
            if ($id !== null) {
                $user = $TipoContratoController->getContratoById($id);
                echo json_encode($user);
            } else {
                echo json_encode(["error" => "Ação getContratoById necessita de um ID"]);
            }
            break;

        case "updateContratoById":
            if ($id !== null) {
                $user = $TipoContratoController->updateContratoById($id);
                echo json_encode($user);
            } else {
                echo json_encode(["error" => "Ação updateContratoById necessita de um ID"]);
            }
            break;
    case "createNewTipoContrato":
        if ($id != null) {
            echo json_encode(["error" => "Ação createNewTipoContrato não aceita um ID"]);
        } else {

            $mensagem = $TipoContratoController->createNewTipoContrato();
            echo json_encode($mensagem);
        }
        break;
    default:
        echo "Rota não encontrada";


}
?>
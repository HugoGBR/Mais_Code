<?php

include "../controller/RelatorioComissaoController.php";

$relatorioController = new RelatorioComissaoController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$acao = isset($_REQUEST["acao"]) ? $_REQUEST["acao"] : null;
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;


switch ($acao) {
    case "gerarRelatorioComissao":
        $relatorio = $relatorioController->gerarRelatorioComissao($id);
        echo json_encode($relatorio);
        break;

    case "remuneracaoComissao":
        $relatorio = $relatorioController->remuneracaoComissao($id);
        echo json_encode($relatorio);
        break;

    default:
        echo json_encode(["error" => "Ação não suportada."]);
        break;
}
<?php

include "../controller/RelatorioComissaaoController.php";

$relatorioController = new RelatorioComissaoController();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$acao = isset($_REQUEST["acao"]) ? $_REQUEST["acao"] : null;
$termoBusca = isset($_REQUEST["termoBusca"]) ? $_REQUEST["termoBusca"] : null;

switch ($acao) {
    case "gerarRelatorioComissao":
        $relatorio = $relatorioController->gerarRelatorioComissao($termoBusca);
        echo json_encode($relatorio);
        break;

    default:
        echo json_encode(["error" => "Ação não suportada."]);
        break;
}
<?php

include "../controller/RelatorioComissaoController.php";

$relatorioController = new RelatorioComissaoController();

if ($_GET["acao"] === "gerarRelatorioComissao") {

    $relatorioComissao = $relatorioController->gerarRelatorioComissao();

    echo json_encode($relatorioComissao);
} else {
    echo json_encode(["error" => "Ação não reconhecida"]);
}

export async function  RelatorioComissaoController() {
    const response = await fetch("http://localhost/Mais_Code/Backend/api/service/relatorioComissao.php?acao=gerarRelatorioComissao");
    const dados = await response.json();
    console.log(dados);
    return dados;
}


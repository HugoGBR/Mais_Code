export async function fetchData() {
    try {
        const response = await fetch("http://localhost/Mais_Code/Backend/api/service/relatorioComissao.php?acao=gerarRelatorioComissao");
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados do relatório");
        }
        const jsonData = await response.json();
        console.log(jsonData)
        return(jsonData);

    } catch (error) {
        console.error("Erro:", error);
    }
}








// export async function  fetchData() {
//     const response = await fetch("http://localhost/Mais_Code/Backend/api/service/relatorioComissao.php?acao=gerarRelatorioComissao");
//     const dados = await response.json();
//     console.log(dados);
//     return dados;
// }


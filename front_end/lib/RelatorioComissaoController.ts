import {backendURL} from "./URLS/backendURL";

export async function fetchDataComissao(
    id: Number
) {
    try {
        const response = await fetch(`${backendURL()}/RelatorioComissaoServices.php?acao=gerarRelatorioComissao&id=${id}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados do relatório");
        }
        const jsonData = await response.json();
        console.log(jsonData)
        return (jsonData);

    } catch (error) {
        console.error("Erro:", error);
    }
}
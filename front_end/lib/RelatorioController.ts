import {backendURL} from "@/lib/URLS/backendURL";

export async function fetchData() {
    try {
        const response = await fetch(`${backendURL()}/RelatorioVendas.php?acao=BuscaRelatorio`);
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
import {backendURL} from "@/lib/URLS/backendURL";

export async function fetchRelatorio() {
    try {
        const response = await fetch(`${backendURL()}/RelatorioHomeService.php?acao=getRelatorioHome`);
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

export async function fetchDadosGrafico() {
    try {
        const response = await fetch(`${backendURL()}/RelatorioHomeService.php?acao=getDadosGrafico`);
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados do gráfico");
        }
        const jsonData = await response.json();
        console.log(jsonData)
        return (jsonData);
    } catch (error) {
        console.error("Erro:", error);
    }
}
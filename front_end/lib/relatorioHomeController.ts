export async function fetchRelatorio() {
    try {
        const response = await fetch("http://localhost/Mais_Code/backend/api/service/relatorioHome.php?acao=getRelatorioHome");
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



export async function fetchPodium() {
    try {
        const response = await fetch("http://localhost/Mais_Code/backend/api/service/relatorioHome.php?acao=getPodiumVendedor");
        if (!response.ok) {
            throw new Error("Erro ao buscar os dados do pódio");
        }
        const jsonData = await response.json();
        console.log(jsonData)
        return(jsonData);

    } catch (error) {
        console.error("Erro:", error);
    }
}
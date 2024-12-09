import { backendURL } from "./URLS/backendURL";

export async function createNewTipoCliente(
    newNome: string,
    newPorcentagem: number
) {
    try {
        const response = await fetch(
            `${backendURL()}/TipoClienteService.php?acao=createNewTipoCliente`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: newNome,
                    porcentagem: newPorcentagem,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao criar novo Tipo Cliente: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Erro ao criar novo Tipo Cliente:", error);
        throw error;
    }
}

export async function getAllTiposClientes() {
    try {
        const response = await fetch(
            `${backendURL()}/TipoClienteService.php?acao=getAllTipoClienteService`
        );

        if (!response.ok) {
            throw new Error(`Erro ao buscar Tipo Cliente: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar todos os Tipo Cliente:", error);
        throw error;
    }
}

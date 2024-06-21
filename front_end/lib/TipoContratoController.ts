// arquivo: produtoService.ts

import { backendURL } from "./URLS/backendURL";

export async function createNewTipoContrato(
    newNome: string
) {
    try {
        const response = await fetch(
            `${backendURL()}/TipoContratoService.php?acao=createNewTipoContrato`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: newNome,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao criar novo Tipo Contrato: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error("Erro ao criar novo Tipo Contrato:", error);
        throw error;
    }
}

export async function getAllTipoContrato() {
    try {
        const response = await fetch(
            `${backendURL()}/TipoContratoController.php?acao=getAllTipoContratoController`
        );

        if (!response.ok) {
            throw new Error(`Erro ao buscar Tipo Contrato: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar todos os Tipo Contrato:", error);
        throw error;
    }
}

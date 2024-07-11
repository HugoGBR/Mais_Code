import {backendURL} from "./URLS/backendURL";

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

export async function updateContratoById(
    newNome: string,
    paramsId: number
) {
    const request = await fetch(`${backendURL()}/TipoContratoService.php?acao=updateContratoById&id=${paramsId}`, {
        method: "POST",
        body: JSON.stringify({
                nome: newNome
            }
        )
    });
    const response = await request.json();
    return response.message;
}

export async function getContratoById(contratoID: number) {
    const response = await fetch(`${backendURL()}/TipoContratoService.php?acao=getContratoById&id=${contratoID}`);
    const dados = await response.json();
    return dados;
}

export async function getAllTipoContrato() {
    try {
        const response = await fetch(
            `${backendURL()}/TipoContratoService.php?acao=getAllTipoContratoController`
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

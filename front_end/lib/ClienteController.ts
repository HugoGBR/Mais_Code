import {backendURL} from "@/lib/URLS/backendURL";

export async function createNewCliente(newNome: string, newEmail: string, newCpf_cnpj: string, newTelefone: string) {
    const request = await fetch(`${backendURL()}/ClienteService.php?acao=createNewCliente`,
        {
            method: "POST",
            body: JSON.stringify({nome: newNome, email: newEmail, cpf_cnpj: newCpf_cnpj, telefone: newTelefone})
        });
    const response = await request.json();
    return response
}

export async function updateClientByID(newNome: string, newEmail: string, newTelefone: string, newCpf_cnpj: string, paramsId: number) {
    const request = await fetch(`${backendURL()}/ClienteService.php?acao=updateClientByID&id=${paramsId}`, {
        method: "POST",
        body: JSON.stringify({nome: newNome, email: newEmail, telefone: newTelefone, cpf_cnpj: newCpf_cnpj})
    });
    const response = await request.json();
    return response
}

export async function getAllClient() {
    const response = await fetch(`${backendURL()}/ClienteService.php?acao=getAllClient`);
    const dados = await response.json();
    return dados;
}

export async function getClienteById(clienteId: number) {
    const response = await fetch(`${backendURL()}/ClienteService.php?acao=getClienteById&id=${clienteId}`);
    const dados = await response.json();
    return dados;
}
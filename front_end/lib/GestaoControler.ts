import {backendURL} from "@/lib/URLS/backendURL";

export async function getAllClient() {
    const resposta = await fetch(`${backendURL()}/cliente.php?acao=getAllClient`);
    const dados = await resposta.json();
    return dados;
}


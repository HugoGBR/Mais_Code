import {backendURL} from "@/lib/URLS/backendURL";

export async function getAllFinan() {
    const resposta = await fetch(`${backendURL()}/FinanceiroService.php?acao=getAllFinan`)
    const dados = await resposta.json();
    return dados;
}
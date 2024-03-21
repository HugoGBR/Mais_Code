import {json} from "node:stream/consumers";

export async function getAllUsers() {
    const response = await fetch("/api/users")
    const dadosUsuario = await response.json();
    return dadosUsuario;
}

export async function createNewUser(mynome: string) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({nome: mynome})
    });
    const resultado = await response.json();
    return resultado.mensagem
}
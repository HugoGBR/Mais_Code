import {criarCookie} from "./coockie";
import {Cargos} from "./interfaces/dadosUsuarios";
import {backendURL} from "./URLS/backendURL";

export async function createNewUserGestao(
    newNome: string,
    newCargoid: number,
    newEmail: string,
    newSenha: string
) {
    const request = await fetch(`${backendURL()}/UserService.php?acao=createNewUserGestao`,
        {
            method: "POST",
            body: JSON.stringify({
                    nome: newNome,
                    cargo_id: newCargoid,
                    senha: newSenha,
                    email: newEmail
                }
            )
        });
    const response = await request.json();
    console.log(response)
    return response
}

export async function validacaoLogin(
    newEmail: string,
    newSenha: string
) {
    const request = await fetch(`${backendURL()}/UserService.php?acao=validacaoLogin`,
        {
            method: "POST",
            body: JSON.stringify({
                    email: newEmail,
                    senha: newSenha
                }
            )
        });
    const response = await request.json();
    if (response == 1)
        await criarCookie("CookiCriado");
    return response

}

export async function getAllUsers() {
    const resposta = await fetch(`${backendURL()}/UserService.php?acao=getAllUsers`)
    const dados = await resposta.json();
    return dados;
}

export function escolheTipoCliente(cargo_id: number) {
    switch (cargo_id) {
        case Cargos.Administrador:
            return "Administrador"
            break;
        case Cargos.Vendedor:
            return "Vendedor"
            break
        case Cargos.Financeiro:
            return "Financeiro"
            break
    }
}

export async function getUserById(userId: number) {
    const response = await fetch(`${backendURL()}/UserService.php?acao=GetUserById&id=${userId}`);
    const dados = await response.json();
    return dados;
}

export async function updateUser(
    newNome: string,
    newCargoid: number,
    newEmail: string,
    newSenha: string,
    paramsId: number
) {
    const request = await fetch(`${backendURL()}/UserService.php?acao=UpdateUserById&id=${paramsId}`, {
        method: "POST",
        body: JSON.stringify({
                nome: newNome,
                cargo_id: newCargoid,
                senha: newSenha,
                email: newEmail
            }
        )
    });
    const response = await request.json();
    return response.message;
}

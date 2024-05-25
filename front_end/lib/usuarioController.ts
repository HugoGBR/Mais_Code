import { Cargos } from "./interfaces/dadosUsuarios";

export async function createNewUserGestao(newNome: string, newCargoid: number, newEmail: string , newSenha:string) {
    const request = await fetch("http://localhost/Mais_code/backend/api/service/user.php?acao=createNewUserGestao",
        {
            method: "POST",
            body: JSON.stringify({ nome: newNome, cargo_id:newCargoid, senha:newSenha, email:newEmail })
        });

    const response = await request.json();
    console.log(response)

    return response.message

}
export async function getAllUsers(){
    const resposta = await fetch("http://localhost/Mais_code/backend/api/service/user.php?acao=getAllUsers")
    const dados = await resposta.json();
    return dados;
}

export function escolheTipoCliente(cargo_id:number){
    switch(cargo_id){
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

export async function createNewUserGestao(newNome: string, newEmail: string , newSenha:string) {
    const request = await fetch("http://localhost/Mais_code/backend/api/service/user.php?acao=createNewUserGestao",
        {
            method: "POST",
            body: JSON.stringify({ nome: newNome,senha:newSenha, email: newEmail })
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
export async function createNewUserGestao(newNome: string, newEmail: string , newSenha:string) {
    const request = await fetch("http://localhost/React/Backend/api/service/user.php?acao=CreateNewUserGestao",
        {
            method: "POST",
            body: JSON.stringify({ nome: newNome,senha:newSenha, email: newEmail })
        });

    const response = await request.json();
    console.log(response)

    return response.message
}

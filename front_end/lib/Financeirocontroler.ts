export async function getFinan(){
    const resposta = await fetch(" http://localhost/React/Backend/api/service/user.php?acao=getFinan")
    const dados=await resposta.json();
    return dados;
}
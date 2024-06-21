export async function  getAllClient() {
    const resposta = await fetch("http://localhost/Mais_code/backend/api/service/cliente.php?acao=getAllClient");
    const dados = await resposta.json();
    return dados;
}


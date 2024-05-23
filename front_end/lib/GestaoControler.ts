export async function  getAllClient() {
    const response = await fetch("http://localhost/Mais_code/backend/api/service/cliente.php?acao=GetAllClient");
    const dados = await response.json();
    console.log(dados);
    return dados;
}


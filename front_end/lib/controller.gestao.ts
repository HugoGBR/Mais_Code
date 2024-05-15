export async function  getAllUsers() {
    const response = await fetch("http://localhost/React/Backend/api/service/cliente.php?acao=GetAllUsers");
    const dados = await response.json();
    console.log(dados);
    return dados;
}


export async function getAllFinan(){
    const resposta = await fetch("http://localhost/Mais_Code/backend/api/service/financeiro.php?acao=getAllFinan")
    const dados = await resposta.json();
    return dados;
}
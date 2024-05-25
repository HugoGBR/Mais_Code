export async function createNewProduto(newNome: string, newTipo_Cliente: number , newHoras_Trabalhadas: number) {
    const request = await fetch("http://localhost/Mais_Code/backend/api/service/produto.php?acao=createNewProduto",
        {
            method: "POST",
            body: JSON.stringify({ nome: newNome, cliente: newTipo_Cliente, horas_trabalhadas: newHoras_Trabalhadas})
        });

    const response = await request.json();
    console.log(response)

    return response.message

}

export async function getAllPruduto(){
    const resposta = await fetch("http://localhost/Mais_Code/backend/api/service/produto.php?acao=getAllProduto")
    const dados = await resposta.json();
    return dados;
}
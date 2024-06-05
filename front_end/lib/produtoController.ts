export async function createNewProduto(
    newNome: string,
    newHoras_Trabalhadas: number,
    newDescricao_produto: string,
    valorComissaoA: number,
    valorComissaoB: number
  ) {
    const request = await fetch(
      "http://localhost/Mais_Code/backend/api/service/produto.php?acao=createNewProduto",
      {
        method: "POST",
        body: JSON.stringify({
          nome: newNome,
          horas_trabalhadas: newHoras_Trabalhadas,
          comissaoA: valorComissaoA,
          comissaoB: valorComissaoB,
          descricao_produto: newDescricao_produto
        }),
      }
    );
  
    const response = await request.json();
    console.log(response);
  
    return response;
  }
  
  export async function getAllProduto() {
    const resposta = await fetch(
      "http://localhost/Mais_Code/backend/api/service/produto.php?acao=getAllProduto"
    );
    const dados = await resposta.json();
    return dados;
  }
  
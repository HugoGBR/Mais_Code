import { backendURL } from "./URLS/backendURL";

export async function createNewContratos(
  newNome: string,
  newHoras_Trabalhadas: number,
  newDescricao_produto: string,
  valorComissaoA: number,
  valorComissaoB: number
) {
  try {
    const response = await fetch(
      `${backendURL()}/ProdutoServices.php?acao=createNewProduto`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: newNome,
          horas_trabalhadas: newHoras_Trabalhadas,
          comissaoA: valorComissaoA,
          comissaoB: valorComissaoB,
          descricao_produto: newDescricao_produto
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao criar novo produto: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Erro ao criar novo produto:", error);
    throw error;
  }
}

export async function getAllContratos() {
  try {
    const response = await fetch(
      `${backendURL()}/ContratosService.php?acao=getAllContratos`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar todos os produtos:", error);
    throw error;
  }
}
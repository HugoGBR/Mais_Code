import { backendURL } from "./URLS/backendURL";

export async function createNewProduto(
  newNome: string,
  newHoras_Trabalhadas: number,
  newDescricao_produto: string,
  newComissaoNovo: number,
  newComissaoAntigo: number
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
          descricao_produto: newDescricao_produto,
          comissaoNovo: newComissaoNovo,
          comissaoAntigo: newComissaoAntigo
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

export async function getAllProduto() {
  try {
    const response = await fetch(
      `${backendURL()}/ProdutoServices.php?acao=getAllProduto`
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
export async function getAllTiposClientes() {
  try {
    const response = await fetch(
      `${backendURL()}/ProdutoServices.php?acao=getAllTiposClientes`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar Tipo Cliente: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar todos os Tipo Cliente:", error);
    throw error;
  }
}

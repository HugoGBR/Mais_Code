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

    const data = JSON.parse(await response.json());
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
export async function checkProdutoExistsById(produtoId: number) {
  try {
    const response = await fetch(
      `${backendURL()}/ProdutoServices.php?acao=checkProdutoExistsById&id=${produtoId}`
    );

    if (!response.ok) {
      throw new Error(`Erro ao verificar produto: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao verificar o produto:", error);
    throw error;
  }
}

export async function updateProdutoById(
  newNome: string,
  newHorasTrabalhadas: number,
  newDescricaoProduto: string,
  newComissaoAntiga: string,
  newComissaoNova: string,
  paramsId: number
) {
  const request = await fetch(`${backendURL()}/ProdutoServices.php?acao=updateProdutoById&id=${paramsId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: newNome,
      horas_trabalhadas: newHorasTrabalhadas,
      descricao_produto: newDescricaoProduto,
      comissao_nova: newComissaoNova,
      comissao_antiga: newComissaoAntiga,

    })
  });

  if (!request.ok) {
    throw new Error(`Erro ao atualizar produto: ${request.statusText}`);
  }

  const response = await request.json();
  return response.message;
}

export async function getProdutoById(produtoId: number) {
  try {
    const response = await fetch(
      `${backendURL()}/ProdutoServices.php?acao=getProdutoById&id=${produtoId}`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar produto: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error;
  }
}


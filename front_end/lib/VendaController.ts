// Retorna os clientes 
export async function getAllClient() {
    const response = await fetch("http://localhost/Mais_code/backend/api/service/venda.php?acao=getAllClient");
    const dados = await response.json();
    console.log(dados);
    return dados;
}

// Retorna os users 
export async function getAllUsers() {
    const resposta = await fetch("http://localhost/Mais_code/backend/api/service/venda.php?acao=getAllUsers")
    const dados = await resposta.json();
    return dados;
}

// Retorna os produtos
export async function getAllProductById() {
    const resposta = await fetch("http://localhost/Mais_code/backend/api/service/venda.php?acao=getAllProductById")
    const dados = await resposta.json();
    return dados;
}

// Faz o insert
export async function createNewSell(
    new_cliente_id: number, new_tipo_contrato_id: number, new_parcela_id: number, new_produto_id: number, new_usuario_id: number,
    final_contrato: Date, valor_entrada: number, valor_total: number, inicio_contrato: Date, metodo_pagamento: number,
    email: string, telefone: string, nome_contato: string, status: undefined
) {
    const request = await fetch("http://localhost/Mais_code/backend/api/service/venda.php?acao=createNewSell", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cliente_id: new_cliente_id,
            tipo_contrato_id: new_tipo_contrato_id,
            parcela_id: new_parcela_id,
            produto_id: new_produto_id,
            usuario_id: new_usuario_id,
            final_contrato: final_contrato,
            valor_entrada: valor_entrada,
            valor_total: valor_total,
            inicio_contrato: inicio_contrato,
            metodo_pagamento: metodo_pagamento,
            email: email,
            telefone: telefone,
            nome_contato: nome_contato,
            status: status
        })
    });

    const response = await request.json();
    console.log(response);
    return response;
}
// teste só 
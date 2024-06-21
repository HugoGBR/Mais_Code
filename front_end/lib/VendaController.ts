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
    new_cliente_id: number,
    new_tipo_contrato_id: number,
    new_parcela_id: number,
    new_produto_id: number,
    new_usuario_id: number,
    final_contrato: Date,
    new_valor_entrada: number,
    new_valor_total: number,
    new_inicio_contrato: Date,
    new_metodo_pagamento: number,
    new_email: string,
    new_telefone: number,
    new_nome_contato: string
    
) {


    const request = await fetch("http://localhost/Mais_code/backend/api/service/venda.php?acao=createNewSell",
        {
            method: "POST",
            body: JSON.stringify({
                cliente_id: new_cliente_id,
                tipo_contrato_id: new_tipo_contrato_id,
                parcela_id: new_parcela_id,
                produto_id: new_produto_id,
                usuario_id: new_usuario_id,
                finalcontrato: final_contrato,
                valor_entrada: new_valor_entrada,
                valor_total: new_valor_total,
                inicio_contrato: new_inicio_contrato,
                metodo_pagamento: new_metodo_pagamento,
                email: new_email,
                telefone: new_telefone,
                nome_contato: new_nome_contato
                


            })
        });

    const response = await request.json();
    console.log(response)

    return response
}

// teste só 
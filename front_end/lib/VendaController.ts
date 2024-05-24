// Retorna os clientes 
export async function getAllClient() {
    const response = await fetch("http://localhost/Mais_code/backend/api/service/venda.php?acao=getAllClient");
    const dados = await response.json();
    console.log(dados);
    return dados;
}

// Reorna os users 
export async function getAllUsers(){
    const resposta = await fetch("http://localhost/Mais_code/backend/api/service/venda.php?acao=getAllUsers")
    const dados = await resposta.json();
    return dados;
}

// Retorna os produtos
export async function getAllProductById(){
    const resposta = await fetch("http://localhost/Mais_code/backend/api/service/venda.php?acao=getAllProductById")
    const dados = await resposta.json();
    return dados;
}

// Faz o insert
// export async function createNewSell(tipo_contrato_id: number, parcela_id: number, inicio_contrato: Date, final_contrato: Date, valor_entrada: number, valor_total: number, nome_contato: string, email: string, telefone: number, metodo_pagamento: number) {
//     const request = await fetch("http://localhost/Mais_code/backend/api/service/venda.php?acao=createNewSell",
//         {
//             method: "POST",
//             body: JSON.stringify({ contrato_id: tipo_contrato_id, email: newEmail, telefone: newTelefone,cpf_cnpj: newCpf_cnpj  })
//         });

//     const response = await request.json();
//     console.log(response)

//     return response
// }
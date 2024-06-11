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


    inicio_contrato: Date,
    final_contrato: Date,
    nome_contato: string,
    telefone: number,
    email: string,
    metodo_pagamento: number
) {

    // await createNewSell(datadoinicio, datadofim, NomeContato, Number(TelefoneContato), EmailContato, Number(ValorEntrada))

    const request = await fetch("http://localhost/Mais_code/backend/api/service/venda.php?acao=createNewSell",
        {
            method: "POST",
            body: JSON.stringify({
                iniciocontrato: inicio_contrato,
                finalcontrato: final_contrato,
                nomedocontato: nome_contato,
                newtelefone: telefone,
                newemail: email,
                new_metodo_pagamento: metodo_pagamento
            })
        });

    const response = await request.json();
    console.log(response)

    return response
}
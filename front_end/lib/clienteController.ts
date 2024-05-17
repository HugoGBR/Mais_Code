export async function createNewCliente(newNome: string, newEmail: string , newTelefone:string, newCpf_cnpj:string) {
    const request = await fetch("http://localhost/Mais_code/backend/api/service/cliente.php?acao=createNewCliente",
        {
            method: "POST",
            body: JSON.stringify({ nome: newNome,email: newEmail, telefone: newTelefone,cpf_cnpj: newCpf_cnpj  })
        });

    const response = await request.json();
    console.log(response)

    return response
}

export async function updateClientByID(newNome: string, newEmail: string , newTelefone:string, newCpf_cnpj:string) {
    const request = await fetch("http://localhost/Mais_code/backend/api/service/cliente.php?acao=updateClientByID",
        {
            method: "POST",
            body: JSON.stringify({ nome: newNome,email: newEmail, telefone: newTelefone,cpf_cnpj: newCpf_cnpj  })
        });

    const response = await request.json();
    console.log(response)

    return response
    
}


export async function getAllClient() {
    const response = await fetch("http://localhost/Mais_code/backend/api/service/cliente.php?acao=getAllClient");
    const dados = await response.json();
    console.log(dados);
    return dados;
}


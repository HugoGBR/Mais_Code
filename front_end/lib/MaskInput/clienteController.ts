export async function createNewCliente(newNome: string, newEndereco: string , newTelefone:string, newCpf_cnpj:string) {
    const request = await fetch("http://localhost/React/Backend/api/service/user.php?acao=CreateNewCliente",
        {
            method: "POST",
            body: JSON.stringify({ nome: newNome,endereco:newEndereco, telefone: newTelefone, cpf_cnpj: newCpf_cnpj })
        });

    const response = await request.json();
    console.log(response)

    return response.message
}
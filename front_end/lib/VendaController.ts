import { backendURL } from "@/lib/URLS/backendURL";

// Retorna os clientes 
export async function getAllClient() {
    const response = await fetch(`${backendURL()}/VendaService.php?acao=getAllClient`);
    const dados = await response.json();
    console.log(dados);
    return dados;
}

// Retorna os users
export async function getAllUsers() {
    const resposta = await fetch(`${backendURL()}/VendaService.php?acao=getAllUsers`)
    const dados = await resposta.json();
    return dados;
}

// Retorna os produtos
export async function getAllProductById() {
    const resposta = await fetch(`${backendURL()}/VendaService.php?acao=getAllProductById`)
    const dados = await resposta.json();
    return dados;
}

// Faz o insert
export async function createNewSell(
    new_cliente_id: number,
    new_tipo_contrato_id: number,
    new_produto_id: number,
    new_usuario_id: number,
    newstatus_cliente: number,
    newhoras_trabalhadas: number,
    final_contrato: Date,
    valor_entrada: number,
    valor_total: number,
    inicio_contrato: Date,
    newmetodo_pagamento: string,
    email: string,
    telefone: string,
    nome_contato: string,
    newnumero_parcela: Number,
    new_status: number
) {
    try {
        const response = await fetch(`${backendURL()}/VendaService.php?acao=createNewSell`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cliente_id: new_cliente_id,
                tipo_contrato_id: new_tipo_contrato_id,
                produto_id: new_produto_id,
                usuario_id: new_usuario_id,
                status_cliente: newstatus_cliente,
                horas_trabalhadas: newhoras_trabalhadas,
                final_contrato: final_contrato,
                valor_entrada: valor_entrada,
                valor_total: valor_total,
                inicio_contrato: inicio_contrato,
                metodo_pagamento: newmetodo_pagamento,
                email: email,
                telefone: telefone,
                nome_contato: nome_contato,
                numero_parcela: newnumero_parcela,
                status: new_status
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export async function getVendaById(vendaId: Number) {
    try {
        const response = await fetch(`${backendURL()}/VendaService.php?acao=GetVendaById&id=${vendaId}`);
        const dados = await response.json();
        return dados;
    } catch (error) {
        console.error('Erro ao buscar venda por ID:', error);
        return null;
    }
}

export async function updateVenda(
    clienteId: number,
    tipoContratoId: number,
    produtoId: number,
    usuarioId: number,
    statusCliente: string,
    inicioContrato: string,
    finalContrato: string,
    valorEntrada: number,
    valorTotal: number,
    nomeContato: string,
    email: string,
    telefone: string,
    metodoPagamento: string,
    numeroParcela: Number,
    status: string,
    vendaId: number
) {
    try {
        const request = await fetch(`${backendURL()}/VendaService.php?acao=UpdateVendaById&id=${vendaId}`, {
            method: "POST",
            body: JSON.stringify({
                cliente_id: clienteId,
                tipo_contrato_id: tipoContratoId,
                produto_id: produtoId,
                usuario_id: usuarioId,
                status_cliente: statusCliente,
                inicio_contrato: inicioContrato,
                final_contrato: finalContrato,
                valor_entrada: valorEntrada,
                valor_total: valorTotal,
                nome_contato: nomeContato,
                email: email,
                telefone: telefone,
                metodo_pagamento: metodoPagamento,
                numero_parcela: numeroParcela,
                status: status
            })
        });
        const response = await request.json();
        console.log(valorEntrada)
        return response.message;

    } catch (error) {
        console.error('Erro ao atualizar venda:', error);
        return 'Erro ao atualizar venda.';
    }


}

export async function createNewParcela(
    newid_venda: number,
    newtotal_parcela: number,
    newnumero_da_parcela: number,
    newvalor_da_parcela: number,
    statusparcela: number
) {
    try {
        const response = await fetch(`${backendURL()}/VendaService.php?acao=createNewlistParcelas`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_venda: newid_venda,
                total_parcela: newtotal_parcela,
                numero_da_parcela: newnumero_da_parcela,
                valor_da_parcela: newvalor_da_parcela,
                status: statusparcela
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Erro ao cadastrar parcela:', error);
        return { success: false, message: 'Erro ao cadastrar parcela' };
    }
}


export interface dadosUsuario {
    id: number,
    nome: string,
    senha: string,
    email: string,
    cargo_id: number
}
export enum Cargos{
    Administrador = 1,
    Vendedor = 2,
    Financeiro = 3
}
export interface DadosCargos{
  id: number,
  nome : string
}
export interface dadosCliente {
    id: number,
    nome: string,
    email:string,
    telefone:string,
    cpf_cnpj: string
}

export interface dadosContrato{
    id: number,
    nome: string
}

export interface Payment {
    nome: String
    comissaoA: number
    comissaoB: number
    horas_trabalhadas: number  
  }

  export interface dadosTipo_cliente{
    id: number,
    nome: string
  }


  export interface dadosModelo_contrato{
    id: number,
    nome: string
  }

  export interface dadosProduto{
    id: number,
    nome: string,
    horas_trabalhadas: number,
    comissao_antiga: number,
    comissao_nova: number
  }

  export interface dadosVenda{
    cpf_cnpj: string,
    data_inicio: Date,
    data_termino: Date,
    modelo_contrato: Number,
    horas_trabalhadas: Number,
    produtoID: Number,
    dados_contatoNome: string,
    dados_contatoTelefone: string,
    dados_contatoEmail: string,
    valor_entrada: Number,
    status_clienteID: number,
    metodo_pagamentoID: number,
    numero_parcela: string,
    valor_total: number     
  }

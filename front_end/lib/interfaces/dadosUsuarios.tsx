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
    id: Number,
    cliente_id: Number,
    tipo_contrato_id: number,
    modelo_contrato: Number,
    produto_id: Number,
    usuario_id: Number,
    status_cliente: Number,
    inicio_contrato: Date,
    final_contrato: Date,
    valor_entrada: Number,
    valor_total: number,
    nome_contato: string,
    email: string,
    telefone: string,
    metodo_pagamento: string,
    numero_parcela: string,
    status: number     
  }

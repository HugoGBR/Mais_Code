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
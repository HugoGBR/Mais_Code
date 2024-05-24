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
    cpf_cnpj: string,
};
// ME
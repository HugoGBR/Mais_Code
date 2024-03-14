'use client'
import React from "react";


interface Lista {
  id: number;
  nome: string;
  telefone: string;
  tipo_Pessoa: string;
  tipo_Cadastro: number;
}

const Lista = [
    {
      id: 1,
      nome: "Maria",
      telefone: "6799999999",
      tipo_Pessoa: "Pessoa Fisica",
      tipo_Cadastro: 1,
    },
    {
      id: 2,
      nome: "Gustavo",
      telefone: "67888888888",
      tipo_Pessoa: "Pessoa Juridica",
      tipo_Cadastro: 2,
    },
    {
      id: 3,
      nome: "Calebe",
      telefone: "67777777777",
      tipo_Pessoa: "Pessoa Fisica",
      tipo_Cadastro: 3,
    },
    {
      id: 4,
      nome: "Rosa",
      telefone: "674444444444",
      tipo_Pessoa: "Pessoa Juridica",
      tipo_Cadastro: 2,
    },
    {
      id: 5,
      nome: "Emilly",
      telefone: "67555555555",
      tipo_Pessoa: "Pessoa Fisica",
      tipo_Cadastro: 1,
    },
    {
      id: 6,
      nome: "Julia",
      telefone: "67333333333333",
      tipo_Pessoa: "Pessoa Juridica",
      tipo_Cadastro: 2,
    },
    {
      id: 7,
      nome: "Cris",
      telefone: "67111111111111",
      tipo_Pessoa: "Pessoa Fisica",
      tipo_Cadastro: 3,
    },
    {
      id: 8,
      nome: "Rafa",
      telefone: "679999999",
      tipo_Pessoa: "Pessoa Juridica",
      tipo_Cadastro: 3,
    },
  ];
  const getDados = async (id:number) => {
    const resposta = await (Lista[id])
    const dados = await resposta
    return dados
}

export default async function DetalheCadastro({params}: {params:{id:number}}) {
  const usuario = await getDados(params.id)
  
  return (
    <div>
        {JSON.stringify(usuario)}
    </div>
  )

}

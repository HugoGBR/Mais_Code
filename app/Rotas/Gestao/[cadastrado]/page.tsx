'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Cadastrado {
  id: number;
  nome: string;
  telefone: string;
  tipo_Pessoa: string;
  tipo_Cadastro: number;
}

export default function DetalheCadastro() {
  const [userData, setUserData] = useState<Cadastrado[]>([]);
  const navegation = useRouter();

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

  useEffect(() => {
    const getDados = async () => {
      // Simulando uma chamada assíncrona, você pode substituir por uma chamada à API real.
      const dados: Cadastrado[] = Lista;
      setUserData(dados);
    };

    getDados();
  }, []);

  return (
    <div>
      <h1>Detalhes do Cadastro</h1>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>
            <strong>ID:</strong> {user.id} <br />
            <strong>Nome:</strong> {user.nome} <br />
            <strong>Telefone:</strong> {user.telefone} <br />
            <strong>Tipo de Pessoa:</strong> {user.tipo_Pessoa} <br />
            <strong>Tipo de Cadastro:</strong> {user.tipo_Cadastro} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

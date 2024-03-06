"use client";

import React, {ReactNode} from 'react';
import {Tabs, TabsContent, TabsList} from '@/components/ui/tabs';
import {TabsTrigger} from '@radix-ui/react-tabs';
import CardUsuario from '@/components/CardUsuario';

export default function Gestao() {
  const Lista = [{

    id: 1,
    nome: "Maria",
    telefone: "6799999999",
    tipo_Pessoa: "Pessoa Fisica",
    tipo_Cadastro: 1
  },
    {
      id: 2,
      nome: "Gustavo",
      telefone: "67888888888",
      tipo_Pessoa: "Pessoa Juridica",
      tipo_Cadastro: 2
    },
    {
      id: 3,
      nome: "Calebe",
      telefone: "67777777777",
      tipo_Pessoa: "Pessoa Fisica",
      tipo_Cadastro: 3
    },
    {
      id: 4,
      nome: "Rosa",
      telefone: "674444444444",
      tipo_Pessoa: "Pessoa Juridica",
      tipo_Cadastro: 2
    },
    {
      id: 5,
      nome: "Emilly",
      telefone: "67555555555",
      tipo_Pessoa: "Pessoa Fisica",
      tipo_Cadastro: 1
    },
    {
      id: 6,
      nome: "Julia",
      telefone: "67333333333333",
      tipo_Pessoa: "Pessoa Juridica",
      tipo_Cadastro: 2
    },
    {
      id: 7,
      nome: "Cris",
      telefone: "67111111111111",
      tipo_Pessoa: "Pessoa Fisica",
      tipo_Cadastro: 3
    },
    {
      id: 8,
      nome: "Rafa",
      telefone: "679999999",
      tipo_Pessoa: "Pessoa Juridica",
      tipo_Cadastro: 3
    }
  ];

  const renderGestao = (tipo_Cadastro: number) => {
    return (
        <>
          {Lista
              .filter(item => item.tipo_Cadastro === tipo_Cadastro)
              .map(item => (
                  <div key={item.id} className='bg-gray-300 mb-4 rounded-lg'>
                    <div>
                      <CardUsuario dados={item}/>
                    </div>
                  </div>
              ))}
        </>
    );
  }


  return (
      <div className="items-center py-10">
          <div className='flex flex-col md:grid md:grid-cols-2 gap-5'>
            {Lista.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <CardUsuario dados={item}/>
            ))}
          </div>
      </div>
  )
}






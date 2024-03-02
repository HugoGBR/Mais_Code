// Adicione esta diretiva no topo para sinalizar que este é um componente do cliente
"use client";


import React, { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';
import CardUsuario from '@/components/ui/CardUsuario';

export default function Gestao(){
  const Lista = [{

    id: 1,
    nome: "Maria",
    telefone: "6799999999",
    tipo_Pessoa:"Pessoa Fisica",
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
    return(
      <>
      {Lista 
        .filter(item => item.tipo_Cadastro === tipo_Cadastro)
        .map(item => (
          <div key={item.id} className='bg-gray-300 mb-4 rounded-lg'>
            <div>
              <CardUsuario dados={item} />
            </div>
          </div>
        ))}
      </>
      );
    }




  return(
    <div className="items-center py-10">
      <Tabs defaultValue=''>
      <TabsList className='gap-5 will-change-contents'>
        <TabsTrigger value="Cliente">Cliente</TabsTrigger>
        <TabsTrigger value="Vendedor">Vendedor</TabsTrigger>
        <TabsTrigger value="Financeiro">Financeiro</TabsTrigger>
      </TabsList>

        <TabsContent value='' className='grid grid-cols-2 gap-5'>
        {Lista.map((item) => (
            <CardUsuario dados={item}/>
          
            ))} 


        </TabsContent>
      <TabsContent value='Cliente'>{renderGestao(1)}</TabsContent>
      <TabsContent value='Vendedor'>{renderGestao(2)}</TabsContent>
      <TabsContent value='Financeiro'>{renderGestao(3)}</TabsContent>
      </Tabs>      
    </div>

          
    )
  }
    





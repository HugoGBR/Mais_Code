"use client";

import React, {ReactNode} from 'react';
import {Tabs, TabsContent, TabsList} from '@/components/ui/tabs';
import {TabsTrigger} from '@radix-ui/react-tabs';
import CardUsuario from '@/app/Rotas/Financeiro/CardUsuario';
import {useRouter} from 'next/navigation';

export default function Gestao() {
    const Route = useRouter()
    const Rotanewuser = () => {
        Route.push('/Rotas/Gestao/Usuario')
    }
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
            <Tabs defaultValue=''>
                <TabsList className='will-change-contents flex justify-between'>
                    <div className='space-x-5'>
                        <TabsTrigger value="Cliente">Cliente</TabsTrigger>
                        <TabsTrigger value="Vendedor">Vendedor</TabsTrigger>
                        <TabsTrigger value="Financeiro">Financeiro</TabsTrigger>
                    </div>
                    <div>
                        <button type="button" id="Newuser"
                                className="text-white bg-blue-500 w-full p-1 rounded-md hover:bg-blue-600 cursor-pointer"
                                onClick={Rotanewuser}>Novo Usuario
                        </button>
                    </div>
                </TabsList>

                <TabsContent value='' className='flex flex-col md:grid md:grid-cols-2 gap-5'>
                    {Lista.map((item) => (
                        // eslint-disable-next-line react/jsx-key
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






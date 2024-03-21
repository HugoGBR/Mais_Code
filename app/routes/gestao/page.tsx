"use client";

import React, {useState} from 'react';
import {Tabs, TabsContent, TabsList} from '@/components/ui/tabs';
import {TabsTrigger} from '@radix-ui/react-tabs';
import CardUsuario from '@/components/CardUsuario';
import {useRouter} from 'next/navigation';
import {dadosUsuario} from "@/lib/interfaces/dadosUsuarios";


export default function Gestao() {
    const [Lista, setLista] = useState<dadosUsuario[]>([]);
    const [carregando, setCarregando] = useState(true);
    const Route = useRouter();
    const rotaNewUser = () => {
        Route.push('/routes/gestao/Usuario')
    }

    async function carregar() {
        fetch("/api/users").then(async function (response) {
            setLista(await response.json())
        }).finally(function () {
            setCarregando(false);
        })
    }

    React.useEffect(function () {
        carregar();
    }, []);
    console.log(Lista);

    const renderGestao = (tipo_Cadastro: number) => {
        return (
            <>
                {Lista
                    .filter(item => item.tipo_cadastro === tipo_Cadastro)
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
                                onClick={rotaNewUser}>Novo Usuario
                        </button>
                    </div>
                </TabsList>

                <TabsContent value='' className='flex flex-col md:grid md:grid-cols-2 space-x-4'>
                    {renderGestao(1)}
                </TabsContent>
                <TabsContent value='Cliente'
                             className='flex flex-col md:grid md:grid-cols-2 space-x-4'>{renderGestao(1)}</TabsContent>
                <TabsContent value='Vendedor'
                             className='flex flex-col md:grid md:grid-cols-2 space-x-4'>{renderGestao(2)}</TabsContent>
                <TabsContent value='Financeiro'
                             className='flex flex-col md:grid md:grid-cols-2 space-x-4'>{renderGestao(3)}</TabsContent>
            </Tabs>
        </div>
    )
}






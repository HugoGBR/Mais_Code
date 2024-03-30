"use client";

import React, {useState, useEffect} from 'react';
import {Tabs, TabsContent, TabsList} from '@/components/ui/tabs';
import {TabsTrigger} from '@radix-ui/react-tabs';
import CardUsuario from '@/components/CardUsuario';
import {dadosUsuario} from "@/lib/interfaces/dadosUsuarios";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Gestao() {
    const [listaUsuarios, setListaUsuarios] = useState<dadosUsuario[]>([]);
    const [carregando, setCarregando] = useState(true);
    const router = useRouter();

    const rotaNewUser = () => {
        router.push('/routes/gestao/Usuario');
    }

    async function carregarUsuarios() {
        try {
            const response = await fetch("/api/users");
            const data = await response.json();
            setListaUsuarios(data);
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const renderGestao = (tipoCadastro: number) => {
        return (
            <>
                {listaUsuarios
                    .filter(item => item.tipo_cadastro === tipoCadastro)
                    .map(item => (
                        <Link href={`/routes/gestao/users/${item.id}`} key={item.id}>
                            <div key={item.id} className='bg-gray-300 mb-4 rounded-lg'>
                                <a className="block">
                                    <CardUsuario dados={item}/>
                                </a>
                            </div>
                        </Link>
                    ))
                }
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
                <TabsContent value='Cliente' className='flex flex-col md:grid md:grid-cols-2 space-x-4'>
                    {renderGestao(1)}
                </TabsContent>
                <TabsContent value='Vendedor' className='flex flex-col md:grid md:grid-cols-2 space-x-4'>
                    {renderGestao(2)}
                </TabsContent>
                <TabsContent value='Financeiro' className='flex flex-col md:grid md:grid-cols-2 space-x-4'>
                    {renderGestao(3)}
                </TabsContent>
            </Tabs>
        </div>
    )
}

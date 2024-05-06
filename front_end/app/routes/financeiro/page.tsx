"use client";

import React, {useState, useEffect} from 'react';
import {Tabs, TabsContent, TabsList} from '@/components/ui/tabs';
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
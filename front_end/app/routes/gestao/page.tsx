"use client";

import React, {useState, useEffect} from 'react';
import {Tabs, TabsContent, TabsList} from '@/components/ui/tabs';
import {TabsTrigger} from '@radix-ui/react-tabs';
import CardUsuario from '@/components/CardUsuario';
import {dadosCliente, dadosUsuario} from "@/lib/interfaces/dadosUsuarios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {getAllClient} from '@/lib/GestaoControler';
import {getAllUsers} from '@/lib/UsuarioController';
import CardCliente from '@/components/CardClienteGestao';

export default function Gestao() {
    const [listaUsuarios, setListaUsuarios] = useState<dadosUsuario[]>([]);
    const [listaCliente, setListaCliente] = useState<dadosCliente[]>([]);
    const [carregando, setCarregando] = useState(true)
    const router = useRouter();

    const rotaNewUser = () => {
        router.push('/routes/gestao/Usuario');
    }

    async function carregarCliente() {
        try {
            const cliente = await getAllClient();
            console.log(cliente);
            if (Array.isArray(cliente)) {
                setListaCliente(cliente);
            } else {
                setListaCliente([]);
            }
        } catch (error) {
            console.error('Failed to load clients:', error);
            setListaCliente([]);
        }
    }

    async function carregarUsuarios() {
        try {
            const usuario = await getAllUsers();
            console.log(usuario);
            if (Array.isArray(usuario)) {
                setListaUsuarios(usuario);
            } else {
                setListaUsuarios([]);
            }
        } catch (error) {
            console.error('Failed to load users:', error);
            setListaUsuarios([]);
        }
    }

    useEffect(() => {
        carregarUsuarios();
        carregarCliente();
    }, []);

    const renderGestaoCliente = () => {
        if (!Array.isArray(listaCliente)) return null;
        return (
            <>
                {listaCliente.slice(0,8).map(client => (
                    <Link href={`/routes/gestao/cliente/${client.id}`} key={client.id}>
                        <div onClick={() => router.push(`/routes/gestao/cliente/${client.id}`)} key={client.id} className='bg-gray-300  rounded-lg flex-grow'>
                            <a className="block w-full">
                                <CardCliente dados={client} />  
                            </a>
                        </div>
                    </Link>
                ))}
            </>
        )
    }

    const renderGestao = (cargo_id: number) => {
        if (!Array.isArray(listaUsuarios)) return null;
        return (
            <>
                {listaUsuarios
                    .slice(0,8).filter(item => item.cargo_id == cargo_id)
                    .map(item => (
                        <Link href={`/routes/gestao/user/${item.id}`} key={item.id}>
                            <div onClick={() => router.push(`/routes/gestao/user/${item.id}`)} key={item.id} className='bg-gray-300  rounded-lg flex-grow'>
                                <a className="block w-full">
                                    <CardUsuario dados={item} />
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
            <Tabs defaultValue='Cliente'>
                <TabsList className='will-change-contents flex justify-between'>
                    <div className='space-x-5'>
                        <TabsTrigger value="Cliente">Cliente</TabsTrigger>
                        <TabsTrigger value="Administrador">Administrador</TabsTrigger>
                        <TabsTrigger value="Vendedor">Vendedor</TabsTrigger>
                        <TabsTrigger value="Financeiro">Financeiro</TabsTrigger>
                    </div>
                    <div>
                        <button
                            type="button"
                            id="Newuser"
                            className="text-white bg-blue-500 w-full p-1 rounded-md hover:bg-blue-600 cursor-pointer "
                            onClick={rotaNewUser}
                        >
                            Novo Usuario
                        </button>
                    </div>
                </TabsList>

                <TabsContent value='Cliente' className='flex flex-col md:grid md:grid-cols-2 gap-4'>
                    {renderGestaoCliente()}
                </TabsContent>
                <TabsContent value='Administrador' className='flex flex-col md:grid md:grid-cols-2 gap-4'>
                    {renderGestao(1)}
                </TabsContent>
                <TabsContent value='Vendedor' className='flex flex-col md:grid md:grid-cols-2 gap-4'>
                    {renderGestao(2)}
                </TabsContent>
                <TabsContent value='Financeiro' className='flex flex-col md:grid md:grid-cols-2 lg:grid-cols-2 gap-4'>
                    {renderGestao(3)}
                </TabsContent>
            </Tabs>
        </div>
       
    )


}

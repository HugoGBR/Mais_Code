"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';
import CardUsuario from '@/components/CardUsuario';
import { dadosCliente, dadosUsuario } from "@/lib/interfaces/dadosUsuarios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllClient } from '@/lib/GestaoControler';
import { getAllUsers } from '@/lib/UsuarioController';
import CardCliente from '@/components/CardClienteGestao';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function Gestao() {
    const [listaUsuarios, setListaUsuarios] = useState<dadosUsuario[]>([]);
    const [listaCliente, setListaCliente] = useState<dadosCliente[]>([]);
    const [carregando, setCarregando] = useState(true)
    const router = useRouter();
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 8;

    async function carregarUser() {
        try {
            const usuarios = await getAllClient();
            setListaUsuarios(usuarios);
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
        } finally {
            setCarregando(false);
        }
    }
    useEffect(() => {
        carregarUser();
    }, []);



    const PaginaAnterior = () => {
        setPaginaAtual(prevPage => Math.max(prevPage - 1, 1));
    }

    const ProximaPagina = () => {
        setPaginaAtual(prevPage => prevPage + 1);
    }

    const inicioIndex = (paginaAtual - 1) * itensPorPagina;
    const finalIndex = inicioIndex + itensPorPagina;


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

        const clienteInicioIndex = (paginaAtual - 1) * itensPorPagina;
        const clienteFinalIndex = Math.min(clienteInicioIndex + itensPorPagina, listaCliente.length);

        return (
            <>
                {listaCliente
                    .slice(clienteInicioIndex, clienteFinalIndex)
                    .map(client => (
                        <Link href={`/routes/gestao/users/${client.id}`} key={client.id}>
                            <div key={client.id}>
                                <a className="block">
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
        const usuarioInicioIndex = (paginaAtual - 1) * itensPorPagina;
        const usuarioFinalIndex = Math.min(usuarioInicioIndex + itensPorPagina, listaUsuarios.length);

        return (
            <>
                {listaUsuarios
                    .slice(usuarioInicioIndex, usuarioFinalIndex)
                    .filter(item => item.cargo_id == cargo_id)
                    .map(item => (
                        <Link href={`/routes/gestao/users/${item.id}`} key={item.id}>
                            <div key={item.id}>
                                <a className="block">
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
        <div className="">
            <div className=''>
                <Tabs defaultValue='Cliente'>
                    <TabsList className='will-change-contents flex justify-between'>
                        <div className='flex gap-3'>
                            <TabsTrigger className='focus:text-blue-500 hover:text-blue-500 focus:font-bold' value="Cliente">Cliente</TabsTrigger>
                            <TabsTrigger className='focus:text-blue-500 hover:text-blue-500 focus:font-bold' value="Vendedor">Vendedor</TabsTrigger>
                            <TabsTrigger className='focus:text-blue-500 hover:text-blue-500 focus:font-bold' value="Financeiro">Financeiro</TabsTrigger>
                        </div>
                        <div>
                            {
                                <button type="button" id="Newuser"
                                    className="text-white bg-blue-500 w-auto p-1 rounded-md hover:bg-blue-600 cursor-pointer"
                                    onClick={rotaNewUser}>Novo Usuario
                                </button>
                            }
                        </div>
                    </TabsList>

                    <TabsContent value='Cliente' className='flex flex-col md:grid md:grid-cols-2 gap-3'>
                        {renderGestaoCliente()}
                    </TabsContent>
                    <TabsContent value='Vendedor' className='flex flex-col md:grid md:grid-cols-2 gap-3'>
                        {renderGestao(2)}
                    </TabsContent>
                    <TabsContent value='Financeiro' className='flex flex-col md:grid md:grid-cols-2 gap-3'>
                        {renderGestao(3)}
                    </TabsContent>
                </Tabs>
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem >
                        <PaginationPrevious onClick={PaginaAnterior} />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#">{paginaAtual}</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext onClick={ProximaPagina} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
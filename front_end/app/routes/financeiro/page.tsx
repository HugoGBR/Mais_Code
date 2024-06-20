"use client";

import React, {useState, useEffect} from 'react';
import {Tabs, TabsContent, TabsList} from '@/components/ui/tabs';
import CardUsuario from '@/components/CardUsuario';
import {dadosUsuario} from "@/lib/interfaces/dadosUsuarios";
import Link from "next/link";
<<<<<<< HEAD
import { getAllFinan } from '@/lib/Financeirocontroler';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {dadosUsuario} from "@/lib/interfaces/dadosUsuarios";
=======
import {useRouter} from "next/navigation";
>>>>>>> parent of 695c9b2 (Merge branch 'Produção')

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
<<<<<<< HEAD
        <div>
            <div className="md:grid md:grid-cols-2 space-x-3">
                {listaUsuarios.slice(inicioIndex, finalIndex).map(item => (
                    <Link href={`/routes/financeiro/${item.id}`} key={item.id}>
                        <div className='bg-gray-300 mb-4 rounded-lg' style={{ width: '100%' }}>
                            <a className="block">
                                <Cardfinanceiro dados={item} />
                            </a>
                        </div>
                    </Link>
                ))}
            </div>
           
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
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
=======
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
>>>>>>> parent of 695c9b2 (Merge branch 'Produção')
        </div>
    )
}

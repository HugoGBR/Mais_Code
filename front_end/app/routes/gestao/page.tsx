"use client"

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';
import CardUsuario from '@/components/CardUsuario';
import { dadosCliente, dadosUsuario } from "@/lib/interfaces/dadosUsuarios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllClient } from '@/lib/GestaoControler';
import { getAllUsers } from '@/lib/UsuarioController';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from '@/components/ui/use-toast';

export default function Gestao() {
    const [listaUsuarios, setListaUsuarios] = useState<dadosUsuario[]>([]);
    const [listaCliente, setListaCliente] = useState<dadosCliente[]>([]);
    const [carregando, setCarregando] = useState(true)
    const router = useRouter();
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [termoBusca, setTermoBusca] = useState("");
    const itensPorPagina = 8;

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
            toast({
                title: "Erro",
                description: "Erro ao cadastrar o usuário. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
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
            toast({
                title: "Erro",
                description: "Erro ao cadastrar o usuário. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
            
            setListaUsuarios([]);
        }
    }
    useEffect(() => {
        carregarUsuarios();
    }, []);

    const PaginaAnterior = () => {
        setPaginaAtual(prevPage => Math.max(prevPage - 1, 1));
    };

    const ProximaPagina = (lista: dadosUsuario[]) => {
        const totalPages = Math.ceil(lista.length / itensPorPagina);
        setPaginaAtual(prevPage => Math.min(prevPage + 1, totalPages));
    };
    const ProximaPaginac = (lista: dadosCliente[]) => {
        const totalPages = Math.ceil(lista.length / itensPorPagina);
        setPaginaAtual(prevPage => Math.min(prevPage + 1, totalPages));
    };


    const inicioIndex = (paginaAtual - 1) * itensPorPagina;
    const finalIndex = inicioIndex + itensPorPagina;

    const usuariosFiltrados = listaUsuarios.filter((usuario) => {
        const nomeCliente = usuario?.nome || "";
        const cargoUsuario = usuario?.cargo || "";

        return (
            termoBusca.trim() === "" ||
            nomeCliente.toLowerCase().includes(termoBusca.toLowerCase()) ||
            cargoUsuario.toLowerCase().includes(termoBusca.toLowerCase())
        );
    });

    const clienteFiltrado = listaCliente.filter((cliente) => {
        const nomeCliente = cliente?.nome || "";
        return (
            termoBusca.trim() === "" ||
            nomeCliente.toLowerCase().includes(termoBusca.toLowerCase())
        );
    });

    useEffect(() => {
        carregarUsuarios();
        carregarCliente();
    }, []);

    const renderGestaoCliente = () => {
        if (!Array.isArray(listaCliente)) return null;
        return (
            <>
                <div className='flex flex-col md:grid md:grid-cols-2 gap-1'>
                    {listaCliente.slice(inicioIndex, finalIndex).map(client => (
                        <Link href={`/routes/gestao/cliente/${client.id}`} key={client.id}>
                            <div onClick={() => router.push(`/routes/gestao/cliente/${client.id}`)} key={client.id} className='rounded-lg flex-grow'>
                                <a className="block w-full">
                                    <CardUsuario nome={client.nome} email={client.email} cargoId={4} />
                                </a>
                            </div>
                        </Link>
                    ))}
                </div>
                <div>
                    {listaCliente.length > itensPorPagina && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious className='cursor-pointer hover:text-blue-800' onClick={PaginaAnterior} />
                                </PaginationItem>
                                <PaginationItem>
                                    <h2>{paginaAtual}</h2>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext className='cursor-pointer hover:text-blue-800' onClick={() => ProximaPaginac(listaCliente)} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </>
        );
    }

    const renderGestao = (cargo_id: number) => {
        const listaUsuarioFiltrada = listaUsuarios.filter(item => item.cargo_id === cargo_id);
        if (!Array.isArray(listaUsuarios)) return null;
        return (
            <>
                <div className='mt-5 grid grid-cols-2 gap-2.5'>
                    {listaUsuarioFiltrada.slice(inicioIndex, finalIndex).map(item => (
                        <Link href={`/routes/gestao/user/${item.id}`} key={item.id} className='w-80 flex'>
                            <div onClick={() => router.push(`/routes/gestao/user/${item.id}`)} key={item.id}
                                className='rounded-lg flex-grow'>
                                <a className="block pb-1">
                                    <CardUsuario nome={item.nome} email={item.email} cargoId={item.cargo_id} />
                                </a>
                            </div>
                        </Link>
                    ))}
                </div>
                {listaUsuarioFiltrada.length > itensPorPagina && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious className='cursor-pointer hover:text-blue-800' onClick={PaginaAnterior} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">{paginaAtual}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext className='cursor-pointer hover:text-blue-800' onClick={() => ProximaPagina(listaUsuarioFiltrada)} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </>
        );
    }

    return (
        <div className="items-center py-10">
            <div className="flex items-center py-4 input-container">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={termoBusca}
                    onChange={(event) => setTermoBusca(event.target.value)}
                    className="max-w-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                />
            </div>

            <Tabs defaultValue='Administrador'>
                <TabsList className='will-change-contents flex justify-between gap-6'>
                    <div className='space-x-5'>
                        <TabsTrigger className='focus:text-blue-500 focus:font-bold hover:text-blue-500 hover:font-medium' value="Administrador">Administrador</TabsTrigger>
                        <TabsTrigger className='focus:text-blue-500 focus:font-bold hover:text-blue-500 hover:font-medium' value="Vendedor">Vendedor</TabsTrigger>
                        <TabsTrigger className='focus:text-blue-500 focus:font-bold hover:text-blue-500 hover:font-medium' value="Financeiro">Financeiro</TabsTrigger>
                        <TabsTrigger className='focus:text-blue-500 focus:font-bold hover:text-blue-500 hover:font-medium' value="Cliente">Cliente</TabsTrigger>
                    </div>
                    <div>
                        <button
                            type="button"
                            id="Newuser"
                            className="text-white bg-blue-500 w-full text-sm py-1 px-1 rounded-md hover:bg-blue-600 cursor-pointer "
                            onClick={rotaNewUser}
                        >
                            Novo Usuario
                        </button>
                    </div>
                </TabsList>

                {termoBusca ? (
                    <div className='grid grid-cols-2 gap-3'>
                        {usuariosFiltrados.slice(inicioIndex, finalIndex).map(item => (
                            <Link href={`/routes/gestao/user/${item.id}`} key={item.id} className='w-80 flex'>
                                <div onClick={() => router.push(`/routes/gestao/user/${item.id}`)} className='rounded-lg flex-grow'>
                                    <CardUsuario nome={item.nome} email={item.email} cargoId={item.cargo_id} />
                                </div>
                            </Link>
                        ))}

                        {clienteFiltrado.slice(inicioIndex, finalIndex).map(item => (
                            <Link href={`/routes/gestao/cliente/${item.id}`} key={item.id} className='w-80 flex'>
                                <div onClick={() => router.push(`/routes/gestao/cliente/${item.id}`)} className='rounded-lg flex-grow'>
                                    <CardUsuario nome={item.nome} email={item.email} cargoId={4} />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <>
                        <TabsContent value='Cliente'>
                            {renderGestaoCliente()}
                        </TabsContent>
                        <TabsContent value='Administrador'>
                            {renderGestao(1)}
                        </TabsContent>
                        <TabsContent value='Vendedor'>
                            {renderGestao(2)}
                        </TabsContent>
                        <TabsContent value='Financeiro'>
                            {renderGestao(3)}
                        </TabsContent>
                    </>
                )}
            </Tabs>
        </div >
    );
}

"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import CardUsuario from "@/components/CardUsuario";
import { dadosCliente, dadosUsuario } from "@/lib/interfaces/dadosUsuarios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllClient } from "@/lib/GestaoControler";
import { getAllUsers } from "@/lib/UsuarioController";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "@/components/ui/use-toast";

export default function Gestao() {
    const [listaUsuarios, setListaUsuarios] = useState<dadosUsuario[]>([]);
    const [listaCliente, setListaCliente] = useState<dadosCliente[]>([]);
    const [carregando, setCarregando] = useState(true);
    const router = useRouter();
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [termoBusca, setTermoBusca] = useState("");
    const [itensPorPagina, setItensPorPagina] = useState(9);  
    

    const rotaNewUser = () => {
        router.push("/routes/gestao/Usuario");
    };

    async function carregarCliente() {
        try {
            const cliente = await getAllClient();
            setListaCliente(Array.isArray(cliente) ? cliente : []);
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao carregar os clientes. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
            setListaCliente([]);
        }
    }

    async function carregarUsuarios() {
        try {
            const usuario = await getAllUsers();
            setListaUsuarios(Array.isArray(usuario) ? usuario : []);
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao carregar os usuários. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
            setListaUsuarios([]);
        }
    }

    useEffect(() => {
        carregarUsuarios();
        carregarCliente();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) { 
                setItensPorPagina(9);
            } else {
                setItensPorPagina(8);
            }
        };
    
        handleResize(); 
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
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
        return termoBusca.trim() === "" || nomeCliente.toLowerCase().includes(termoBusca.toLowerCase());
    });

    const renderGestaoCliente = () => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {listaCliente.slice(inicioIndex, finalIndex).map((client) => (
                    <Link href={`/routes/gestao/cliente/${client.id}`} key={client.id}>
                        <div
                            onClick={() => router.push(`/routes/gestao/cliente/${client.id}`)}
                            className="rounded-lg flex-grow"
                        >
                            <a className="block w-full">
                                <CardUsuario nome={client.nome} email={client.email} cargoId={4} />
                            </a>
                        </div>
                    </Link>
                ))}
            </div>
            {listaCliente.length > itensPorPagina && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className="cursor-pointer hover:text-blue-800"
                                onClick={PaginaAnterior}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <h2>{paginaAtual}</h2>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                className="cursor-pointer hover:text-blue-800"
                                onClick={() => ProximaPaginac(listaCliente)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );

    const renderGestao = (cargo_id: number) => {
        const listaUsuarioFiltrada = listaUsuarios.filter((item) => item.cargo_id === cargo_id);
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                    {listaUsuarioFiltrada.slice(inicioIndex, finalIndex).map((item) => (
                        <Link href={`/routes/gestao/user/${item.id}`} key={item.id}>
                            <div
                                onClick={() => router.push(`/routes/gestao/user/${item.id}`)}
                                className="rounded-lg flex-grow"
                            >
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
                                <PaginationPrevious
                                    className="cursor-pointer hover:text-blue-800"
                                    onClick={PaginaAnterior}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <h2>{paginaAtual}</h2>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    className="cursor-pointer hover:text-blue-800"
                                    onClick={() => ProximaPagina(listaUsuarioFiltrada)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </>
        );
    };

    return (
        <div className="w-full xl:w-8/12 mx-auto px-4 sm:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={termoBusca}
                    onChange={(event) => setTermoBusca(event.target.value)}
                    className="w-full sm:w-1/3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="button"
                    className="text-white bg-blue-500 w-full sm:w-auto text-sm py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={rotaNewUser}
                >
                    Novo Usuario
                </button>
            </div>

            <Tabs defaultValue="Administrador">
                <TabsList className="flex gap-3 justify-center md:justify-start mb-5">
                    <TabsTrigger value="Administrador">Administrador</TabsTrigger>
                    <TabsTrigger value="Vendedor">Vendedor</TabsTrigger>
                    <TabsTrigger value="Financeiro">Financeiro</TabsTrigger>
                    <TabsTrigger value="Cliente">Cliente</TabsTrigger>
                </TabsList>

                {termoBusca ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                        {usuariosFiltrados.slice(inicioIndex, finalIndex).map((item) => (
                            <Link href={`/routes/gestao/user/${item.id}`} key={item.id}>
                                <div onClick={() => router.push(`/routes/gestao/user/${item.id}`)} className="rounded-lg flex-grow">
                                    <CardUsuario nome={item.nome} email={item.email} cargoId={item.cargo_id} />
                                </div>
                            </Link>
                        ))}
                        {clienteFiltrado.slice(inicioIndex, finalIndex).map((item) => (
                            <Link href={`/routes/gestao/cliente/${item.id}`} key={item.id}>
                                <div onClick={() => router.push(`/routes/gestao/cliente/${item.id}`)} className="rounded-lg flex-grow">
                                    <CardUsuario nome={item.nome} email={item.email} cargoId={4} />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <>
                        <TabsContent value="Cliente">{renderGestaoCliente()}</TabsContent>
                        <TabsContent value="Administrador">{renderGestao(1)}</TabsContent>
                        <TabsContent value="Vendedor">{renderGestao(2)}</TabsContent>
                        <TabsContent value="Financeiro">{renderGestao(3)}</TabsContent>
                    </>
                )}
            </Tabs>
        </div>
    );
}

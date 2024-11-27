'use client'

import React, { useState, useEffect } from 'react';
import Cardfinanceiro from '@/components/Carduserfinanceiro';
import Link from "next/link";
import { getAllFinan } from '@/lib/FinanceiroController';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { dadosUsuario } from "@/lib/interfaces/dadosUsuarios";
import { toast } from '@/components/ui/use-toast';

export default function Financeiro() {
    const [listaUsuarios, setListaUsuarios] = useState<dadosUsuario[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [termoBusca, setTermoBusca] = useState('');
    const itensPorPagina = 8;

    async function carregarUsuarios() {
        try {
            const usuarios = await getAllFinan();
            setListaUsuarios(usuarios);
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao carregar usuários. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const PaginaAnterior = () => {
        setPaginaAtual((prevPage) => Math.max(prevPage - 1, 1));
    };

    const ProximaPagina = () => {
        const totalPages = Math.ceil(listaUsuarios.length / itensPorPagina);
        setPaginaAtual((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const inicioIndex = (paginaAtual - 1) * itensPorPagina;
    const finalIndex = inicioIndex + itensPorPagina;
    const usuariosFiltrados = listaUsuarios.filter((usuario) => {
        const nomeCliente = usuario?.nome_cliente || usuario?.nome || usuario?.cliente_nome || "";
        return nomeCliente.toLowerCase().includes(termoBusca.toLowerCase());
    });

    const mostrarPaginacao = usuariosFiltrados.length >= itensPorPagina;

    return (
        <div className="px-4 sm:px-8 lg:px-16 py-8 lg:w-8/12 mx-auto">
            {/* Campo de Pesquisa */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={termoBusca}
                    onChange={(event) => setTermoBusca(event.target.value)}
                    className="w-full sm:w-2/3 lg:w-1/3 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Lista de Usuários */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {usuariosFiltrados.slice(inicioIndex, finalIndex).map((item) => (
                    <Link href={`/routes/relatorio/${item.id}`} key={item.id}>
                        <div className="rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
                            <a className="block">
                                <Cardfinanceiro dados={item} />
                            </a>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Paginação */}
            {mostrarPaginacao && (
                <div className="flex justify-center mt-6">
                    <Pagination>
                        <PaginationContent className="flex items-center space-x-4">
                            <PaginationItem>
                                <PaginationPrevious
                                    className="cursor-pointer px-3 py-2 border rounded-md hover:bg-gray-100"
                                    onClick={PaginaAnterior}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <span className="text-sm font-bold">{paginaAtual}</span>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    className="cursor-pointer px-3 py-2 border rounded-md hover:bg-gray-100"
                                    onClick={ProximaPagina}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}

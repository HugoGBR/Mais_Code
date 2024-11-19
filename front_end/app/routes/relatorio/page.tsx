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
        setPaginaAtual(prevPage => Math.max(prevPage - 1, 1));
    };

    const ProximaPagina = () => {
        const totalPages = Math.ceil(listaUsuarios.length / itensPorPagina);
        setPaginaAtual(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const inicioIndex = (paginaAtual - 1) * itensPorPagina;
    const finalIndex = inicioIndex + itensPorPagina;
    const usuariosFiltrados = listaUsuarios.filter((usuario) => {
        const nomeCliente = usuario?.nome_cliente || usuario?.nome || usuario?.cliente_nome || "";
        return nomeCliente.toLowerCase().includes(termoBusca.toLowerCase());
    });

    const mostrarPaginacao = usuariosFiltrados.length >= itensPorPagina;

    return (
        <div>
            <div className="flex items-center py-4 input-container">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={termoBusca}
                    onChange={(event) => setTermoBusca(event.target.value)}
                    className="max-w-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className='grid grid-cols-2 gap-3'>
                {usuariosFiltrados.slice(inicioIndex, finalIndex).map(item => (
                    <Link href={`/routes/relatorio/${item.id}`} key={item.id}>
                        <div>
                            <a className="block">
                                <Cardfinanceiro dados={item} />
                            </a>
                        </div>
                    </Link>
                ))}
            </div>

            {mostrarPaginacao && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className='cursor-pointer hover:text-blue-800' onClick={PaginaAnterior} />
                        </PaginationItem>
                        <PaginationItem>
                            <h2>{paginaAtual}</h2>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext className='cursor-pointer hover:text-blue-800' onClick={ProximaPagina} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}

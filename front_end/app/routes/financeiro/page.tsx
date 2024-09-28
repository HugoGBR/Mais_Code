"use client";

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
import ValidarTela from '@/components/ValidarTela';


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
            console.error("Erro ao carregar usuários:", error);
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
    console.log(listaUsuarios)

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
                    <Link href={`/routes/financeiro/${item.id}`} key={item.id}>
                        <div>
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
                        <h2>{paginaAtual}</h2>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={ProximaPagina} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}


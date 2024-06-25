"use client";

import React, { useState, useEffect } from 'react';
import Cardfinanceiro from '@/components/Carduserfinanceiro';
import Link from "next/link";
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
import ValidarTela from '@/components/ValidarTela';

export default function Financeiro() {
    const [listaUsuarios, setListaUsuarios] = useState<dadosUsuario[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [paginaAtual, setPaginaAtual] = useState(1);
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

    return (
    
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
        </div>
    
       
    );
}

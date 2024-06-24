'use client'
import * as React from "react";
import { useEffect, useState } from "react";

import { ColumnsContrato } from "./TabelaContrato/ColumnsContrato";
import { ColumnsProdutos } from "./TableProdutos/ColumnsProdutos";
import { TableProduto } from "./TableProdutos/TableProduto";
import { TabelaContrato } from "./TabelaContrato/TabelaContrato";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/coockie";
import { getAllContratos } from "@/lib/ContratoController";
import { getAllProduto } from "@/lib/produtoController";
import ValidarTela from "@/components/ValidarTela";




export default function Ajuste() {
    const [data, setData] = useState({
        produtos: [],
        contratos: []
    });
    
    const getDados = async () => {
        try {
            const [produtos, contratos] = await Promise.all([
                getAllProduto(),
                getAllContratos()
            ]);
            setData({ produtos, contratos });
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    useEffect(() => {
        getDados();
    }, []);


    return (
        <ValidarTela>
            <div className="flex flex-col gap-3 md:flex md:flex-row">
                <div className="h-auto">
                    <TableProduto columns={ColumnsProdutos} data={data.produtos} />
                </div>
                <div className="gap-3 h-auto w-auto flex flex-col">
                    <TabelaContrato columns={ColumnsContrato} data={data.contratos} />
                </div>
            </div>
        </ValidarTela>

    )
}



function setIsCarregando(arg0: boolean) {
    throw new Error("Function not implemented.");
}




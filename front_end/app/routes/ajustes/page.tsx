'use client'
import * as React from "react";
import { useEffect, useState } from "react";

import { ColumnsContrato } from "./TabelaContrato/ColumnsContrato";
import { ColumnsProdutos } from "./TableProdutos/ColumnsProdutos";
import {getAllProduto} from "@/lib/produtoController";
import { TableProduto } from "./TableProdutos/TableProduto";
import { TabelaContrato } from "./TabelaContrato/TabelaContrato";
import { Cookie } from "next/font/google";
import { useRouter } from "next/router";
import { getCookie } from "@/lib/coockie";
import { useSearchParams } from "next/navigation";
import { getAllContratos } from "@/lib/ContratoController";

// export default function EXP(){
//     const searchParams = useSearchParams()
//     const [pagina, setPaginas] = useState(1);
//     const [itemPagina, setItemPagina] = useState(5);
//     const [bloqueado,setBloqueado] = useState(true)
//     const rota = useRouter()
// }
   



//     async function OCookie(){
//         const t = await getCookie()
//             setBloqueado(false)

//         if(t){

//         }else{
//             setBloqueado(true)
//             rota.push("/")
//     }

// }



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
        <div className="flex flex-col gap-3 md:flex md:flex-row">
            <div className="h-auto">
                <TableProduto columns={ColumnsProdutos} data={data.produtos} />
            </div>
            <div className="gap-3 h-auto w-auto flex flex-col">
                <TabelaContrato columns={ColumnsContrato} data={data.contratos} />
            </div>
        </div>
    )
}
// function setBloqueado(arg0: boolean) {
//     throw new Error("Function not implemented.");
// }


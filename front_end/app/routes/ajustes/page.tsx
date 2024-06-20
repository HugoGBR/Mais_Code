'use client'
import * as React from "react";
<<<<<<< HEAD
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


=======
import ListaProdutos from "@/app/routes/ajustes/ListaProdutos";
import ListaTipoCliente from "@/app/routes/ajustes/ListaTipoCliente";
import ListaTipoContrato from "@/app/routes/ajustes/ListaTipoContrato";
>>>>>>> parent of 695c9b2 (Merge branch 'Produção')

export default function Ajuste() {

    return (
        <div className="flex flex-col gap-3 md:flex md:flex-row">
            <div className="h-auto">
                <ListaProdutos/>
            </div>
            <div className="gap-3 h-auto w-auto flex flex-col">
                <ListaTipoCliente/>
                <ListaTipoContrato/>
            </div>
        </div>
    )
}

'use client'
import * as React from "react";
import { useEffect, useState } from "react";
import { TableProduto } from "./TableProdutos/TableProduto";
import { columns } from "./TableProdutos/Columns";
import { getAllProduto } from "@/lib/ProdutoController";


export default function Ajuste() {

    const [data, setData] = useState([]);

    const getDados = async () => {
        const Dados = await getAllProduto()
        setData(Dados)
    }
    useEffect(() => {
        getDados();
    }, []);

    return (
        <div className="flex flex-col gap-3 md:flex md:flex-row">
            <div className="h-auto">
                <TableProduto columns={columns} data={data} />
            </div>
            <div className="gap-3 h-auto w-auto flex flex-col">
                {/* <ListaTipoContrato/> */}
            </div>
        </div>
    )
}

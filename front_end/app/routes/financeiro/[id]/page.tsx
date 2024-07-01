"use client"
import * as React from "react"
import {columns} from "../TabelaComissao/columns"
import { useEffect, useState } from "react";

import { DataTableComissao } from "../TabelaComissao/data-table";
import { fetchDataComissao } from "@/lib/RelatorioComissaoController";


export default function Relatorio({ params }: { params: { id: Number } }) {
    const [data, setData] = useState([]);

    const getDados = async() => {
        const Dados = await fetchDataComissao(params.id)
        setData(Dados)
    }
    useEffect(() => {
        getDados();
    }, []
    );

    return (
        <div className="container mx-auto py-10">
            <DataTableComissao columns={columns} data={data} />
        </div>
    );
}

"use client"
import * as React from "react"
import {Payment, columns} from "../TabelaComissao/columns"
import { useEffect, useState } from "react";

import { DataTableComissao } from "../TabelaComissao/data-table";
import { fetchDataComissao } from "@/lib/relatorioComissaoController";


export default function Relatorio() {
    const [data, setData] = useState<Payment[]>([]);

    const getDados = async() => {
        const Dados = await fetchDataComissao()
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

"use client"
import * as React from "react"
import { Payment, columns } from "./Table/columns"
import { DataTable } from "./Table/data-table"
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/relatorioController";
import ValidarTela from "@/components/ValidarTela";

export default function Relatorio() {
    const [data, setData] = useState<Payment[]>([]);

    const getDados = async () => {
        console.log("test")
        const Dados = await fetchData()
        setData(Dados)
    }
    useEffect(() => {
        getDados();
    }, []);

    return (
       <ValidarTela>
         <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
       </ValidarTela>
    );
}

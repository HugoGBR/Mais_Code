"use client"
import * as React from "react"
import { Payment, columns } from "./Table/columns"
import { DataTable } from "./Table/data-table"
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/relatorioController";

export default function Relatorio() {
    const [data, setData] = useState<Payment[]>([]);

    const getDados = async () => {
        const Dados = await fetchData()
        setData(Dados)
    }
    useEffect(() => {
        getDados();
    }, []);

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}

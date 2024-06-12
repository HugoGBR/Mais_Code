"use client"
import * as React from "react"
import { useEffect, useState } from "react";
import { Payment, columns } from "@/app/routes/home/TableHome/columnsHome";
import { DataTable } from "@/app/routes/home/TableHome/data-tableHome";
import { fetchRelatorio } from "@/lib/relatorioHomeController";

export default function RelatorioHome() {
    const [data, setData] = useState<Payment[]>([]);

    const getDados = async () => {
        const Dados = await fetchRelatorio()
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

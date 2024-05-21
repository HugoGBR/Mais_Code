"use client"
import {fetchData} from "@/lib/relatorioComissaoController";
// import * as React from "react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {Payment, columns} from "./Table/columns";
import {DataTable} from "./Table/data-table";


export default function Relatorio() {
    const [data, setData] = useState<Payment[]>([]);

    const getDados = async() => {
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
  
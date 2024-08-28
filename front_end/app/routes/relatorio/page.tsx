"use client"
import * as React from "react"
import { Payment, columns } from "./Table/columns"
import { DataTable } from "./Table/data-table"
import { useEffect, useState } from "react";
import { GetDadosVendaByData, fetchData } from "@/lib/RelatorioController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Relatorio() {
    const [data, setData] = useState<Payment[]>([]);
    const hoje = new Date()
    var dataHojeFormatado = `${hoje.getFullYear()}-${((hoje.getMonth() + 1).toString().padStart(2, "0"))}`

    const [startDate, setStartDate] = useState(dataHojeFormatado);
    console.log(startDate)
    async function handleSubmit() {
        const Dados = await GetDadosVendaByData(new Date(startDate))
        setData(Dados)
    }


    const getDados = async () => {
        const Dados = await GetDadosVendaByData(hoje)
        setData(Dados)
    }
    useEffect(() => {
        getDados();
    }, []);

    return (
        
         <div>
            <div className="flex gap-5 items-center py-5 input-container">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    // value={(table.getColumn("nome_cliente")?.getFilterValue() as string) ?? ""}
                    // onChange={(event) =>
                    //     table.getColumn("nome_cliente")?.setFilterValue(event.target.value)
                    // }
                    className="max-w-sm border border-gray-300 rounded-md shadow-md shadow-gray-400 py-2 px-4 focus:outline-none focus:border-blue-500"
                />

                <div className="flex gap-2 border bg-white border-gray-300 rounded-md shadow-md shadow-gray-400 p-2 focus:outline-none focus:border-blue-500">
                    <input
                        type="month"
                        id="start"
                        name="start"
                        min="2018-03"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}  // Atualizando o estado quando o valor muda
                    />
                    <button
                        type="submit"
                        onClick={handleSubmit}
                    >
                        <FontAwesomeIcon icon={faSearch} className="text-[#122F54]" style={{ fontSize: '24px' }} />
                    </button>
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
       
    );
}

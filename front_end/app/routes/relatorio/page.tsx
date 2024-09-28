"use client"
import * as React from "react"
import { Payment, columns } from "./Table/columns"
import { DataTable } from "./Table/data-table"
import { useEffect, useState } from "react";
import { GetDadosVendaByData, GetDadosVendaByYear, fetchData } from "@/lib/RelatorioController";
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

    const getDadosYear = async () => {
        const Dados = await GetDadosVendaByYear(hoje)
        setData(Dados)
    }
    useEffect(() => {
        getDadosYear();
    }, []);


    const headers = [
        { label: "numero_contrato", key: "numero_contrato" },
        { label: "data_inicio", key: "data_inicio" },
        { label: "data_fim", key: "data_fim" },
        { label: "nome_cliente", key: "nome_cliente" },
        { label: "nome_vendedor", key: "nome_vendedor" }

    ];

    return (
<<<<<<< Updated upstream
=======
        
         <div>
            <div className="flex gap-5 items-center py-5 input-container">
>>>>>>> Stashed changes

        <div>
            <div className="flex gap-5 items-center py-5 input-container">
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg bg-white hover:shadow-lg px-4 py-2 transition-shadow duration-200">
                    <input
                        type="month"
                        id="start"
                        name="start"
                        min="2018-03"
                        value={startDate}
<<<<<<< Updated upstream
                        onChange={(event) => setStartDate(event.target.value)}
                        className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-gray-700"
=======
                        onChange={(event) => setStartDate(event.target.value)} 
>>>>>>> Stashed changes
                    />
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                    >
                        <FontAwesomeIcon icon={faSearch} className="text-xl" />
                    </button>
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}

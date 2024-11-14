'use client'
import * as React from "react"
import { columns } from "../TabelaComissao/columns"
import { useEffect, useState, useCallback } from "react";
import { DataTableComissao } from "../TabelaComissao/data-table";
import { fetchDataComissao, remuneracaoComissao } from "@/lib/RelatorioComissaoController";
import { CSVLink } from "react-csv";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function Relatorio({ params }: { params: { id: Number } }) {
    const [dados, setData] = useState([]);
    const [comissaoTotal, setComissaoTotal] = useState(0);

    const headers = [
        { label: "comissao_produto", key: "comissao_produto" },
        { label: "inicio_contrato", key: "inicio_contrato" },
        { label: "nome_cliente", key: "nome_cliente" },
        { label: "numero_contrato", key: "numero_contrato" },
        { label: "tipo_contrato", key: "tipo_contrato" },
        { label: "valor_total", key: "valor_total" }
    ];

    const getDados = useCallback(async () => {
        const Dados = await fetchDataComissao(params.id);
        setData(Dados);
    }, [params.id]);

    const carregarRemuneracao = useCallback(async () => {
        try {
            const remuneracao = await remuneracaoComissao(params.id);
            console.log(remuneracao);
            if (Array.isArray(remuneracao) && remuneracao.length > 0) {
                setComissaoTotal(parseFloat(remuneracao[0]["SUM(comissao_total)"]));
            } else {
                setComissaoTotal(0);
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Failed to load remuneracao. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
            setComissaoTotal(0);
        }
    }, [params.id]);

    useEffect(() => {
        carregarRemuneracao();
        getDados();
    }, [carregarRemuneracao, getDados]);

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-end pb-2">
                <CSVLink
                    data={dados}
                    headers={headers}
                    filename={"comissao.csv"}
                    separator={";"}
                    className="btn btn-primary"
                >
                    <Button className="hover:bg-blue-500 hover:text-white" variant="outline">
                        Exportar
                    </Button>
                </CSVLink>
                <div className='rounded-lg flex flex-col justify-end bg-white border hover:drop-shadow-lg py-2 px-4'>
                    <h1 className='text-center text-lg font-bold text-gray-700'>Remuneração do Mês</h1>
                    <p className='text-md text-left font-medium text-blue-500'>R${comissaoTotal.toFixed(2)}</p>
                </div>

            </div>
            <DataTableComissao columns={columns} data={dados} />
        </div>
    );
}
import React, { useEffect, useState, useCallback } from "react";
import Chart from "react-apexcharts"; // Adicione esta linha para importar o componente Chart
import { fetchDadosGrafico } from "@/lib/RelatorioHomeController";

interface DadoGrafico {
    valor: number;
}

export default function ApexAreaChart() {
    const [dadosGrafico, setDadosGrafico] = useState<DadoGrafico[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const dados: DadoGrafico[] = await fetchDadosGrafico();
            setDadosGrafico(dados);
        } catch (error) {
            console.error('Erro ao carregar os dados do gráfico:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const chartOptions = {
        series: [
            {
                name: "Vendas",
                data: dadosGrafico.map((item) => item.valor),
            },
        ],
        options: {
            chart: {
                type: "area" as const,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth" as const,
            },
            title: {
                text: "Vendas Mensal",
                align: "left" as const,
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"],
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: [
                    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                ],
            },
        },
    };

    if (loading) {
        return (
            <div className="w-full h-auto bg-white p-4 border rounded-xl flex justify-center items-center">
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-auto bg-white p-4 border hover:drop-shadow-lg rounded-xl">
            {dadosGrafico.length > 0 ? (
                <Chart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type="area"
                    height={250}
                />
            ) : (
                <p className="text-center">Nenhum dado disponível para exibir.</p>
            )}
        </div>
    );
}

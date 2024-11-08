import { fetchDadosGrafico } from "@/lib/RelatorioHomeController";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

interface DadoGrafico {
    valor: number;
}

export default function ApexAreaChart() {
    const [dadosGrafico, setDadosGrafico] = useState<DadoGrafico[]>([]);

    const fetchData = async () => {
        const dados: DadoGrafico[] = await fetchDadosGrafico();
        setDadosGrafico(dados);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const data = {
        series: [
            {
                name: "Vendas",
                data: dadosGrafico.map((item) => item.valor),
            },
        ],
        options: {
            chart: {
                type: "area" as "area",
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
                curve: "smooth" as "smooth",
            },
            title: {
                text: "Vendas Mensal",
                align: "left" as "left",
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"],
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: [
                    "Janeiro",
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro",
                ],
            },
        },
    };

    return (
        <div className="w-full h-auto bg-white p-4 border hover:drop-shadow-lg rounded-xl grid grid-cols-1 items-center">
            <Chart
                options={data.options}
                series={data.series}
                type="area"
                height={250}
            />
        </div>
    );
}

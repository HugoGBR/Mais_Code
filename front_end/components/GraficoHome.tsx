import { fetchDadosGrafico } from "@/lib/RelatorioHomeController";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";


export default function ApexAreaChart() { // Verifique se ButtonProps é necessário
    const [dadosGrafico, setDadosGrafico] = useState([])


    const fetchData = async () => {
        const dados = await fetchDadosGrafico();
        setDadosGrafico(dados)

    };


    useEffect(() => {

        fetchData()

    }, [])

    const data = {
        series: [
            {
                name: "Vendas",
                data: dadosGrafico.map(item => (
                    item.valor
                )),
            },
        ],
        options: {
            chart: {
                type: "area",
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false, // Desabilita o menu de opções
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
            title: {
                text: "Vendas Mensal",
                align: "left",
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
        <div className='w-full h-auto bg-white p-4 drop-shadow-xl rounded-xl grid grid-cols-1 items-center'>
            <Chart
                options={data.options}
                series={data.series}
                type="area"
                height={250}
            />
        </div>
    );
}

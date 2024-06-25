import React from "react";
import Chart from "react-apexcharts"; // Certifique-se de que a dependência está instalada corretamente
import {ButtonProps} from "@/components/ui/button"; // Verifique se você realmente precisa de ButtonProps

const data = {
    series: [
        {
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
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
            text: "Ultimas Vendas",
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
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
            ],
        },
    },
};

export default function ApexAreaChart() { // Verifique se ButtonProps é necessário
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

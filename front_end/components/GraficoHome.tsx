import React from "react";
import Chart from "react-apexcharts";
import {ButtonProps} from "@/components/ui/button";

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
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        title: {
            text: "Product Trends by Month",
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

export default function ApexAreaChart(props: ButtonProps) {
    return (
        <>
            <div className='w-full h-auto bg-white p-4 drop-shadow-xl rounded-xl grid grid-cols-1 items-center'>
                <Chart
                    options={data.options}
                    series={data.series}
                    type="area"
                    height={250}
                />
            </div>
        </>
    );
}
'use client'
import React from 'react';
import RelatorioHome from '@/components/relatorioHome';
import { Chart } from 'react-google-charts';


export const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];

export const options = {
    chart: {
        title: "Company Performance",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
};

export default function HomePage() {
    return (

        <div className="bg-gray-100 items-center gap-6 w-9/12 -mt-5 flex flex-col ">
            <div className=' w-full bg-yellow-400 sm:flex flex-col md:flex md:justify-between md:items-center mb-3'>
                <div className='col-span-6'>
                    <h1 className='text-2xl font-semibold min-[320px]:hidden max-[600px]:hidden lg:inline-block'>Bem Vindo, Calebe</h1>
                    <p className='min-[320px]:hidden max-[600px]:hidden lg:block'>Ficamos felizes em vê-lo novamente</p>
                </div>

                <div className='rounded-xl bg-white drop-shadow-xl p-2 col-span-2'>
                    <h3 className='text-center text-lg'>Remuneraçao</h3>
                    <h1 className='text-4xl text-center font-bold  '>R$5000,00</h1>
                </div>
            </div>

            <div className='h-auto w-full bg-gray-100 space-y-3'>
                <div className='h-auto w-full drop-shadow-xl rounded-xl grid grid-cols-1 items-center'>
                    <Chart
                        chartType="Bar"
                        width="80%"
                        height="400px"
                        data={data}
                        options={options}
                    />
                </div>

                <div className='rounded-xl bg-white drop-shadow-xl text-center overflow-y-auto pt-5 h-auto'>
                    <h1 className='flex justify-center'>Últimas Vendas</h1>
                    <div className='max-h-72 w-full'>
                        <RelatorioHome />
                    </div>

                </div>
            </div>



        </div>
    )
};


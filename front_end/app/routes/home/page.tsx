'use client'
import React from 'react';
import RelatorioHome from '@/components/relatorioHome';
import ApexAreaChart from "@/components/GraficoHome";
import CardSalarioHome from "@/components/CardSalarioHome";


export default function HomePage() {
    return (
        <div className="flex flex-col bg-gray-100 items-center justify-center w-8/12">
            <div className=' w-full sm:flex md:justify-between md:items-center mb-3'>
                <CardSalarioHome/>
            </div>

            <div className='h-auto w-full bg-gray-100 space-y-3'>
                <div>
                    <ApexAreaChart/>
                </div>

                <div className='rounded-xl bg-white drop-shadow-xl text-center overflow-y-auto pt-5 h-auto'>
                    <h1 className='flex justify-center'>Últimas Vendas</h1>
                    <div className='max-h-48 w-full'>
                        <RelatorioHome/>
                    </div>

                </div>
            </div>
        </div>
    )
};


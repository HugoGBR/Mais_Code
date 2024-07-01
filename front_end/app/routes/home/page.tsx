'use client'
import React from 'react';
import RelatorioHome from '@/components/relatorioHome';
import ApexAreaChart from "@/components/GraficoHome";
import CardSalarioHome from "@/components/CardSalarioHome";
import MenssagemBemVindo from '@/components/MenssagemBemVindo';

export default function HomePage() {
    return (
        <div className="bg-gray-100 flex-col items-center justify-center w-8/12">
            <div className='flex flex-col gap-y-8 md:flex-row mb-8 justify-between'>
                <div>
                    <MenssagemBemVindo/>
                </div>
                <div>
                    <CardSalarioHome/>
                </div>
            </div>

            <div className='h-auto w-full  space-y-3'>
                <div>
                    <ApexAreaChart/>
                </div>
                <div className='hidden md:block md:rounded-xl bg-white md:drop-shadow-xl md:text-center'>
                    <RelatorioHome/>
                </div>
            </div>
        </div>
    )
};


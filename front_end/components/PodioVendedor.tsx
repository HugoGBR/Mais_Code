"use client"
import { fetchPodium } from '@/lib/relatorioHomeController';
import React, { useEffect, useState } from 'react';

export default function TopVendedores() {
    const [topVendedores, setTopVendedores] = useState([]);

    useEffect(() => {
        const getPodiumData = async () => {
            const data = await fetchPodium();
            setTopVendedores(data);
        };

        getPodiumData();
    }, []);

    return (
        <div className='items-center lg:text-6xl space-y-12'>
            {topVendedores.length > 0 && (
                <div className='underline text-lg lg:text-6xl ml-20 font-bold text-yellow-500'>
                    #1 {topVendedores[0].nome}
                </div>
            )}
            {topVendedores.length > 1 && (
                <div className='underline ml-20 text-lg lg:text-5xl font-bold text-gray-400'>
                    #2 {topVendedores[1].nome}
                </div>
            )}
            {topVendedores.length > 2 && (
                <div className='underline ml-20 text-lg lg:text-4xl font-bold text-amber-700'>
                    #3 {topVendedores[2].nome}
                </div>
            )}
        </div>
    );
};
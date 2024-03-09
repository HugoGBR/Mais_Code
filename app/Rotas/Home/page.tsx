import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CadastroLink from './CompCadastro';

const HomePage = () => {
    return (
        <div className="bg-gray-100 w-3/4">
            <div className='h-48 w-auto'>
                <h1 className='text-2xl font-semibold'>Bem Vindo, Calebe</h1>
                <p className=''>ficamos felizes em vê-lo novamente</p>
                <div className='rounded-xl float-right bg-white drop-shadow-xl h-24 w-96 grid grid-cols-1 '>
                    <h3 className='mt-3 ml-20 text-lg'>Remuneraçao</h3>
                    <h1 className='text-4xl font-bold ml-20'>R$5000,00</h1>
                </div>
            </div>

            <div className='h-auto gap-3 w-full flex flex-col lg:flex lg:flex-row'>
                <div className='h-auto w-full md:w-2/5 bg-white drop-shadow-xl grid grid-cols-1 items-center rounded-xl'>
                    <div className=''>
                        <p className='underline text-lg md:text-6xl ml-20 font-bold text-yellow-500'>#1 Gustavo</p>
                    </div>
                    <div className=''>
                        <h2 className='underline ml-20 text-5xl font-bold text-gray-400'>#2 João</h2>
                    </div>
                    <div className=''>
                        <h3 className='underline ml-20 text-4xl font-bold text-amber-700'>#3 Hugo</h3>
                    </div>
                </div>
                                                
                <div className='bg-white drop-shadow-xl w-full md:w-3/5 p-5 h-auto rounded-xl'>
                    <h1 className='flex justify-center'>Últimas Vendas</h1>

                    <Table className='w-full'>
                        <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4">N. Contrato</TableHead>
                                <TableHead className="w-1/4">Data</TableHead>
                                <TableHead className="w-1/4">Cliente</TableHead>
                                <TableHead className="text-right w-1/4">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className=''>
                            <TableRow className=''>
                                <TableCell className="font-medium bg-gray-100 rounded-l-lg border-l-4 border-l-green-800">#1201</TableCell>
                                <TableCell className="font-medium bg-gray-100">13/08/2023</TableCell>
                                <TableCell className="font-medium bg-gray-100">Senac</TableCell>
                                <TableCell className="text-right font-medium bg-gray-100 rounded-r-lg">Ativo</TableCell>
                            </TableRow>
                            <TableRow className=''>
                                <TableCell className="font-medium bg-gray-100 rounded-l-lg border-l-4 border-l-green-800">#1201</TableCell>
                                <TableCell className="font-medium bg-gray-100">13/08/2023</TableCell>
                                <TableCell className="font-medium bg-gray-100">Senac</TableCell>
                                <TableCell className="text-right font-medium bg-gray-100 rounded-r-lg">Ativo</TableCell>
                            </TableRow>
                            <TableRow className=''>
                                <TableCell className="font-medium bg-gray-100 rounded-l-lg border-l-4 border-l-green-800">#1201</TableCell>
                                <TableCell className="font-medium bg-gray-100">13/08/2023</TableCell>
                                <TableCell className="font-medium bg-gray-100">Senac</TableCell>
                                <TableCell className="text-right font-medium bg-gray-100 rounded-r-lg">Ativo</TableCell>
                            </TableRow>
                            <TableRow className=''>
                                <TableCell className="font-medium bg-gray-100 rounded-l-lg border-l-4 border-l-green-800">#1201</TableCell>
                                <TableCell className="font-medium bg-gray-100">13/08/2023</TableCell>
                                <TableCell className="font-medium bg-gray-100">Senac</TableCell>
                                <TableCell className="text-right font-medium bg-gray-100 rounded-r-lg">Ativo</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className='h-auto flex'>
                <CadastroLink/>   

            </div>

        </div>
    );
};

export default HomePage;
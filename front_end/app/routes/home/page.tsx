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
import RelatorioHome from '@/components/relatorioHome';

const HomePage = () => {
    return (
        <div className="bg-gray-100  w-3/4 -mt-5">
            <div className='h-48 w-auto -mb-3'>
                <h1 className='text-2xl font-semibold min-[320px]:hidden max-[600px]:hidden lg:inline-block'>Bem Vindo, Calebe</h1>
                <p className='min-[320px]:hidden max-[600px]:hidden lg:block'>ficamos felizes em vê-lo novamente</p>
                <div className='rounded-xl float-right bg-white drop-shadow-xl h-24 justify-center items-center'>
                    <h3 className='mt-3 ml-10 mr-10 text-lg'>Remuneraçao</h3>
                    <h1 className='text-4xl font-bold ml-10 mr-10 '>R$5000,00</h1>
                </div>
            </div>

            <div className='h-auto gap-2 w-full flex flex-col lg:flex lg:flex-row'>
                <div className='h-auto w-full md:w-2/5 bg-white drop-shadow-xl grid grid-cols-1 items-center rounded-xl'>
                    <div className=''>
                        <p className='underline text-lg lg:text-6xl ml-20 font-bold text-yellow-500'>#1 Gustavo</p>
                    </div>
                    <div className=''>
                        <h2 className='underline ml-20 text-lg lg:text-5xl font-bold text-gray-400'>#2 João</h2>
                    </div>
                    <div className=''>
                        <h3 className='underline ml-20 text-lg lg:text-4xl font-bold text-amber-700'>#3 Hugo</h3>
                    </div>
                </div>
                                                
                <div className='bg-white drop-shadow-xl w-full md:w-3/5 p-5 h-auto rounded-xl'>
                    <h1 className='flex justify-center'>Últimas Vendas</h1>

                    <RelatorioHome/> 

                     {/* <Table className='w-full'>
                        <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4">N. Contrato</TableHead>
                                <TableHead className="w-1/4">Data</TableHead>
                                <TableHead className="w-1/4">Cliente</TableHead>
                                <TableHead className="w-1/4">Valor</TableHead>
                                <TableHead className="text-right w-1/4">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className=''>
                            <TableRow className=''>
                                <TableCell className="font-medium bg-gray-100 rounded-l-lg border-l-4 border-l-green-800">#1201</TableCell>
                                <TableCell className="font-medium bg-gray-100">13/08/2023</TableCell>
                                <TableCell className="font-medium bg-gray-100">Senac</TableCell>
                                <TableCell className="font-medium bg-gray-100">R$1000,00</TableCell>
                                <TableCell className="text-right font-medium bg-gray-100 rounded-r-lg">Ativo</TableCell>
                            </TableRow>
                            <TableRow className=''>
                                <TableCell className="font-medium bg-gray-100 rounded-l-lg border-l-4 border-l-green-800">#1201</TableCell>
                                <TableCell className="font-medium bg-gray-100">13/08/2023</TableCell>
                                <TableCell className="font-medium bg-gray-100">Senac</TableCell>
                                <TableCell className="font-medium bg-gray-100">R$1000,00</TableCell>
                                <TableCell className="text-right font-medium bg-gray-100 rounded-r-lg">Ativo</TableCell>
                            </TableRow>
                            <TableRow className=''>
                                <TableCell className="font-medium bg-gray-100 rounded-l-lg border-l-4 border-l-green-800">#1201</TableCell>
                                <TableCell className="font-medium bg-gray-100">13/08/2023</TableCell>
                                <TableCell className="font-medium bg-gray-100">Senac</TableCell>
                                <TableCell className="font-medium bg-gray-100">R$1000,00</TableCell>
                                <TableCell className="text-right font-medium bg-gray-100 rounded-r-lg">Ativo</TableCell>
                            </TableRow>
                            <TableRow className=''>
                                <TableCell className="font-medium bg-gray-100 rounded-l-lg border-l-4 border-l-green-800">#1201</TableCell>
                                <TableCell className="font-medium bg-gray-100">13/08/2023</TableCell>
                                <TableCell className="font-medium bg-gray-100">Senac</TableCell>
                                <TableCell className="font-medium bg-gray-100">R$1000,00</TableCell>
                                <TableCell className="text-right font-medium bg-gray-100 rounded-r-lg">Ativo</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>  */}
                </div>
            </div>

            <div className='min-[320px]:hidden max-[600px]:hidden lg:inline-block'>
                <CadastroLink/>   
            </div>
            

        </div>
    );
};

export default HomePage;
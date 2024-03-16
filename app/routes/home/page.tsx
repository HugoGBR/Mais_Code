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

const HomePage = () => {
    return (
        <div className="bg-gray-100 w-3/4">
            <div className='h-48 w-auto'>
                <div className='rounded-xl float-right bg-white drop-shadow-xl h-24 w-96'>
                    <h3 className=''>Remuneraçao</h3>
                    <h1>$5000,00</h1>
                </div>
            </div>

            <div className='h-auto gap-3 flex'>
                <div className='h-auto w-2/5 bg-white drop-shadow-xl flex items-center rounded-xl'>
                    <h1>#1 Gustavo</h1>
                    <h2>#2 João</h2>
                    <h3>#3 Hugo</h3>
                </div>

                <div className='bg-white drop-shadow-xl w-3/5 p-5 h-auto rounded-xl'>
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
        </div>
    );
};

export default HomePage;
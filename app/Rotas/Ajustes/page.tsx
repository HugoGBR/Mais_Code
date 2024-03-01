'use client'
import * as React from "react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {RiCloseCircleLine} from "react-icons/ri";
import {PiPlusCircleBold} from "react-icons/pi";

const invoices = [
    {
        name: "INV001",
        new: "Paid",
        old: "$250.00",
        valor: "Credit Card",
    },
    {
        name: "INV002",
        new: "Pending",
        old: "$150.00",
        valor: "PayPal",
    },
    {
        name: "INV003",
        new: "Unpaid",
        old: "$350.00",
        valor: "Bank Transfer",
    },
    {
        name: "INV004",
        new: "Paid",
        old: "$450.00",
        valor: "Credit Card",
    },
    {
        name: "INV005",
        new: "Paid",
        old: "$550.00",
        valor: "PayPal",
    },
    {
        name: "INV006",
        new: "Pending",
        old: "$200.00",
        valor: "Bank Transfer",
    },
    {
        name: "INV007",
        new: "10%",
        old: "15%",
        valor: "Credit Card",
    },
]

export default function Ajuste() {

    return (
        <div className="flex space-x-5">
            <div className="bg-white w-[500px] rounded-xl p-5 shadow-lg">
                <div className="flex justify-between h-10">
                    <h1 className="font-bold text-lg">Produtos</h1>
                    <div className="flex space-x-2">
                        <Link href="">
                            <RiCloseCircleLine size={25} color="red"/>
                        </Link>
                        <Link href={'/Rotas/Ajustes/Produtos'}>
                            <PiPlusCircleBold size={25} color="#0762C8"/>
                        </Link>
                    </div>
                </div>
                <div>
                    <Link href=""></Link>
                    <Table>
                        <TableHeader>
                        <TableRow>
                                <TableHead className="text-center">Nome</TableHead>
                                <TableHead className="text-center">Novo</TableHead>
                                <TableHead className="text-center">Antigo</TableHead>
                                <TableHead className="text-center">Valor</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((item) => (
                                <TableRow key={item.name}>
                                    <TableCell className="font-medium text-center"><Link href={'/Rotas/Ajustes/Produtos'}>{item.name}</Link></TableCell>
                                    <TableCell className="text-center"><Link href={'/Rotas/Ajustes/Produtos'}>{item.new}</Link></TableCell>
                                    <TableCell className="text-center"><Link href={'/Rotas/Ajustes/Produtos'}>{item.old}</Link></TableCell>
                                    <TableCell className="text-center"><Link href={'/Rotas/Ajustes/Produtos'}>{item.valor}</Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

            </div>
            <div className="bg-red-700 h-[500px] w-[500px] grid grid-cols-2 grid-rows-2 rounded-xl p-5">
                <div className="bg-white rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between h-10">
                        <h1 className="font-bold text-lg">Produtos</h1>
                        <div className="flex space-x-2">
                            <Link href="">
                                <RiCloseCircleLine size={25} color="red"/>
                            </Link>
                            <Link href={'/Rotas/Ajustes/Produtos'}>
                                <PiPlusCircleBold size={25} color="#0762C8"/>
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <Link href=""></Link>
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Nome</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((item) => (
                                    <TableRow key={item.name}>
                                        <TableCell className="font-medium text-center"><Link
                                            href={'/Rotas/Ajustes/Produtos'}>{item.name}</Link></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                </div>
                <div className="bg-amber-700">
                    tela 1
                </div>
                <div className="bg-amber-950">
                    tela 1
                </div>
            </div>

        </div>
    )
}
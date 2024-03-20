'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import * as React from "react";
import {RiCloseCircleLine} from "react-icons/ri";
import {PiPlusCircleBold} from "react-icons/pi";




export default function ListaProdutos() {
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
    return (
        <div className="flex w-full h-full bg-white shadow-lg rounded-xl">
            <div className=" p-5">
                <div className="flex justify-between h-10">
                    <h1 className="font-bold text-2xl">Produtos</h1>
                    <div className="flex space-x-2">
                        <Link href="">
                            <RiCloseCircleLine size={25} color="red"/>
                        </Link>
                        <Link href={'/routes/ajustes/Produtos'}>
                            <PiPlusCircleBold size={25} color="#0762C8"/>
                        </Link>
                    </div>
                </div>
                <div>
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
                                    <TableCell className="font-medium text-center border-l-4 border-l-blue-800"><Link
                                        href={'/routes/ajustes/Produtos'}>{item.name}</Link></TableCell>
                                    <TableCell className="text-center"><Link
                                        href={'/routes/ajustes/Produtos'}>{item.new}</Link></TableCell>
                                    <TableCell className="text-center"><Link
                                        href={'/routes/ajustes/Produtos'}>{item.old}</Link></TableCell>
                                    <TableCell className="text-center"><Link
                                        href={'/routes/ajustes/Produtos'}>{item.valor}</Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
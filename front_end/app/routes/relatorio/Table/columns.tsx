"use client"

import {Button} from "@/components/ui/button";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {ColumnDef} from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    contrato: number;
    data: string; 
    cliente: string;
    tipo: string;
    parcelas: number;
    valor: number;
    comissao: number;
};


export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "N*Contrato",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    N*Contrato
                    <CaretSortIcon className="ml-2 h-4 w-4 "/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "Cliente",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cliente
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "Vendedor",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    tipo
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "quantia",
        header: () => <div className="text-center">Pacelas</div>,
        cell: ({row}) => {
            const quantia = parseFloat(row.getValue("quantia"))


            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(quantia)

            return <div className="text-center">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Valor</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Comissão</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("status")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const payment = row.original

        },
    },
]

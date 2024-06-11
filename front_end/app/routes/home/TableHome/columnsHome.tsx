"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: number
    valor_total: number
    status: | "em andamento " | "Concluido" | "Inativo"
    email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "NºContrato",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    NºContrato
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("NºContrato")}</div>,
    },

    {
        accessorKey: "Data_Venda",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("Data_Venda")}</div>,
    },


    {
        accessorKey: "Cliente",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cliente
                    
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("Cliente")}</div>,
    },



    {
        accessorKey: "Valor",
        header: () => <div className="text-center">Valor</div>,
        cell: ({ row }) => {
            const quantia = parseFloat(row.getValue("Valor"))


            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(quantia)

            return <div className="text-center">{formatted}</div>
        },
    },

    
    {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("status")}</div>
        ),
    },




    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

        },
    },
]

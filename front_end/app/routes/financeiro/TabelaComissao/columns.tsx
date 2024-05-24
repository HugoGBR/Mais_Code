"use client"

import {Button} from "@/components/ui/button";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {ColumnDef} from "@tanstack/react-table";

export type Payment = {
    id: number
    valor_total: number
    status: | "em andamento " | "Concluido" | "Inativo"
    email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "tipo_contrato_id",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    N. Contrato
                    <CaretSortIcon className="ml-2 h-4 w-4 "/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("tipo_contrato_id")}</div>,
    },

    {
        accessorKey: "inicio_contrato",
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
        cell: ({row}) => <div className="lowercase">{row.getValue("inicio_contrato")}</div>,
    },


    {
        accessorKey: "nome_cliente",
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
        cell: ({row}) => <div className="lowercase">{row.getValue("nome_cliente")}</div>,
    },

    {
        accessorKey: "nome_contrato",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tipo
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("nome_contrato")}</div>,
    },

    {
        accessorKey: "numero_parcela",
        header: () => <div className="text-center">Parcelas</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("numero_parcela")}</div>
        ),
    },

    {
        accessorKey: "valor_total",
        header: () => <div className="text-center">Valor</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("valor_total")}</div>
        ),
    },
    {
        accessorKey: "porcentagem",
        header: () => <div className="text-center">Comissão</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("porcentagem")}</div>
        ),
    },

    {
        accessorKey: "numero_parcela",
        header: () => <div className="text-center">Parcelas</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("numero_parcela")}</div>
        ),
    },


    {
        accessorKey: "porcentagem",
        header: () => <div className="text-center">Comissão</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("porcentagem")}</div>
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

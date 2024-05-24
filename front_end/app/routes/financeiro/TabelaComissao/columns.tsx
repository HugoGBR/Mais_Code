"use client"

import {Button} from "@/components/ui/button";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {ColumnDef} from "@tanstack/react-table";

export type Payment = {
    id: number
    tipo_contrato_id: number
    inicio_contrato: string
    nome: string
    tipo: string
    parcelas: number
    valor_total: number
    comissao: number
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "nome",
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
        cell: ({row}) => <div className="lowercase">{row.getValue("nome")}</div>,
    },

    {
        accessorKey: "tipo_contrato_id",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    tipo_contrato_id
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">#{row.getValue("tipo_contrato_id")}</div>,
    },
    {
        accessorKey: "numero_parcela",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    tipo_cliente
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">X{row.getValue("numero_parcela")}</div>,
    },
    {
        accessorKey: "valor_total",
        header: () => <div className="text-center">Valor</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("valor_total")}</div>
        ),
    },
    {
        accessorKey: "inicio_contrato",
        header: () => <div className="text-center">Data</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("inicio_contrato")}</div>
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

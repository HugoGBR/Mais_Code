"use client"

import {Button} from "@/components/ui/button";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {ColumnDef} from "@tanstack/react-table";
import { Payment } from "../../relatorio/Table/columns";

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "tipo_contrato_id",
        header: ({column}) => {
            return (
                <div className="text-center">
                    <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    N. Contrato
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => <div className="lowercase  text-center">#{row.getValue("tipo_contrato_id")}</div>,
    },
    
    {
        accessorKey: "inicio_contrato",
        header: () => <div className="text-center">Data</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("inicio_contrato")}</div>
        ),
    },

    {
        accessorKey: "nome_cliente",
        header: ({column}) => {
            return (
                <div className="text-center">
                    <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cliente
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => <div className="lowercase  text-center">{row.getValue("nome_cliente")}</div>,
    },

    {
        accessorKey: "nome",
        header: ({column}) => {
            return (
                <div className="text-center">
                    <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tipo
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => <div className="lowercase  text-center">{row.getValue("nome")}</div>,
    },
   
    {
        accessorKey: "numero_parcela",
        header: ({column}) => {
            return (
                <div className="text-center">
                    <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Parcelas
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => <div className="lowercase  text-center">X{row.getValue("numero_parcela")}</div>,
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
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const payment = row.original

        },
    },
]
"use client"

import {Button} from "@/components/ui/button";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {ColumnDef} from "@tanstack/react-table";
import { Payment } from "../../relatorio/Table/columns";

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "numero_contrato",
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
        cell: ({row}) => <div className="lowercase  text-center">#{row.getValue("numero_contrato")}</div>,
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
        accessorKey: "tipo_contrato",
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
        cell: ({row}) => <div className="lowercase  text-center">{row.getValue("tipo_contrato")}</div>,
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
        accessorKey: "comissao_produtoA",
        header: () => <div className="text-center">Comissão</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("comissao_produtoA")}</div>
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
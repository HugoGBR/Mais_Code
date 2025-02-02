"use client"
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from 'date-fns';

export type Payment = {
    id: number
    valor_total: number
    status: | "em andamento " | "Concluido" | "Inativo"
    inicio_contrato: number
    nome: string
    vendedor: string

}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "numero_contrato",
        header: ({ column }) => (
            <div className="text-center hidden sm:block">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    N*Contrato
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: ({ row }) => (
            <div className="lowercase text-center hidden sm:block">
                #{row.getValue("numero_contrato")}
            </div>
        ),
    },

    {
        accessorKey: "data_inicio",
        header: ({ column }) => {
            return (
                <Button className="text-center"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const dataFormatada = format(parseISO(row.getValue("data_inicio")), 'dd-MM-yyyy');
            return <div className="lowercase">{dataFormatada}</div>;
        },
    },

    {
        accessorKey: "nome_cliente",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cliente
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("nome_cliente")}</div>,
    },

    {
        accessorKey: "nome_vendedor",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Vendedor
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("nome_vendedor")}</div>,
    },

    {
        accessorKey: "valor_total",
        header: () => (
            <div className="text-center hidden sm:block">Valor</div>
        ),
        cell: ({ row }) => {
            const quantia = parseFloat(row.getValue("valor_total"));
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(quantia);

            return (
                <div className="text-center hidden sm:block">
                    {formatted}
                </div>
            );
        },
    },

    {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => (<div className="capitalize text-center">{row.getValue("status")}</div>

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

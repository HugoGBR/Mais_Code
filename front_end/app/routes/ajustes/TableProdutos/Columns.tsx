"use client"

import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

// Este tipo é usado para definir o formato dos nossos dados.
// Você pode usar um esquema Zod aqui, se quiser.
export type Payment = {
  nome: String
  comissaoA: number
  comissaoB: number
  horas_trabalhadas: number  
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <CaretSortIcon className="ml-2 h-4 w-4 "  />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("nome")}</div>,
  },

  {
    accessorKey: "comissaoA",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comissão A
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("comissaoA")}</div>,
  },

  {
    accessorKey: "comissaoB",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comissão A
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("comissaoB")}</div>,
  },

  {
    accessorKey: "horas_trabalhadas",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("horas_trabalhadas")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

    },
  },
]

"use client"

import { Button } from "@/components/ui/button";
import { Payment } from "@/lib/interfaces/dadosUsuarios";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

// Este tipo é usado para definir o formato dos nossos dados.
// Você pode usar um esquema Zod aqui, se quiser.


export const ColumnsProdutos: ColumnDef<Payment>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <CaretSortIcon className="h-4 w-4 "  />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "comissao_nova",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Novo
          <CaretSortIcon className="h-4 w-4 " />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("comissao_nova")}</div>,
  },
  {
    accessorKey: "comissao_antiga",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Antigo
          <CaretSortIcon className="h-4 w-4 " />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("comissao_antiga")}</div>,
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
          <CaretSortIcon className="h-4 w-4 " />
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

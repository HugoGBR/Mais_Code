"use client"

import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

// Este tipo é usado para definir o formato dos nossos dados.
// Você pode usar um esquema Zod aqui, se quiser.
export type Payment = {
  nome: String,  
  porcentagem: String  
}

export const ColumnsTipoCliente: ColumnDef<Payment>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo de Contrato
          <CaretSortIcon className="ml-2 h-4 w-4 " />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("nome")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
    },
  },
]

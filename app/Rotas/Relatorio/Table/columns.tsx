

import { Button } from "@/components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { string } from "zod"


export type Payment = {
    id: string
    quantia: number
    status:| "Ativo" | "Concluido" | "Inativo"
    email: string
    N_de_contrato:number
    Novo_Antigo: string
    Vendedor:string
    Cliente:string
  }

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "N_de_contrato",
        header: ({ column }) => {
        
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              N*Contrato
              <CaretSortIcon className="ml-2 h-4 w-4 " />
            </Button>
          )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("N_de_contrato")}</div>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Email
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
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
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("Cliente")}</div>,
      },
      {
        accessorKey: "Novo_Antigo",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
               Novo/Antigo
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="text-center">{row.getValue("Novo_Antigo")}</div>,
      },
      {
        accessorKey: "Vendedor",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Venderdor
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("Vendedor")}</div>,
      },
      {
        accessorKey: "quantia",
        header: () => <div className="text-right">Valor</div>,
        cell: ({ row }) => {
          const quantia = parseFloat(row.getValue("quantia"))
    
    
          const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(quantia)
    
          return <div className="text-right font-medium">{formatted}</div>
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("status")}</div>
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

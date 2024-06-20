"use client"


import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { useEffect, useState } from "react"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTableComissao<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [comissaoTotal, setTotalPorcentagem] = useState<number>(0)
    const [soma,setSoma] = useState(0)

    useEffect(() => {
        const calcularTotalPorcentagem = () => {
            let total = 0
            if (Array.isArray(data)) {
                data.forEach((item: any) => {
                   
                    
                    total = total + (item.valor_total/item.porcentagem)
                })
            }
            return total
        }

        setTotalPorcentagem(calcularTotalPorcentagem())
    }, [data])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div>
            <div className="flex justify-end pb-2 drop-shadow-lg ">
                <div className="bg-white border boder-gray-300 rounded-md py-2 px-4 w-auto ">
                    <strong>Remuneração R$ {comissaoTotal}</strong>

                </div>
            </div>

            <div className="bg-white h-3/5 shadow-xl rounded-lg p-4">
                <div className="flex items-center py-4 input-container">
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={(table.getColumn("nome_cliente")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("nome_cliente")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />


                </div>
                <div className="rounded-3xl border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="bg-gray-50">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        Nenhum Resultado
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="space-x-3 mt-4 flex justify-center items-center">
                    {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Proximo 
                    </Button> */}

                    <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => table.nextPage()} />
                    </PaginationItem>
              
                    {/* <PaginationItem>
                        <PaginationLink href="#">{paginaAtual}</PaginationLink>
                    </PaginationItem> */}
                    
                    <PaginationItem>
                        <PaginationNext onClick={() => table.nextPage()} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
                </div>
            </div>
        </div>
    )
}

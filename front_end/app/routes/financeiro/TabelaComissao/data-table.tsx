
"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
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
import { ChevronDownIcon, Slice } from "lucide-react"
import { useEffect, useState } from "react"
import { CSVLink } from "react-csv";



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
  
    const [pageIndex, setPageIndex] = useState(0)
    const [pagesize, setPageSize] = useState(8)
    
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
            pagination: { pageIndex: pageIndex, pageSize: pagesize }
        },
        pageCount: Math.ceil(data.length / pagesize)
    })

    const ProximaPagina = () => {
        if (pageIndex + 1 < Math.ceil(table.getPageCount())) {
            setPageIndex(pageIndex + 1)
        }
    }

    const Paginaanterior = () => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1)
        }
    }

    useEffect(() => {
        table.setPageSize(pagesize)
        table.setPageIndex(pageIndex)
    }, [pagesize, pageIndex, table])

    return (
        <div>
            <div className="flex justify-end mb-4">
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
                            {table.getRowModel && table.getRowModel()?.rows?.length ? (
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
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={Paginaanterior} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext onClick={ProximaPagina} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

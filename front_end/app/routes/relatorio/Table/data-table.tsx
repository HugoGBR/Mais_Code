"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation"
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
    Row,
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
import { useEffect, useState } from "react"
import { GetDadosVendaByData, GetDadosVendaByYear } from "@/lib/RelatorioController";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
}



export function DataTable<TData, TValue>({
    columns,
}: DataTableProps<TData, TValue>) {
    const [data, setData] = useState<TData[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const hoje = new Date()
    var dataHojeFormatado = `${hoje.getFullYear()}-${((hoje.getMonth() + 1).toString().padStart(2, "0"))}`

    const [startDate, setStartDate] = useState(dataHojeFormatado);

    const router = useRouter()
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
    });


    function HandleClick(row:string){
        const dadosDaLinha = JSON.parse(row)
        router.push(`/routes/relatorio/${dadosDaLinha.numero_contrato}`)
    }
    const getDadosYear = async () => {
        const dados = await GetDadosVendaByYear(hoje);
        setData(dados);
    }

    useEffect(() => {
        getDadosYear();
    }, []); 

  
    async function handleSubmit() {
        const dados = await GetDadosVendaByData(new Date(startDate));
        console.log(`dados da nova consulta ${startDate}`)
        setData(dados);         
    }



    return (
        <div>
            <div className="flex flex-col items-start py-5 input-container">
                <div className="bg-white h-3/5 border hover:shadow-lg rounded-lg p-4">
                    <div className="flex justify-between gap-4">
                        <div className="flex gap-3 border mb-5 border-gray-300 rounded-lg py-2 px-4 bg-white hover:shadow-lg transition-shadow duration-200">
                            <input
                                type="month"
                                id="start"
                                name="start"
                                min="2018-03"
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-gray-700"
                            />
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="px-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                            >
                                <FontAwesomeIcon icon={faSearch} className="" />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={(table.getColumn("nome_cliente")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("nome_cliente")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm border border-gray-300 rounded-lg hover:shadow-md py-2 px-4 focus:outline-none focus:border-blue-500 h-[44px]"
                        />
                    </div>

                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        onClick={() => HandleClick(JSON.stringify(row.original))}
                                        className="cursor-pointer"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="bg-gray-100 text-center">
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

                    <div className="space-x-3 mt-4 flex justify-center items-center">
                        <Button
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
                            Próximo
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
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
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { GetDadosVendaByData, GetDadosVendaByYear } from "@/lib/RelatorioController";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
}

export function DataTable<TData, TValue>({
    columns,
}: DataTableProps<TData, TValue>) {
    const [data, setData] = useState<TData[]>([]); // Dados da tabela
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const hoje = new Date();
    const dataHojeFormatado = `${hoje.getFullYear()}-${((hoje.getMonth() + 1).toString().padStart(2, "0"))}`;

    const [startDate, setStartDate] = useState(dataHojeFormatado);

    const router = useRouter();

    // Configuração da tabela com limite de 10 itens por página
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
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            },
        },
    });

    // Verificar se a paginação deve ser exibida
    const shouldShowPagination = data.length > table.getState().pagination.pageSize;

    function HandleClick(row: string) {
        const dadosDaLinha = JSON.parse(row);
        router.push(`/routes/financeiro/${dadosDaLinha.numero_contrato}`);
    }

    // Buscar dados para o ano atual
    const getDadosYear = async () => {
        const dados = await GetDadosVendaByYear(hoje);
        setData(dados);
    };

    useEffect(() => {
        getDadosYear();
    }, []);

    // Buscar dados filtrados por data
    async function handleSubmit() {
        const dados = await GetDadosVendaByData(new Date(startDate));
        setData(dados);
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-4 pb-5">
                <div className="flex flex-wrap items-start md:justify-between gap-4 w-full">
                    <div className="w-full sm:w-auto flex flex-row gap-3 border border-gray-300 rounded-lg bg-white hover:shadow-lg transition-shadow duration-200">
                        <input
                            type="month"
                            id="start"
                            name="start"
                            min="2018-03"
                            value={startDate}
                            onChange={(event) => setStartDate(event.target.value)}
                            className="w-full sm:w-auto h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-md text-gray-700 px-3"
                        />
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="h-[44px] px-4 rounded-r-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
                        </button>
                    </div>

                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={(table.getColumn("nome_cliente")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("nome_cliente")?.setFilterValue(event.target.value)
                        }
                        className="w-full sm:w-auto border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table className="min-w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
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
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Nenhum Resultado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {shouldShowPagination && (
                <>
                    <div className="flex justify-center items-center mt-5">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        className='cursor-pointer hover:text-blue-800'
                                        onClick={() => table.previousPage()}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        className='cursor-pointer hover:text-blue-800'
                                        onClick={() => table.nextPage()}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            )}
        </div>
    );
}

"use client"
import * as React from "react"
import { columns } from "./Table/columns"
import { DataTable } from "./Table/data-table"

export default function Relatorio() {
    return (
        <div className="w-full flex flex-col gap-5 lg:w-10/12">
            <div>
                <h1 className="text-2xl font-bold lg:hidden">Financeiro</h1>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8">
                <DataTable columns={columns} />
            </div>
        </div>

    );
}
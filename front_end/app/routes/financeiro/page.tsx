"use client"
import * as React from "react"
import { columns } from "./Table/columns"
import { DataTable } from "./Table/data-table"

export default function Relatorio() {
    return (
        <div className="w-full">
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8">
                <DataTable columns={columns} />
            </div>
        </div>
    );
}
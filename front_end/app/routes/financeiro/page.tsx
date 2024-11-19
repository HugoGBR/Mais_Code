"use client"
import * as React from "react"
import { columns } from "./Table/columns"
import { DataTable } from "./Table/data-table"

export default function Relatorio() {
    return (

        <div>
            <DataTable columns={columns}  />
        </div>
    );
}

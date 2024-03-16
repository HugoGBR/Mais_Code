'use client'
import * as React from "react";
import ListaProdutos from "@/app/routes/ajustes/ListaProdutos";
import ListaTipoCliente from "@/app/routes/ajustes/ListaTipoCliente";
import ListaTipoContrato from "@/app/routes/ajustes/ListaTipoContrato";

export default function Ajuste() {

    return (
        <div className="flex flex-col gap-3 md:flex md:flex-row">
            <div className="h-auto">
                <ListaProdutos/>
            </div>
            <div className="gap-3 h-auto w-auto flex flex-col">
                <ListaTipoCliente/>
                <ListaTipoContrato/>
            </div>
        </div>
    )
}

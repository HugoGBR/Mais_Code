'use client'
import * as React from "react";
import {Button} from "@/components/ui/button"
import Link from "next/link";
import ListaProdutos from "@/components/ListaProdutos";
import ListaTipoCliente from "@/components/ListaTipoCliente";
import ListaPorcetagem from "@/components/ListaPorcetagem";
import ListaTipoContrato from "@/components/ListaTipoContrato";

export default function Ajuste() {

    return (
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
            <div className="h-auto">
                <ListaProdutos/>
            </div>
            <div className="gap-3 h-auto w-auto flex flex-col md:grid md:grid-cols-2 md:grid-rows-2">
                <ListaTipoCliente/>

                <ListaPorcetagem/>

                <ListaTipoContrato/>

            </div>
        </div>
    )
}
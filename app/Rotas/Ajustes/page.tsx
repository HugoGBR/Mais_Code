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
        <div className="flex gap-3">
            <div className="h-[500px]">
                <ListaProdutos/>
            </div>
            <div className="gap-3 h-[500px] w-[500px] grid grid-cols-2 grid-rows-2">
                <ListaTipoCliente/>

                <ListaPorcetagem/>

                <ListaTipoContrato/>

            </div>
        </div>
    )
}
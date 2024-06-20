'use client'

import React from "react";
import Link from "next/link";
import CardCliente from "@/components/CardCliente";
import {useRouter} from "next/navigation";

export default function Contrato() {
    const route = useRouter()
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <div>
                    <Link href="/routes/cadastros"
                          className= "focus:font-bold focus:text-blue-700 focus:border-b-2 focus:outline-none focus:border-blue-500">Contrato</Link>
                </div>
                <div>
                    <Link href="/routes/cadastros/Cliente"
                          className="focus:font-bold text-blue-700 border-b-2  border-blue-700">Cliente</Link>
                </div>
            </div>
            <div>
                <CardCliente/>
            </div>
        </div>
    )
}
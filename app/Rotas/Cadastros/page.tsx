'use cliente'

import React from "react";
import Link from "next/link";
import CardCadastro from "@/components/CardCadastro";

export default function Contrato() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <div>
                    <Link href=""
                          className="focus:font-bold focus:text-blue-700 focus:border-b-2 focus:outline-none focus:border-blue-500">Contrato</Link>
                </div>
                <div>
                    <Link href="/Rotas/Cadastros/Cliente"
                          className="focus:font-bold focus:text-blue-700 focus:border-b-2 focus:outline-none focus:border-blue-500">Cliente</Link>
                </div>
            </div>
            <div>
                <CardCadastro/>
            </div>
        </div>
    )
}
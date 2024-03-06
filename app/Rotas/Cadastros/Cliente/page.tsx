"use client"
import * as React from "react";
import CardCliente from "@/components/CardCliente";
import Link from "next/link";

export default function CardWithForm() {
    return (
        <div>
            <div className="flex gap-5 mb-5">
                <div>
                    <Link href="/Rotas/Cadastros"
                          className="focus:font-bold focus:text-blue-700 focus:border-b-2 focus:outline-none focus:border-blue-500">Contrato</Link>
                </div>
                <div>
                    <Link href="/Rotas/Cadastros/Cliente"
                          className="focus:font-bold focus:text-blue-700 focus:border-b-2 focus:outline-none focus:border-blue-500">Cliente</Link>
                </div>
            </div>
            <CardCliente/>
        </div>
    );
}
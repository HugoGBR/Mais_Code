'use client';

import React from "react";
import Link from "next/link";
import CardCadastro from "@/components/CardCadastro";

export default function Contrato() {
    return (
        <div className="min-h-screen flex flex-col gap-5 overflow-auto">
            {/* Cabeçalho */}
            <div className="flex flex-wrap gap-5 justify-center sm:justify-start p-5">
                <div>
                    <Link
                        href="/routes/cadastros"
                        className="text-blue-700 border-b-2 border-blue-700 text-xl font-bold focus:font-bold"
                    >
                        Contrato
                    </Link>
                </div>
                <div>
                    <Link
                        href="/routes/cadastros/Cliente"
                        className="focus:font-bold focus:text-blue-700 focus:border-b-2 text-xl font-bold focus:outline-none focus:border-blue-500"
                    >
                        Cliente
                    </Link>
                </div>
            </div>

            <div className="w-full sm:w-3/4 md:w-1/2 mx-auto">
                <CardCadastro />
            </div>
        </div>
    );
}



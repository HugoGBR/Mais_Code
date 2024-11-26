'use client';

import React from "react";
import Link from "next/link";
import CardCadastro from "@/components/CardCadastro";

export default function Contrato() {
    return (
        <div className="flex flex-col justify-center items-center gap-5">
            {/* Cabeçalho */}
            <div className="flex gap-5 justify-start w-full">
                <div>
                    <Link
                        href="/routes/cadastros"
                        className="focus:font-bold focus:text-blue-700 focus:border-b-2 text-xl font-bold focus:outline-none focus:border-blue-500"
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

            <div className="w-full flex justify-center">
                <CardCadastro />
            </div>
        </div>

    );
}



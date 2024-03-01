'use client'
import * as React from "react";
import {Button} from "@/components/ui/button"
import Link from "next/link";


export default function Ajuste() {

    return (
        <div>
            Home
            <Button asChild>
                <Link href="/Rotas/Ajustes/Produtos">Cadastrar</Link>
            </Button>
        </div>
    )
}
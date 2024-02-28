"use client"

import { User } from "lucide-react"
import Link from "next/link"
export default function SideBar() {

    const rotas = [
        {
            nome: "Home",
            href: "/rotas/Home"
        },
        {
            nome: "Cadastro",
            href: "/rotas/Cadastro"
        },
        {
            nome: "Relatorio",
            href: "/rotas/Relatorio"
        },
        {
            nome: "Financeiro",
            href: "/rotas/Financeiro"
        },
        {
            nome: "Gestão",
            href: "/rotas/Gestao"
        },
        {
            nome: "Ajuste",
            href: "/rotas/Ajustes"
        },

        
    ]

    return (
        <>
            <div className="space-y-4 flex flex-col h-screen text-white">
                <div>
                    <Link href="/sidebar" className=" flex">
                        <div className="relative w-8 h-8">
                            <h1 className="text-2xl font-bold">LOGO</h1>
                        </div>
                    </Link>
                    <div className="space-y-1 mt-14">
                        {rotas.map((item) => (
                            // eslint-disable-next-line react/jsx-key
                            <Link href={item.href} className="text-sm flex p-3 font-medium hover:text-white hover:bg-white/10 rounded-lg">
                                <div className="flex items-center">
                                <User /> {item.nome}
                                    teste
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="space-y-1">
                        
                    </div>
                </div>
            </div>
        </>
    )
}

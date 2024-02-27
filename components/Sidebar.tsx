"use client"

import { User } from "lucide-react"
import Link from "next/link"
export default function SideBar() {

    const rotas = [
        {
            nome: "Cadastro",
            href: "/rotas/Cadastro"
        },
        {
            nome: "Relatorio",
            href: "/rotas/Relatorio"
        }
    ]

    return (
        <>
            <div className="space-y-4 py-4 flex flex-col h-full text-white">
                <div className="px-3 py-2 flex-1">
                    <Link href="/sidebar" className=" flex">
                        <div className="relative w-8 h-8 mr-4">
                            <h1 className="text-2xl font-bold">LOGO</h1>
                        </div>
                    </Link>
                    <div className="space-y-1">
                        {rotas.map((item) => (
                            // eslint-disable-next-line react/jsx-key
                            <Link href={item.href} className="text-sm flex p-3 font-medium hover:text-white hover:bg-white/10 rounded-lg">
                                <div className="flex items-center flex-1">
                                <User /> {item.nome}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
"use client"

import { User } from "lucide-react"
import Link from "next/link"
import Ajuste from "@/public/icons/icon-ajuste.png"
import Image from "next/image"
export default function CadastroLink() {

    const menuSuperior = [
        {
            nome: "Cadastro",
            href: "/Rotas/Cadastro",
            icon: Ajuste,
            description: "Aqui você pode visualizar tal coisa e fazer x coisa."
        },
        {
            nome: "Relatorio",
            href: "/Rotas/Relatorio",
            icon: Ajuste,
            description: "Aqui você pode visualizar tal coisa e fazer x coisa."
        },
        {
            nome: "Financeiro",
            href: "/Rotas/Financeiro",
            icon: Ajuste,
            description: "Aqui você pode visualizar tal coisa e fazer x coisa."
        },
        {
            nome: "Gestão",
            href: "/Rotas/Gestao",
            icon: Ajuste,
            description: "Aqui você pode visualizar tal coisa e fazer x coisa."
        },
        {
            nome: "Ajuste",
            href: "/Rotas/Ajustes",
            icon: Ajuste,
            description: "Aqui você pode visualizar tal coisa e fazer x coisa."

        },
    ]

    return (
        <>
            <div className="w-full flex flex-row mt-3 ">
                {menuSuperior.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={item.href}
                        className="flex p-2 rounded-lg">
                        <div className="text-center space-y-3 bg-white drop-shadow-xl rounded-lg p-7 ">
                            <Image src={item.icon} alt={"icones"} className="w-10 h-auto" />
                            <h1 className="text-lg font-medium">{item.nome}</h1>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
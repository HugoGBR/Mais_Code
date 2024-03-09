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
        <div className=" w-full flex flex-row mt-3 ">
            {menuSuperior.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <Link href={item.href}
                    className="flex gap-3 text-lg p-2 font-medium w-1/5 rounded-lg col-span-5">
                    <div className="flex justify-center items-center flex-col gap-3 bg-white drop-shadow-xl rounded-lg p-7 ">
                        
                        <Image src={item.icon} alt={"icones"} className="w-10 h-auto"/>
                        <p>{item.nome}</p>
                        <p>{item.description}</p>
                        
                        
                        
                    </div>
                </Link>
            ))}
        </div>
        </>
    )
}
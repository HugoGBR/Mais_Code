"use client"

import Link from "next/link"
import Cadastro from "@/public/icons/icon-cadastro.png"
import Relatorio from "@/public/icons/icon-relatorio.png"
import Financeiro from "@/public/icons/icon-financeiro.png"
import Gestao from "@/public/icons/icon-gestao.png"
import Ajuste from "@/public/icons/icon-ajuste.png"
import Image from "next/image"
export default function CadastroLink() {

    const menuSuperior = [
        {
            nome: "Cadastro",
            href: "/routes/cadastros",
            icon: Cadastro,
            description: "Aqui você pode visualizar tal coisa e fazer x coisa."
        },
        {
            nome: "Relatorio",
            href: "/routes/relatorio",
            icon: Relatorio,
            description: "Aqui você pode visualizar tal coisa e fazer x coisa."
        },
        {
            nome: "Financeiro",
            href: "/routes/financeiro",
            icon: Financeiro,
            description: "Aqui você pode visualizar tal coisa e fazer x coisa."
        },
        {
            nome: "Gestão",
            href: "/routes/gestao",
            icon: Gestao,
            description: "Aqui você pode visualizar tal coisa e fazer x coisa."
        },
        {
            nome: "Ajuste",
            href: "/routes/ajustes",
            icon: Ajuste,
            description: "Aqui você pode visualizar tal coisa e fazer x coisa."

        },
    ]

    return (
        <>
            <div className=" w-full flex flex-row mt-1">
                {menuSuperior.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={item.href}
                        className="flex p-1 rounded-lg">
                        <div className="text-center  bg-white drop-shadow-xl rounded-lg  ">
                            <Image src={item.icon} alt={"icones"} className="inline w-9 mt-4 bg-black" />
                            <div className="flex-auto">
                            <h1 className=" text-lg font-medium bg-white">{item.nome}</h1>
                            <p className="text-sm bg-white mb-5 mt-2">{item.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
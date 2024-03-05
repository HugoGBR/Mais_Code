"use client"

import {User} from "lucide-react"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

export default function SideBar() {

    const menuSuperior = [
        {
            nome: "Home",
            href: "/Rotas/Home"
        },
        {
            nome: "Cadastro",
            href: "/Rotas/Cadastros"
        },
        {
            nome: "Relatorio",
            href: "/Rotas/Relatorio"
        },
        {
            nome: "Financeiro",
            href: "/Rotas/Financeiro"
        },
        {
            nome: "Gestão",
            href: "/Rotas/Gestao"
        },
        {
            nome: "Ajuste",
            href: "/Rotas/Ajustes"
        },
    ]

    return (
        <>
            <div className="flex text-white">
                <div className="flex h-screen flex-col col-auto justify-between bg-[#122F54] p-2">
                    <div className="mt-5">
                        <Link href="/Rotas/Home" className="flex justify-center mb-14">
                            <div className="flex items-center">
                                <img src="/icon-logo.png" alt="Logo da Empresa" className="w-14"/>
                            </div>
                        </Link>
                        {menuSuperior.map((item) => (
                            // eslint-disable-next-line react/jsx-key
                            <Link href={item.href}
                                  className="flex text-lg p-2 font-medium hover:bg-white/10 rounded-lg">
                                <div className="flex items-center">
                                    <User className="mr-4 w-9 h-auto"/>
                                    {item.nome}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex-col mb-4">
                        <Link href={'/Rotas/Perfil'}
                              className="flex text-lg p-3 font-medium hover:bg-white/10 rounded-lg">
                            <div className="flex items-center">
                                <ul>
                                    <li className="flex items-center">
                                        <Avatar className="mr-4 w-9 h-auto">
                                            <AvatarImage src="https://github.com/shadcn.png"/>
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <span>Perfil</span>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                        <Link href={'app/page.tsx'}
                              className="flex text-lg p-3 font-medium hover:bg-white/10 rounded-lg">
                            <div className="flex items-center">
                                <ul>
                                    <li className="flex items-center">
                                        <User className="mr-4 w-9 h-auto"/>
                                        <span>Sair</span>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

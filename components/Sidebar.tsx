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
                                <img src="/icon-logo.png" alt="Logo da Empresa" className="md:w-auto lg:w-20"/>
                            </div>
                        </Link>
                        {menuSuperior.map((item) => (
                            // eslint-disable-next-line react/jsx-key
                            <Link href={item.href}
                                  className="flex text-lg mb-4 p-1 font-medium hover:bg-white/10 rounded-lg">
                                <div className="flex gap-3 justify-center items-center">
                                    <User className="md:w-12 h-auto lg:w-10"/>
                                    <div className="md:hidden lg:inline-block">
                                        {item.nome}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex-col mb-4">
                        <Link href={'/Rotas/Perfil'}
                              className="flex text-lg p-3 font-medium hover:bg-white/10 rounded-lg">
                            <div className="flex md:flex md:justify-center items-center">
                                <ul>
                                    <li className="flex items-center gap-3">
                                        <Avatar className="md:w-12 h-auto lg:w-10">
                                            <AvatarImage src="https://github.com/shadcn.png"/>
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <span className="md:hidden lg:inline-block">Perfil</span>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                        <Link href={'../'}
                              className="flex text-lg p-3 font-medium hover:bg-white/10 rounded-lg">
                            <div className="flex items-center">
                                <ul>
                                    <li className="flex items-center gap-3">
                                        <User className="md:w-12 h-auto lg:w-10"/>
                                        <span className="md:hidden lg:inline-block">Sair</span>
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

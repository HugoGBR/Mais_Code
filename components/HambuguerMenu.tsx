import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {IoMenuSharp} from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import {RxExit} from "react-icons/rx";
import React from "react";
import home from "@/public/icons/icon-home.png";
import cadastro from "@/public/icons/icon-cadastro.png";
import relatorio from "@/public/icons/icon-relatorio.png";
import financeiro from "@/public/icons/icon-financeiro.png";
import gestao from "@/public/icons/icon-gestao.png";
import ajustes from "@/public/icons/icon-ajuste.png";

const menuSuperior = [
    {
        nome: "Home",
        href: "/routes/home",
        icon: home
    },
    {
        nome: "Cadastro",
        href: "/routes/cadastros",
        icon: cadastro
    },
    {
        nome: "Relatorio",
        href: "/routes/relatorio",
        icon: relatorio
    },
    {
        nome: "Financeiro",
        href: "/routes/financeiro",
        icon: financeiro
    },
    {
        nome: "Gestão",
        href: "/routes/gestao",
        icon: gestao
    },
    {
        nome: "Ajuste",
        href: "/routes/ajustes",
        icon: ajustes
    },
]

export function HambuguerMenu() {
    const side = "left";

    return (
        <div className="p-3">
            <Sheet>
                <SheetTrigger asChild>
                    <IoMenuSharp className="w-10 h-auto">{side}</IoMenuSharp>
                </SheetTrigger>
                <SheetContent side={side}>
                    <div className="flex flex-col justify-between w-full h-screen">
                        <div>
                            <Link href="/Rotas/Home" className="flex mb-14">
                                <div className="flex p-4">
                                    <img src="/icon-logo.png" alt="Logo da Empresa" className=""/>
                                </div>
                            </Link>
                            {menuSuperior.map((item) => (
                                // eslint-disable-next-line react/jsx-key
                                <Link href={item.href}
                                      className="flex text-lg p-2 font-medium">
                                    <div className="flex gap-3 justify-center items-center">
                                        <Image src={item.icon} alt="icones menu" className="w-10 h-auto"/>
                                        <p>
                                            {item.nome}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mb-10">
                            <Link href={'/Rotas/Perfil'}
                                  className="flex text-lg p-2 font-medium">
                                <div className="flex items-center">
                                    <ul>
                                        <li className="flex items-center gap-3">
                                            <RxExit className="w-10 h-auto"/>
                                            <span className="md:hidden lg:inline-block">Perfil</span>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                            <Link href={'../'}
                                  className="flex text-lg p-2 font-medium">
                                <div className="flex items-center">
                                    <ul>
                                        <li className="flex items-center gap-3">
                                            <RxExit className="w-10 h-auto"/>
                                            <span className="md:hidden lg:inline-block">Sair</span>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
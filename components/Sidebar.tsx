"use client"
import home from "@/public/icons/icon-home.png"
import cadastro from "@/public/icons/icon-cadastro.png"
import relatorio from "@/public/icons/icon-relatorio.png"
import financeiro from "@/public/icons/icon-financeiro.png"
import gestao from "@/public/icons/icon-gestao.png"
import ajustes from "@/public/icons/icon-ajuste.png"
import { RxExit } from "react-icons/rx";
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import React from "react";
import Image from "next/image";

export default function SideBar() {

    const menuSuperior = [
        {
            nome: "Home",
            href: "/Rotas/Home",
            icon: home
        },
        {
            nome: "Cadastro",
            href: "/Rotas/Cadastros",
            icon: cadastro
        },
        {
            nome: "Relatorio",
            href: "/Rotas/Relatorio",
            icon: relatorio
        },
        {
            nome: "Financeiro",
            href: "/Rotas/Financeiro",
            icon: financeiro
        },
        {
            nome: "Gestão",
            href: "/Rotas/Gestao",
            icon: gestao
        },
        {
            nome: "Ajuste",
            href: "/Rotas/Ajustes",
            icon: ajustes
        },
    ]

    return (
        <>
            <div className="flex text-white">
                <div className="flex h-screen flex-col col-auto justify-between bg-[#122F54] p-2">
                    <div className="mt-5">
                        <Link href="/Rotas/Home" className="flex justify-center mb-14">
                            <div className="flex items-center">
                                <img src="/icon-logo.png" alt="Logo da Empresa" className="md:w-auto lg:w-16"/>
                            </div>
                        </Link>
                        {menuSuperior.map((item) => (
                            // eslint-disable-next-line react/jsx-key
                            <Link href={item.href}
                                  className="flex text-lg p-2 font-medium hover:bg-white/10 rounded-lg">
                                <div className="flex gap-3 justify-center items-center">
                                    <Image src={item.icon} alt="icones menu" className="w-10 h-auto"/>
                                    <p className="md:hidden lg:inline-block">
                                        {item.nome}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex-col mb-4">
                        <Link href={'/Rotas/Perfil'}
                              className="flex text-lg p-2 font-medium hover:bg-white/10 rounded-lg">
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
                              className="flex text-lg p-2 font-medium hover:bg-white/10 rounded-lg">
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
            </div>
        </>
    )
}

import home from "@/public/icons/icon-home.png";
import cadastro from "@/public/icons/icon-cadastro.png";
import relatorio from "@/public/icons/icon-relatorio.png";
import financeiro from "@/public/icons/icon-financeiro.png";
import gestao from "@/public/icons/icon-gestao.png";
import ajustes from "@/public/icons/icon-ajuste.png";
import {RxExit} from "react-icons/rx";
import Link from "next/link"
import React from "react";
import Image from "next/image";

export default function SideBar() {

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
            href:"/routes/financeiro",
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

    return (
        <>
            <div className="flex text-white">
                <div className="flex h-screen flex-col col-auto justify-between bg-[#122F54] p-2">
                    <div className="mt-5">
                        <Link href="/routes/home" className="flex justify-center mb-14">
                            <div className="flex items-center">
                                <img src="/icon-logo.png" alt="Logo da Empresa" className="md:w-auto lg:w-16"/>
                            </div>
                        </Link>
                        {menuSuperior.map((item) => (
                            // eslint-disable-next-line react/jsx-key
                            <Link href={item.href}
                                  className="flex w-full text-lg font-medium hover:bg-white/10 rounded-lg">
                                <div className="flex gap-3 p-2 items-center">
                                    <Image src={item.icon} alt="icones menu" className="w-10 h-auto"/>
                                    <p className="md:hidden md:flex lg:inline-block">
                                        {item.nome}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex-col mb-4">
                        <Link href={"/routes/perfil"}
                              className="flex text-lg p-2 font-medium hover:bg-white/10 rounded-lg">
                            <div className="flex md:flex md:justify-center items-center">
                                <ul>
                                    <li className="flex items-center gap-3">
                                        <RxExit className="w-10 h-auto"/>
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

import home from "@/public/icons/icon-home.png";
import cadastro from "@/public/icons/icon-cadastro.png";
import relatorio from "@/public/icons/icon-relatorio.png";
import financeiro from "@/public/icons/icon-financeiro.png";
import gestao from "@/public/icons/icon-gestao.png";
import ajustes from "@/public/icons/icon-ajuste.png";
import { RxExit } from "react-icons/rx";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function SideBar() {
    const menuSuperior = [
        { nome: "Home", href: "/routes/home", icon: home },
        { nome: "Cadastro", href: "/routes/cadastros", icon: cadastro },
        { nome: "Relatório", href: "/routes/relatorio", icon: relatorio },
        { nome: "Financeiro", href: "/routes/financeiro", icon: financeiro },
        { nome: "Gestão", href: "/routes/gestao", icon: gestao },
        { nome: "Ajuste", href: "/routes/ajustes", icon: ajustes },
    ];

    return (
        <div className="flex text-white">
            <div className="flex h-screen flex-col justify-between bg-[#122F54] p-2">
                <div className="mt-5">
                    <Link href="/routes/home">
                        <div className="flex justify-center mb-14">
                            <Image src="/icon-logo.png" alt="Logo da Empresa" width={64} height={64} />
                        </div>
                    </Link>
                    {menuSuperior.map((item) => (
                        <Link key={item.nome} href={item.href}>
                            <div className="flex w-full text-lg font-medium hover:bg-white/10 rounded-lg p-2 items-center gap-3">
                                <Image src={item.icon} alt={`Ícone de ${item.nome}`} className="w-10 h-auto"/>
                                <p className="hidden md:flex lg:inline-block">
                                    {item.nome}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex-col mb-4">
                    <Link href="/routes/perfil">
                        <div className="flex text-lg font-medium hover:bg-white/10 rounded-lg p-2 items-center gap-3">
                            <RxExit className="w-10 h-auto" />
                            <span className="hidden md:flex lg:inline-block">Perfil</span>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="flex text-lg font-medium hover:bg-white/10 rounded-lg p-2 items-center gap-3">
                            <RxExit className="w-10 h-auto" />
                            <span className="hidden md:flex lg:inline-block">Sair</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

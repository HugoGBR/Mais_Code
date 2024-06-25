import home from "@/public/icons/icon-home.png";
import cadastro from "@/public/icons/icon-cadastro.png";
import relatorio from "@/public/icons/icon-relatorio.png";
import financeiro from "@/public/icons/icon-financeiro.png";
import gestao from "@/public/icons/icon-gestao.png";
import ajustes from "@/public/icons/icon-ajuste.png";
import { RxExit } from "react-icons/rx";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

export default function SideBar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const menuSuperior = [
        { nome: "Home", href: "/routes/home", icon: home },
        { nome: "Cadastro", href: "/routes/cadastros", icon: cadastro },
        { nome: "Relatório", href: "/routes/relatorio", icon: relatorio },
        { nome: "Financeiro", href: "/routes/financeiro", icon: financeiro },
        { nome: "Gestão", href: "/routes/gestao", icon: gestao },
        { nome: "Ajuste", href: "/routes/ajustes", icon: ajustes },
    ];

    return (
        <div
            className={`flex text-white h-screen transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="flex flex-col justify-between bg-[#122F54] p-4 w-full">
                <div>
                    <Link href="/routes/home">
                        <div className={`flex justify-center mb-12 transform transition-transform duration-500 ${isExpanded ? 'rotate-360' : 'rotate-0'}`}>
                            <Image src="/icon-logo.png" alt="Logo da Empresa" width={50} height={50} />
                        </div>
                    </Link>
                    {menuSuperior.map((item) => (
                        <Link key={item.nome} href={item.href}>
                            <div className="flex w-full text-lg font-medium hover:bg-white/10 rounded-lg p-3 items-center gap-3 transition-all duration-200 ease-in-out transform hover:scale-105">
                                <Image src={item.icon} alt={`Ícone de ${item.nome}`} width={30} height={30} />
                                <p className={`transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'} hidden md:block`}>{item.nome}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col space-y-2">
                    <Link href="/routes/perfil">
                        <div className="flex text-lg font-medium hover:bg-white/10 rounded-lg p-3 items-center gap-3 transition-all duration-200 ease-in-out transform hover:scale-105">
                            <Image src={"/icon-perfil-branco.png"} alt="Perfil ícone" width={30} height={30} />
                            <span className={`transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'} hidden md:block`}>Perfil</span>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="flex text-lg font-medium hover:bg-white/10 rounded-lg p-3 items-center gap-3 transition-all duration-200 ease-in-out transform hover:scale-105">
                            <RxExit className="w-6 h-6 md:w-8 md:h-8" />
                            <span className={`transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'} hidden md:block`}>Sair</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

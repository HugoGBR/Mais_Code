import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IoMenuSharp } from "react-icons/io5";
import Link from "next/link";
import React from "react";


const menuSuperior = [
    { nome: "Home", href: "/routes/home" },
    { nome: "Cadastro", href: "/routes/cadastros" },
    { nome: "Relatório", href: "/routes/relatorio" },
    { nome: "Financeiro", href: "/routes/financeiro" },
    { nome: "Gestão", href: "/routes/gestao" },
    { nome: "Ajuste", href: "/routes/ajustes" },
    { nome: "Perfil", href: "/routes/perfil" },
    { nome: "Sair", href: "/" },
];

export function HambuguerMenu() {
    const side = "left";

    return (
        <div className="p-3">
            <Sheet>
                <SheetTrigger asChild>
                    <IoMenuSharp className="w-10 h-auto">{side}</IoMenuSharp>
                </SheetTrigger>
                <SheetContent side={side}>
                    <div className="flex flex-col justify-between w-full h-screen py-10">
                        <div>
                            {menuSuperior.map((item) => (
                                <Link key={item.nome} href={item.href}>
                                    <div className="font-medium p-5">
                                        <h1>{item.nome}</h1>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faFileAlt, faMoneyBillAlt, faChartBar, faCog, faSignOutAlt, faCircleUser, faPenToSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { getCookie } from "@/lib/coockie";
import { escolheTipoCliente } from "@/lib/UsuarioController";


interface MenuItem {
    nome: string;
    href: string;
    icon: IconDefinition;
    cargosPermitidos: string[];
}

export default function SideBar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [menuFiltrado, setMenuFiltrado] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchMenu = async () => {
            const cargoValue = await getCookie("UserCargo");
            const nomeCargo = escolheTipoCliente(Number(cargoValue));


            if (nomeCargo) {
                const menuSuperior = [
                    { nome: "Home", href: "/routes/home", icon: faHome, cargosPermitidos: ["Administrador","Vendedor","Financeiro"] },
                    { nome: "Cadastro", href: "/routes/cadastros", icon: faPenToSquare, cargosPermitidos: ["Administrador", "Vendedor"] },
                    { nome: "Relatório", href: "/routes/relatorio", icon: faFileAlt, cargosPermitidos: ["Administrador","Financeiro"] },
                    { nome: "Financeiro", href: "/routes/financeiro", icon: faMoneyBillAlt, cargosPermitidos: ["Administrador","Vendedor", "Financeiro"] },
                    { nome: "Gestão", href: "/routes/gestao", icon: faChartBar, cargosPermitidos: ["Administrador"] },
                    { nome: "Ajuste", href: "/routes/ajustes", icon: faCog, cargosPermitidos: ["Administrador"] },
                ];
                const menuFiltrado = menuSuperior.filter((menu) =>
                    menu.cargosPermitidos.includes(nomeCargo) || menu.cargosPermitidos.length === 0
                );

                setMenuFiltrado(menuFiltrado);
            }
            
        };

        fetchMenu();
    }, []);


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
                            <img src="/icon-logo.png" alt="Logo da Empresa" width={50} height={50} />
                        </div>
                    </Link>
                    {menuFiltrado.map((item) => (
                        <Link key={item.nome} href={item.href}>
                            <div className="flex w-full text-lg font-medium hover:bg-white/10 rounded-lg p-3 items-center gap-3 transition-all duration-200 ease-in-out transform hover:scale-105">
                                <FontAwesomeIcon icon={item.icon} />
                                <p className={`transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'} hidden md:block`}>{item.nome}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex flex-col space-y-2">
                    <Link href="/routes/perfil">
                        <div className="flex text-lg font-medium hover:bg-white/10 rounded-lg p-3 items-center gap-3 transition-all duration-200 ease-in-out transform hover:scale-105">
                            <FontAwesomeIcon icon={faCircleUser} />
                            <span className={`transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'} hidden md:block`}>Perfil</span>
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="flex text-lg font-medium hover:bg-white/10 rounded-lg p-3 items-center gap-3 transition-all duration-200 ease-in-out transform hover:scale-105">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span  className={`transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'} hidden md:block`}>Sair</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

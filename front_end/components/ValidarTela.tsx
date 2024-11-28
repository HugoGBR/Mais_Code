"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCookie } from "@/lib/coockie";
import { escolheTipoCliente } from "@/lib/UsuarioController";

export default function AuthGuard({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    const permissoesPorCargo: Record<string, string[]> = {
        Administrador: [
            "/routes/home",
            "/routes/perfil",
            "/routes/cadastros",
            "/routes/cadastros/Cliente",
            "/routes/relatorio",
            "/routes/relatorio/[id]",
            "/routes/relatorio/TableComissao",
            "/routes/financeiro",
            "/routes/financeiro/[id]",
            "/routes/gestao",
            "/routes/gestao/cliente",
            "/routes/gestao/cliente/[id]",
            "/routes/gestao/user/[id]",
            "/routes/gestao/Usuario",
            "/routes/ajustes",
            "/routes/ajustes/Contrato",
            "/routes/ajustes/Produtos",
            "/routes/ajustes/ModeloContrato",

        ],
        Vendedor: [
            "/routes/home",
            "/routes/cadastros",
            "/routes/cadastros/Cliente",
            "/routes/relatorio/[id]",
            "/routes/financeiro",
            "/routes/financeiro/[id]",
        ],
        Financeiro: ["/routes/home", 
        "/routes/relatorio", 
        "/routes/relatorio/[id]", 
        "/routes/relatorio/TabelaComissao", 
        "/routes/financeiro",
        "/routes/financeiro/[id]"
    ],
    };

    const verificaPermissao = (cargo: string, path: string): boolean => {
        const permissoes = permissoesPorCargo[cargo] || [];
        return permissoes.some((rota) => {
            if (rota.includes("[id]")) {
                const regex = new RegExp(
                    `^${rota.replace("[id]", "[^/]+")}$`
                );
                return regex.test(path);
            }
            return rota === path;
        });
    };

    useEffect(() => {
        const checkAuth = async () => {
            const cookie = await getCookie("CookiCriado");

            if (pathname === "/") {
                setIsLoading(false);
                return;
            }

            if (!cookie) {
                router.push("/");
                return;
            }

            const cargoId = await getCookie("UserCargo");
            const nomeCargo = escolheTipoCliente(Number(cargoId));

            if (!nomeCargo || !verificaPermissao(nomeCargo, pathname)) {
                alert("Você não tem permissão para acessar esta página.");
                router.push("/routes/home");
                return;
            }

            setIsLoading(false);
        };

        checkAuth();
    }, [router, pathname]);

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    return <>{children}</>;
}
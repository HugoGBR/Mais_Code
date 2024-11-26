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
            "/routes/cadastros",
            "/routes/relatorio",
            "/routes/financeiro",
            "/routes/gestao",
            "/routes/ajustes",
        ],
        Vendedor: [
            "/routes/home",
            "/routes/cadastros",
            "/routes/relatorio",
            "/routes/financeiro",
        ],
        Financeiro: ["/routes/home", "/routes/relatorio", "/routes/financeiro"],
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

            if (!nomeCargo || !permissoesPorCargo[nomeCargo]?.includes(pathname)) {
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
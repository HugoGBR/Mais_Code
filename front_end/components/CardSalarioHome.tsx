import { remuneracaoComissao } from "@/lib/RelatorioComissaoController";
import { getCookie } from "@/lib/coockie";
import React, { useEffect, useState } from "react";

export default function CardSalarioHome() {
    const [comissaoTotal, setComissaoTotal] = useState(0);
    const [usuario_id, set_usuario_id] = useState("");

    useEffect(() => {
        async function fetchUsername() {
            const user = await getCookie("CookiCriado");
            set_usuario_id(user || "Usuário");
        }
        fetchUsername();
    }, []);

    useEffect(() => {
        if (usuario_id) {
            carregarRemuneracao();
        }
    }, [usuario_id]);

    async function carregarRemuneracao() {
        try {
            const remuneracao = await remuneracaoComissao(Number(usuario_id));
            if (Array.isArray(remuneracao) && remuneracao.length > 0) {
                const valor = remuneracao[0]["SUM(comissao_total)"];
                const comissao = isNaN(parseFloat(valor)) ? 0 : parseFloat(valor);
                setComissaoTotal(comissao);
            } else {
                setComissaoTotal(0);
            }
        } catch (error) {
            console.error('Failed to load remuneracao:', error);
            setComissaoTotal(0);
        }
    }

    return (
        <div className='rounded-lg flex flex-col justify-end bg-white border hover:drop-shadow-lg py-2 px-4'>
            <h1 className='text-center text-xl font-bold text-gray-700'>Remuneração do Mês</h1>
            <p className='text-2xl text-left font-medium text-blue-500'>R${comissaoTotal.toFixed(2)}</p>
        </div>
    );
}

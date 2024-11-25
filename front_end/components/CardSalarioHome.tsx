import { remuneracaoComissao } from "@/lib/RelatorioComissaoController";
import { getCookie } from "@/lib/coockie";
import { useEffect, useState } from "react";

export default function CardSalarioHome() {
    const [comissaoTotal, setComissaoTotal] = useState(0);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const usuario_id = await getCookie("CookiCriado");
                if (!usuario_id) return;

                const remuneracao = await remuneracaoComissao(Number(usuario_id));
                const valor = remuneracao?.[0]?.["SUM(comissao_total)"] ?? 0;
                setComissaoTotal(parseFloat(valor) || 0);
            } catch {
                setComissaoTotal(0);
            }
        };

        carregarDados();
    }, []);

    return (
        <div className='rounded-lg flex flex-col justify-end bg-white border hover:drop-shadow-lg py-2 px-4'>
            <h1 className='text-xl font-bold text-gray-700'>Remuneração do Mês</h1>
            <p className='text-2xl text-left font-medium text-blue-500'>R${comissaoTotal.toFixed(2)}</p>
        </div>
    );
}
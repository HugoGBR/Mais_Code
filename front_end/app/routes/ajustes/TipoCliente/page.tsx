'use client'

import { createNewTipoCliente } from "@/lib/TipoClienteController";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function TipoCliente() {
    const [nomeTipoCliente, setNomeTipoCliente] = useState<string>('');
    const [porcentagem, setPorcetagem] = useState<string>('');

    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await createNewTipoCliente(
            nomeTipoCliente,
            Number(porcentagem)
        );
        router.push('/routes/ajustes');
    };

    return (
        <div className="flex h-full justify-center items-center">
            <div className="w-full bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-8 text-center">Tipo de Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-5">
                        <input
                            type="text"
                            id="nomeTipoCliente"
                            name="nomeTipoCliente"
                            value={nomeTipoCliente}
                            onChange={(event) => setNomeTipoCliente(event.target.value)}
                            placeholder="Tipo de Cliente"
                            required
                            className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="number"
                            id="porcentagem"
                            maxLength={3}
                            name="porcentagem"
                            value={porcentagem}
                            onChange={(event) => setPorcetagem(event.target.value)}
                            placeholder="Porcentagem 99%"
                            required
                            className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded w-full">
                            CADASTRAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
"use client";
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createNewTipoContrato } from '@/lib/TipoContratoController';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from '@/components/ui/use-toast';

export default function ModeloContrato() {
    const { toast } = useToast();
    const [nomeContrato, setNomeContrato] = useState<string>('');
    const router = useRouter();

    const resetForm = () => {
        setNomeContrato('');
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await createNewTipoContrato(nomeContrato);

            if (response.status === 1) {
                toast({
                    title: "Sucesso",
                    description: "Tipo de Contrato cadastrado com sucesso!",
                    className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
                });
                resetForm();
                router.push('/routes/ajustes');
            } else {
                throw new Error("Erro ao cadastrar o Tipo de Contrato: resposta inválida");
            }
        } catch (error) {
            console.error("Erro ao cadastrar o Tipo de Contrato:", error);
            toast({
                title: "Erro",
                description: "Falha ao cadastrar o Tipo de Contrato. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
        }
    };

    return (
        <div className="flex h-full justify-center items-center">
            <div className="w-full bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-8 text-center">Tipo de Contrato</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="tipoContrato"
                            name="tipoContrato"
                            value={nomeContrato}
                            onChange={(event) => setNomeContrato(event.target.value)}
                            placeholder="Tipo de Contrato"
                            required
                            className="w-full border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded w-full">
                            CADASTRAR
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
}
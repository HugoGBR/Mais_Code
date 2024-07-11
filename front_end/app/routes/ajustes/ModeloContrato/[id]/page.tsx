"use client"
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getContratoById, updateContratoById } from '@/lib/TipoContratoController';

interface Props {
    params: {
        id: number;
    };
}

const ModeloContrato: React.FC<Props> = ({ params }) => {
    const [nomeContrato, setNomeContrato] = useState<string>('');
    const [dadosContrato, setDadosContrato] = useState<{ nome: string }>({ nome: '' });
    const router = useRouter();

    useEffect(() => {
        const fetchContrato = async () => {
            try {
                const contrato = await getContratoById(params.id);
                if (contrato && contrato.nome) {
                    setDadosContrato({ nome: contrato.nome });
                    setNomeContrato(contrato.nome);
                } else {
                    console.error('Contrato não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar contrato:', error);
            }
        };

        fetchContrato();
    }, [params.id]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            if (params.id !== null) {
                await updateContratoById(nomeContrato, params.id);
                router.push('/routes/ajustes');
            } else {
                console.error('ID do contrato inexistente.');
            }
        } catch (error) {
            console.error('Erro ao salvar contrato:', error);
        }
    };

    return (
        <div className="flex h-full justify-center items-center">
            <div className="w-full bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-8 text-center">Editar Tipo de Contrato</h2>
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
                            ATUALIZAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModeloContrato;

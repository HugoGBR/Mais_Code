"use client"
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getContratoById, updateContratoById } from '@/lib/TipoContratoController';
import { toast } from '@/components/ui/use-toast';

interface Props {
    params: {
        id: number;
    };
}

const ModeloContrato: React.FC<Props> = ({ params }) => {
    const [nomeContrato, setNomeContrato] = useState<string>('');
    const [dadosContrato, setDadosContrato] = useState<{ nome: string }>({ nome: '' });
    const router = useRouter();
    const [inputsHabilitados, setInputHabilitados] = useState(false);

    useEffect(() => {
        const fetchContrato = async () => {
            try {
                const contrato = await getContratoById(params.id);
                if (contrato && contrato.nome) {
                    setDadosContrato({ nome: contrato.nome });
                    setNomeContrato(contrato.nome);
                } else {
                    toast({
                        title: "Erro",
                        description: "Contrato não encontrado. Por favor, tente novamente.",
                        className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
                    });
                    
                }
            } catch (error) {
                toast({
                    title: "Erro",
                    description: "Erro ao buscar contrato:. Por favor, tente novamente.",
                    className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
                });
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
                toast({
                    title: "Erro",
                    description: "ID do contrato inexistente. Por favor, tente novamente.",
                    className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
                });
                
            }
        } catch (error) {
            
            toast({
                title: "Erro",
                description: "Erro ao salvar contrato. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
        }
    };
    const HabilitarEventos = () => {
        setInputHabilitados(true);
    }

    const handleButtonClick = async () => {
        if (inputsHabilitados) {
            await updateContratoById(nomeContrato, params.id);
            router.push('/routes/ajustes');
        } else {
            HabilitarEventos();
        }
    };
    return (
        <div className="flex h-full justify-center items-center">
            <div className="w-full bg-white border hover:shadow-xl rounded-2xl p-5">
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
                            disabled={!inputsHabilitados}
                            required
                            className="w-full border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className='text-center'>
                        <button type='button' onClick={handleButtonClick}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded w-full">
                            {inputsHabilitados ? "Alterar" : "Editar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModeloContrato;

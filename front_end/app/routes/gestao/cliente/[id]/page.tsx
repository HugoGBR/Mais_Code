'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getClienteById, updateClientByID } from "@/lib/ClienteController";
import { insertMaskCpfCnpj, insertMaskTelefone } from "@/lib/MaskInput/MaskInput";
import { useForm } from "react-hook-form";
import { clientSchema } from "@/app/schemas/clientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type LoginFormSchema = z.infer<typeof clientSchema>;

export default function App({ params }: { params: { id: number } }) {
    const [dadosCliente, setDadosCliente] = useState({ nome: "", email: "", telefone: "", cpf_cnpj: "" });
    const router = useRouter();
    const [inputsHabilitados, setInputHabilitados] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginFormSchema>({
        resolver: zodResolver(clientSchema)
    });
    
    const HabilitarEventos = () => {
        setInputHabilitados(true);
    }

    useEffect(() => {
        const setDados = async () => {
            const cliente = await getClienteById(params.id);
            setDadosCliente(cliente);

            // Atualizando os valores no formulário com as máscaras aplicadas
            setValue('telefone', insertMaskTelefone(cliente.telefone));
            setValue('cpf_cnpj', insertMaskCpfCnpj(cliente.cpf_cnpj));
        };

        setDados();
    }, [params.id, setValue]);

    const handleTelefoneChange = (event: any) => {
        const { value } = event.target;
        const maskedValue = insertMaskTelefone(value);
        setValue('telefone', maskedValue);
        setDadosCliente({ ...dadosCliente, telefone: maskedValue });
    };

    const handleCpfCnpjChange = (event: any) => {
        const { value } = event.target;
        const maskedValue = insertMaskCpfCnpj(value);
        setValue('cpf_cnpj', maskedValue);
        setDadosCliente({ ...dadosCliente, cpf_cnpj: maskedValue });
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateClientByID(dadosCliente.nome, dadosCliente.email, dadosCliente.telefone, dadosCliente.cpf_cnpj, params.id);
        router.push('/routes/gestao');
    };

    const handleButtonClick = async () => {
        if (inputsHabilitados) {
            await updateClientByID(dadosCliente.nome, dadosCliente.email, dadosCliente.telefone, dadosCliente.cpf_cnpj, params.id);
            router.push('/routes/gestao');
        } else {
            HabilitarEventos();
        }
    };

    return (
        <div>
            <form onSubmit={handleEditSubmit}>
                <div className="flex justify-center items-center bg-gray-100">
                    <Card className="p-10 drop-shadow-xl rounded-xl">
                        <div className="h-12 mb-5">
                            <h1 className="font-bold text-2xl">Cliente</h1>
                        </div>
                        <div className="flex justify-center items-center opacity-40 mb-10">
                            <img src="/icons/icon-empresa.png" className="w-28" alt="imagem" />
                        </div>

                        <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="flex flex-col space-y-1.5">
                                <input type="text"
                                    value={dadosCliente.nome}
                                    onChange={(e) => setDadosCliente({ ...dadosCliente, nome: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="nome" placeholder="Nome"
                                    disabled={!inputsHabilitados}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input type="text"
                                    value={dadosCliente.email}
                                    onChange={(e) => setDadosCliente({ ...dadosCliente, email: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="email" placeholder="Email"
                                    disabled={!inputsHabilitados}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <input
                                type="text"
                                className={`border-b-2 focus:border-b-2 ${errors.telefone ? 'border-red-500' : ''}`}
                                placeholder="Telefone"
                                {...register('telefone')}
                                onChange={handleTelefoneChange}
                            />
                            {errors.telefone && <div className="text-red-500">{errors.telefone.message}</div>}
                        </div>
                            <div className="flex flex-col space-y-1.5">
                            <input
                                type="text"
                                className={`border-b-2 focus:border-b-2 ${errors.cpf_cnpj ? 'border-red-500' : ''}`}
                                placeholder="CPF/CNPJ"
                                {...register('cpf_cnpj')}
                                onChange={handleCpfCnpjChange}
                            />
                            {errors.cpf_cnpj && <div className="text-red-500">{errors.cpf_cnpj.message}</div>}
                        </div>
                        </div>
                        <div className='flex justify-center'>
                            <button type='button' onClick={handleButtonClick}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                {inputsHabilitados ? "Alterar" : "Editar"}
                            </button>
                        </div>
                    </Card>
                </div>
            </form>
        </div>
    );
}

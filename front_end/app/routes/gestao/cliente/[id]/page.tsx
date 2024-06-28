'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getClienteById, updateClientByID } from "@/lib/ClienteController";

export default function App({ params }: { params: { id: number } }) {
    const [dadosCliente, setDadosCliente] = useState({ nome: "", email: "", telefone: "", cpf_cnpj: "" });
    const router = useRouter();

    useEffect(() => {
        const setDados = async () => {
            const cliente = await getClienteById(params.id);
            setDadosCliente(cliente);
        };

        setDados();
    }, [params.id]);

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateClientByID(dadosCliente.nome, dadosCliente.email, dadosCliente.telefone, dadosCliente.cpf_cnpj, params.id);
        router.push('/routes/gestao');
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
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input type="text"
                                    value={dadosCliente.email}
                                    onChange={(e) => setDadosCliente({ ...dadosCliente, email: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="email" placeholder="Email"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input type="text"
                                    value={dadosCliente.telefone}
                                    onChange={(e) => setDadosCliente({ ...dadosCliente, telefone: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="telefone" placeholder="Telefone"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input type="text"
                                    value={dadosCliente.cpf_cnpj}
                                    onChange={(e) => setDadosCliente({ ...dadosCliente, cpf_cnpj: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="cpf_cnpj" placeholder="CPF/CNPJ"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded" type="submit">EDITAR CLIENTE</button>
                        </div>
                    </Card>
                </div>
            </form>
        </div>
    );
}

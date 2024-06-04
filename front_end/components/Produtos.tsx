"use client"
import React, { useState, FormEvent } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createNewProduto } from '@/lib/produtoController';
import { useRouter } from 'next/navigation';

export default function CadastroProduto() {
    const [nomeProduto, setNomeProduto] = useState<string>('');
    const [valorProduto, setValorProduto] = useState<string>('');
    const [valorComissaoA, setValorComissaoA] = useState<string>('');
    const [valorComissaoB, setValorComissaoB] = useState<string>('');
    
    const [descricaoProduto, setDescricaoProduto] = useState<string>('');
    const descricaoLimiteCaracteres = 255;
    const route = useRouter()
    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const descricao = event.target.value;
        // Verifica se a descrição excede o limite de caracteres
        if (descricao.length <= descricaoLimiteCaracteres) {
            setDescricaoProduto(descricao);
        }
    };

    async function handleSubmit() {
        await createNewProduto(nomeProduto, Number(valorProduto),Number(valorComissaoA), Number(valorComissaoB), descricaoProduto);
        route.push("/routes/gestao");

    };

    return (
        <div className="flex flex-col h-screen">
            {/* Card de Cadastro */}
            <div className=" flex justify-center items-center flex-grow">
                <div className=" max-w-lg w-full bg-white shadow-xl rounded-md p-8"> {/* Removida a classe text-center do card */}
                    <h2 className="text-2xl font-semibold mb-4 text-center">Cadastro Produto</h2> {/* Centralizando apenas o título "Cadastro Produto" */}
                    <form onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="nomeProduto"
                                name="nomeProduto"
                                value={nomeProduto}
                                onChange={(event) => setNomeProduto(event.target.value)}
                                placeholder="Nome do Produto"
                                required
                                className="w-full border-b-2 focus:border-b-2
                                focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="space-x-4 mb-4 grid grid-cols-3 rounded-none">
                            <input
                                type="text"
                                id="valorProduto"
                                name="valorProduto"
                                value={valorProduto}
                                onChange={(event) => setValorProduto(event.target.value)}
                                placeholder="R$"
                                required
                                className="border-b-2 focus:border-b-2
                                focus:outline-none focus:border-blue-500"
                            />
                            <div>
                            <input
                                type="text"
                                id="ValorComissaoA"
                                name="ValorComissaoA"
                                value={valorComissaoA}
                                onChange={(event) => setValorComissaoA(event.target.value)}
                                placeholder="A%"
                                required
                                className="border-b-2 focus:border-b-2
                                focus:outline-none focus:border-blue-500"
                            />
                            </div>

                            <div>
                            <input
                                type="text"
                                id="ValorComissaoB"
                                name="ValorComissaoB"
                                value={valorComissaoB}
                                onChange={(event) => setValorComissaoB(event.target.value)}
                                placeholder="B%"
                                required
                                className="border-b-2 focus:border-b-2
                                focus:outline-none focus:border-blue-500"
                            />
                            </div>
                        </div>

                        <div className="mb-4 flex flex-col">
                            <div>
                                <textarea
                                    id="descricaoProduto"
                                    name="descricaoProduto"
                                    value={descricaoProduto}
                                    onChange={handleDescricaoChange}
                                    placeholder="Descrição do Produto"
                                    rows={4}
                                    maxLength={descricaoLimiteCaracteres}
                                    className="shadow-inner-2 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                                {/* Exibe o contador de caracteres restantes */}
                                <div className="flex justify-end">
                                    <p className="text-sm text-gray-500">{descricaoProduto.length}/{descricaoLimiteCaracteres}</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                CADASTRAR
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

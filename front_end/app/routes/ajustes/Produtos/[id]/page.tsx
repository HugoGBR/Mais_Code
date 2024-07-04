'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProdutoById, updateProdutoById } from '@/lib/ProdutoController';
import { Card } from '@/components/ui/card';

export default function CadastroProduto({ params }: { params: { id: number } }) {
    const [produto, setProduto] = useState({
        nome: '',
        horas_trabalhadas: 0,
        descricao_produto: '',
        comissaoAntigo: '',
        comissaoNovo: ''
    });
    const [descricaoLimiteCaracteres] = useState(255);
    const router = useRouter();

    useEffect(() => {
        const loadProduto = async () => {
            try {
                const produtoData = await getProdutoById(params.id);
                setProduto({
                    nome: produtoData.nome,
                    horas_trabalhadas: produtoData.horas_trabalhadas,
                    descricao_produto: produtoData.descricao_produto,
                    comissaoAntigo: produtoData.comissao_antiga,
                    comissaoNovo: produtoData.comissao_nova
                });
            } catch (error) {
                console.error('Erro ao carregar produto:', error);
            }
        };

        if (params.id) {
            loadProduto();
        }
    }, [params.id]);

    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const descricao = event.target.value;
        if (descricao.length <= descricaoLimiteCaracteres) {
            setProduto({ ...produto, descricao_produto: descricao });
        }
    };

    const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateProdutoById(
                produto.nome,
                produto.horas_trabalhadas,
                produto.descricao_produto,
                produto.comissaoAntigo,
                produto.comissaoNovo,
                params.id
            );
            router.push('/routes/ajustes');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleEditSubmit}>
                <div className="flex justify-center items-center bg-gray-100 mt-10">
                    <Card className="p-10 drop-shadow-xl rounded-xl">
                        <div className="h-12 mb-5">
                            <h1 className="font-bold text-2xl">Cadastro Produto</h1>
                        </div>
                        <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="text"
                                    value={produto.nome}
                                    onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="nome"
                                    placeholder="Nome"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="number"
                                    value={produto.horas_trabalhadas}
                                    onChange={(e) => setProduto({ ...produto, horas_trabalhadas: Number(e.target.value) })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="horasTrabalhadas"
                                    placeholder="Horas Trabalhadas"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="text"
                                    value={produto.comissaoNovo}
                                    onChange={(e) => setProduto({ ...produto, comissaoNovo: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="comissaoNovo"
                                    placeholder="Nova Comissão"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="text"
                                    value={produto.comissaoAntigo}
                                    onChange={(e) => setProduto({ ...produto, comissaoAntigo: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="comissaoAntigo"
                                    placeholder="Comissão Antiga"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <textarea
                                    id="descricaoProduto"
                                    value={produto.descricao_produto}
                                    onChange={handleDescricaoChange}
                                    placeholder="Descrição do Produto"
                                    rows={4}
                                    maxLength={descricaoLimiteCaracteres}
                                    className="shadow-inner-2 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                                <div className="flex justify-end">
                                    <p className="text-sm text-gray-500">
                                        {produto.descricao_produto.length}/{descricaoLimiteCaracteres}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Atualizar Produto
                            </button>
                        </div>
                    </Card>
                </div>
            </form>
        </div>
    );
}

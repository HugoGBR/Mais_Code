'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProdutoById, updateProdutoById } from '@/lib/ProdutoController';

export default function CadastroProduto({ params }: { params: { id: number } }) {
    const [produto, setProduto] = useState({
        nome: '',
        horas_trabalhadas: 0,
        descricao_produto: '',
        comissaoNovo: '',
        comissaoAntigo: ''
    });
    const [descricaoLimiteCaracteres] = useState(255);
    const [inputsHabilitados, setInputHabilitados] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadProduto = async () => {
            try {
                const produtoData = await getProdutoById(params.id);
                setProduto({
                    nome: produtoData.nome,
                    horas_trabalhadas: produtoData.horas_trabalhadas,
                    descricao_produto: produtoData.descricao_produto,
                    comissaoNovo: produtoData.comissao_nova,
                    comissaoAntigo: produtoData.comissao_antiga
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
    const HabilitarEventos = () => {
        setInputHabilitados(true);
    }

    const handleButtonClick = async () => {
        if (inputsHabilitados) {
            await updateProdutoById(
                produto.nome,
                produto.horas_trabalhadas,
                produto.descricao_produto,
                produto.comissaoAntigo,
                produto.comissaoNovo,
                params.id
            );
            router.push('/routes/ajustes');
        } else {
            HabilitarEventos();
        }
    };

    return (
        <div>
            <form onSubmit={handleEditSubmit}>
                <div className="flex flex-col h-screen">
                    <div className="flex justify-center items-center flex-grow">
                        <div className="max-w-lg w-full bg-white border hover:shadow-xl rounded-2xl p-5">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Editar Produto</h2>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={produto.nome}
                                    onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="nome"
                                    placeholder="Nome"
                                    disabled={!inputsHabilitados}
                                    required
                                />
                            </div>
                            <div className="gap-5 mb-4 grid grid-cols-3 rounded-none">
                                <input
                                    type="number"
                                    value={produto.horas_trabalhadas}
                                    onChange={(e) => setProduto({ ...produto, horas_trabalhadas: Number(e.target.value) })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="horasTrabalhadas"
                                    placeholder="Horas Trabalhadas"
                                    disabled={!inputsHabilitados}
                                    required
                                />
                                <input
                                    type="text"
                                    value={produto.comissaoNovo}
                                    onChange={(e) => setProduto({ ...produto, comissaoNovo: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="comissaoNovo"
                                    placeholder="Nova Comissão"
                                    disabled={!inputsHabilitados}
                                    required
                                />
                                <input
                                    type="text"
                                    value={produto.comissaoAntigo}
                                    onChange={(e) => setProduto({ ...produto, comissaoAntigo: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="comissaoAntigo"
                                    placeholder="Comissão Antiga"
                                    disabled={!inputsHabilitados}
                                    required
                                />
                            </div>

                            <div className="mb-4 flex flex-col">
                                <div>
                                    <textarea
                                        id="descricaoProduto"
                                        value={produto.descricao_produto}
                                        onChange={handleDescricaoChange}
                                        placeholder="Descrição do Produto"
                                        rows={4}
                                        maxLength={descricaoLimiteCaracteres}
                                        className="shadow-inner-2 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={!inputsHabilitados}
                                    ></textarea>
                                    <div className="flex justify-end">
                                        <p className="text-sm text-gray-500">
                                            {produto.descricao_produto.length}/{descricaoLimiteCaracteres}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center'>
                                <button type='button' onClick={handleButtonClick}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    {inputsHabilitados ? "Alterar" : "Editar"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

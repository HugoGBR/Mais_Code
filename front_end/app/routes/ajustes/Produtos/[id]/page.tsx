'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProdutoById, updateProdutoById } from '@/lib/ProdutoController';
import { entradaMask, percentageMask, removerMascaraValorMonetario } from '@/lib/MaskInput/MaskInput';
import { toast } from '@/components/ui/use-toast';

export default function CadastroProduto({ params }: { params: { id: number } }) {
    const [produto, setProduto] = useState({
        nome: '',
        horas_trabalhadas: '',
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
                toast({
                    title: "Erro",
                    description: "Erro ao carregar produto. Por favor, tente novamente.",
                    className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
                });
                
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
                Number(produto.horas_trabalhadas),
                produto.descricao_produto,
                produto.comissaoAntigo,
                produto.comissaoNovo,
                params.id
            );
            router.push('/routes/ajustes');
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao atualizar produto. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
            
        }
    };
    const HabilitarEventos = () => {
        setInputHabilitados(true);
    }

    const handleButtonClick = async () => {
        if (inputsHabilitados) {
            try {
                const horasTrabalhadaSemMascara = removerMascaraValorMonetario(produto.horas_trabalhadas);
                const response = await updateProdutoById(
                    produto.nome,
                    horasTrabalhadaSemMascara,
                    produto.descricao_produto,
                    produto.comissaoAntigo,
                    produto.comissaoNovo,
                    params.id
                );
                
                
                if (response.status === 1) { 
                    
                    toast({
                        title: "Sucesso",
                        description: "Produto atualizado com sucesso!",
                        className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
                    });
                    
                    router.push('/routes/ajustes');
                } else {
                    throw new Error("Erro ao atualizar o produto: resposta inválida");
                }
            } catch (error) {
                console.error("Erro ao atualizar o produto:", error);
                toast({
                    title: "Erro",
                    description: "Erro ao atualizar produto. Por favor, tente novamente.",
                    className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
                });
            }
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
                                    className="w-full border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="nome"
                                    placeholder="Nome"
                                    disabled={!inputsHabilitados}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-5 mb-4">
                                <div className="relative col-span-1">
                                    <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500">
                                        R$
                                    </span>
                                    <input
                                        type="text"
                                        value={produto.horas_trabalhadas}
                                        onChange={(event) => {
                                            const valorComMascara = entradaMask(event.target.value);
                                            setProduto({ ...produto, horas_trabalhadas: valorComMascara });
                                        }}
                                        className="pl-8 w-full border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                        id="horasTrabalhadas"
                                        placeholder="15.000,00"
                                        disabled={!inputsHabilitados}
                                        required
                                    />
                                </div>
                                <input
                                    type="text"
                                    value={produto.comissaoNovo}
                                    onChange={(event) => {
                                        const valorComMascara = percentageMask(event.target.value);
                                        setProduto({ ...produto, comissaoNovo: valorComMascara });
                                    }}
                                    className="col-span-1 w-full border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="comissaoNovo"
                                    placeholder="Nova Comissão"
                                    disabled={!inputsHabilitados}
                                    required
                                />
                                <input
                                    type="text"
                                    value={produto.comissaoAntigo}
                                    onChange={(event) => {
                                        const valorComMascara = percentageMask(event.target.value);
                                        setProduto({ ...produto, comissaoAntigo: valorComMascara });
                                    }}
                                    className="col-span-1 w-full border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
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
                                    {inputsHabilitados ? "Salvar" : "Editar"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

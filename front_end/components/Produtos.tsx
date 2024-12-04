"use client";
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createNewProduto } from '@/lib/ProdutoController';
import { entradaMask, percentageMask, removerMascaraPorcentagem, removerMascaraValorMonetario } from '@/lib/MaskInput/MaskInput';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from './ui/use-toast';

export default function CadastroProduto() {
    const { toast } = useToast();
    const [nomeProduto, setNomeProduto] = useState<string>('');
    const [horasTrabalhadas, setHorasTrabalhadas] = useState<string>('');
    const [descricaoProduto, setDescricaoProduto] = useState<string>('');
    const [comissaoNovo, setComissaoNovo] = useState<string>('');
    const [comissaoAntigo, setComissaoAntigo] = useState<string>('');

    const [errors, setErrors] = useState({
        nomeProduto: false,
        horasTrabalhadas: false,
        descricaoProduto: false,
        comissaoNovo: false,
        comissaoAntigo: false,
    });

    const descricaoLimiteCaracteres = 255;
    const router = useRouter();

    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const descricao = event.target.value;
        if (descricao.length <= descricaoLimiteCaracteres) {
            setDescricaoProduto(descricao);
        }
    };

    const resetForm = () => {
        setNomeProduto('');
        setHorasTrabalhadas('');
        setDescricaoProduto('');
        setComissaoNovo('');
        setComissaoAntigo('');
        setErrors({
            nomeProduto: false,
            horasTrabalhadas: false,
            descricaoProduto: false,
            comissaoNovo: false,
            comissaoAntigo: false,
        });
    };

    const validateForm = (): boolean => {
        const newErrors = {
            nomeProduto: nomeProduto.trim() === '',
            horasTrabalhadas: horasTrabalhadas.trim() === '',
            descricaoProduto: descricaoProduto.trim() === '',
            comissaoNovo: comissaoNovo.trim() === '',
            comissaoAntigo: comissaoAntigo.trim() === '',
        };

        setErrors(newErrors);

        return !Object.values(newErrors).includes(true);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            toast({
                title: "Erro",
                description: "Por favor, preencha todos os campos obrigatórios.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
            return;
        }

        try {
            const horasTrabalhadasNumber = removerMascaraValorMonetario(horasTrabalhadas);
            const comissaoNovoNumber = removerMascaraPorcentagem(comissaoNovo);
            const comissaoAntigoNumber = removerMascaraPorcentagem(comissaoAntigo);

            const response = await createNewProduto(
                nomeProduto,
                horasTrabalhadasNumber,
                descricaoProduto,
                comissaoNovoNumber,
                comissaoAntigoNumber
            );

            if (response.status === 1) {
                toast({
                    title: "Sucesso",
                    description: "Produto cadastrado com sucesso!",
                    className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
                });
                resetForm();
                router.push('/routes/ajustes');
            } else {
                throw new Error("Erro ao cadastrar o produto: resposta inválida");
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Falha ao cadastrar o produto. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
        }
    };

    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="flex justify-center items-center flex-grow">
                    <div className="max-w-lg w-full bg-white border hover:shadow-xl rounded-2xl p-5">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Cadastro Produto</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    id="nomeProduto"
                                    name="nomeProduto"
                                    value={nomeProduto}
                                    onChange={(event) => {
                                        setNomeProduto(event.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, nomeProduto: false }));
                                    }}
                                    placeholder="Nome do Produto"
                                    className={`w-full border-b-2 focus:outline-none ${errors.nomeProduto ? 'border-red-500' : 'focus:border-blue-500'}`}
                                />
                                {errors.nomeProduto && <p className="text-red-500 text-sm">Campo obrigatório</p>}
                            </div>
                            <div className="grid grid-cols-3 gap-5 mb-4">
                                <div className="relative col-span-1">
                                    <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500">
                                        R$
                                    </span>
                                    <input
                                        type="text"
                                        id="horasTrabalhadas"
                                        name="horasTrabalhadas"
                                        value={horasTrabalhadas}
                                        onChange={(event) => {
                                            const maskedValue = entradaMask(event.target.value);
                                            if (maskedValue.replace(/\D/g, '').length <= 12) {
                                                setHorasTrabalhadas(maskedValue);
                                            }
                                            setErrors((prevErrors) => ({ ...prevErrors, horasTrabalhadas: false }));
                                        }}
                                        placeholder="15.000,00"
                                        className={`pl-8 w-full border-b-2 focus:outline-none ${errors.horasTrabalhadas ? 'border-red-500' : 'focus:border-blue-500'}`}
                                    />
                                    {errors.horasTrabalhadas && <p className="text-red-500 text-sm">Campo obrigatório</p>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        id="comissaoNovo"
                                        name="comissaoNovo"
                                        value={comissaoNovo}
                                        onChange={(event) => {
                                            const maskedValue = percentageMask(event.target.value);
                                            if (maskedValue.replace(/\D/g, '').length <= 12) {
                                                setComissaoNovo(maskedValue);
                                            }
                                            setErrors((prevErrors) => ({ ...prevErrors, comissaoNovo: false }));
                                        }}
                                        placeholder="Nova Comissão"
                                        className={`col-span-1 w-full border-b-2 focus:outline-none ${errors.comissaoNovo ? 'border-red-500' : 'focus:border-blue-500'}`}
                                    />
                                    {errors.comissaoNovo && <p className="text-red-500 text-sm">Campo obrigatório</p>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        id="comissaoAntigo"
                                        name="comissaoAntigo"
                                        value={comissaoAntigo}
                                        onChange={(event) => {
                                            const maskedValue = percentageMask(event.target.value);
                                            if (maskedValue.replace(/\D/g, '').length <= 12) {
                                                setComissaoAntigo(maskedValue);
                                            }
                                            setErrors((prevErrors) => ({ ...prevErrors, comissaoAntigo: false }));
                                        }}
                                        placeholder="Comissão Antiga"
                                        className={`col-span-1 w-full border-b-2 focus:outline-none ${errors.comissaoAntigo ? 'border-red-500' : 'focus:border-blue-500'}`}
                                    />
                                    {errors.comissaoAntigo && <p className="text-red-500 text-sm">Campo obrigatório</p>}
                                </div>
                            </div>

                            <div className="mb-4 flex flex-col">
                                <textarea
                                    id="descricaoProduto"
                                    name="descricaoProduto"
                                    value={descricaoProduto}
                                    onChange={handleDescricaoChange}
                                    placeholder="Descrição do Produto"
                                    rows={4}
                                    maxLength={descricaoLimiteCaracteres}
                                    className="shadow-inner-2 p-2 block w-full border 'border-red-500' 'border-gray-300' rounded-md focus:outline-none"
                                ></textarea>
                                <div className="flex justify-end">
                                    <p className="text-sm text-gray-500">{descricaoProduto.length}/{descricaoLimiteCaracteres}</p>
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
            <Toaster />
        </>
    );
}

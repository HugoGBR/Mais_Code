'use client'
import React, { useState, FormEvent } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const CadastroProduto: React.FC = () => {
    const [nomeProduto, setNomeProduto] = useState<string>('');
    const [valorProduto, setValorProduto] = useState<string>('');
    const [condicaoProduto, setCondicaoProduto] = useState<string>(''); // Removido o estado inicial
    const [descricaoProduto, setDescricaoProduto] = useState<string>('');
    const descricaoLimiteCaracteres = 255;

    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const descricao = event.target.value;
        // Verifica se a descrição excede o limite de caracteres
        if (descricao.length <= descricaoLimiteCaracteres) {
            setDescricaoProduto(descricao);
        }
    };  

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        // Aqui você pode adicionar lógica para enviar os dados do formulário para o servidor
        console.log('Dados do formulário:', { nomeProduto, valorProduto, condicaoProduto, descricaoProduto });
    };

    return (
        <div className="flex flex-col h-screen">
            <div className='col-2 flex items-center'>
                {/* Botão de Voltar */}
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-200 px-4 py-2 rounded">
                    Voltar
                </button>
                {/* Título "Produtos" */}
                <h1 className="text-2xl font-semibold mb-4 ml-4">Produtos</h1>
            </div>


            {/* Card de Cadastro */}
            <div className=" flex justify-center items-center flex-grow">
                <div className=" max-w-lg w-full bg-white shadow-xl rounded-md p-8"> {/* Removida a classe text-center do card */}
                    <h2 className="text-2xl font-semibold mb-4 text-center">Cadastro Produto</h2> {/* Centralizando apenas o título "Cadastro Produto" */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="nomeProduto"
                                name="nomeProduto"
                                value={nomeProduto}
                                onChange={(e) => setNomeProduto(e.target.value)}
                                placeholder="Nome do Produto"
                                required
                                className="border-b-2 mt-1 p-2 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex space-x-4 mb-4 grid grid-cols-3 rounded-none">
                            <input
                                type="text"
                                id="valorProduto"
                                name="valorProduto"
                                value={valorProduto}
                                onChange={(e) => setValorProduto(e.target.value)}
                                placeholder="R$"
                                required
                                className="border-b-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div>
                            <Select>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Novo</SelectItem>
                                    <SelectItem value="dark">Antigo</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>

                            <div>
                            <Select>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Novo</SelectItem>
                                    <SelectItem value="dark">Antigo</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>                       

                            
                        </div>

                        <div className="mb-4">
                            <textarea
                                id="descricaoProduto"
                                name="descricaoProduto"
                                value={descricaoProduto}
                                onChange={handleDescricaoChange}
                                placeholder="Descrição do Produto"
                                rows={4}
                                maxLength={descricaoLimiteCaracteres}
                                className="shadow-inner-2 mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            ></textarea>
                            {/* Exibe o contador de caracteres restantes */}
                            <p className="text-sm text-gray-500">{descricaoProduto.length}/{descricaoLimiteCaracteres}</p>
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

export default CadastroProduto;
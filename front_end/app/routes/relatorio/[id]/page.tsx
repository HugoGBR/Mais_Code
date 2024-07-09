'use client'
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { GoGear } from "react-icons/go";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getVendaById, updateVenda } from "@/lib/VendaController";  // Funções para pegar e atualizar venda
import { dadosCliente, dadosModelo_contrato, dadosProduto, dadosVenda } from "@/lib/interfaces/dadosUsuarios";
import { getAllProduto } from "@/lib/ProdutoController";
import { getAllContratos } from "@/lib/ContratoController";
import { getAllClient } from "@/lib/ClienteController";
import CardCliente from '@/components/CardClienteGestao';
import PopUpConfig from "@/components/PopUpConfig";
import { getCookie } from "@/lib/coockie";

interface EditProps {
    vendaId: string;
}

export default function EditVenda({ vendaId }: EditProps) {
    const [venda, setVenda] = useState<dadosVenda | null>(null);
    const [TiposProduto, setTipoProduto] = useState<dadosProduto[]>([]);
    const [ModeloContrato, setModeloContrato] = useState<dadosModelo_contrato[]>([]);
    const [listaCliente, setListaCliente] = useState<dadosCliente[]>([]);
    const [mostrarParcelas, setMostrarParcelas] = useState(false);
    const [valor_entrada, setValorEntrada] = useState("");
    const [DataInicio, setDataInicio] = useState("");
    const [DataFim, setDataFim] = useState("");
    const [nome_contato, setNomeContato] = useState("");
    const [telefone, setTelefoneContato] = useState("");
    const [email, setEmailContato] = useState("");
    const [new_cliente_id, setnew_cliente_id] = useState("");
    const [new_tipo_contrato_id, setnew_tipo_contrato_id] = useState("");
    const [new_produto_id, setnew_produto_id] = useState("");
    const [new_usuario_id, setnew_usuario_id] = useState("");
    const [valor_total, setvalortotal] = useState(0);
    const [metodo_pagamento, setmetodo_pagamento] = useState("");
    const [numero_parcela, setnumero_parcela] = useState("");
    const [cpf_cnpj_input, setCpfCnpjInput] = useState("");
    const [statusCliente, setstatusCliente] = useState("");
    const [statusClienteValor, setstatusClienteValor] = useState(0);
    const [foundCliente, setFoundCliente] = useState<dadosCliente | null>(null);
    const [horas_trabalhadas, setHorasTrabalhadas] = useState<number>(0); // Adicionei isso, pois a interface de venda não inclui horas trabalhadas

    const route = useRouter();

    useEffect(() => {
        async function fetchVenda() {
            const vendaData = await getVendaById(vendaId);
            setVenda(vendaData);
            setValorEntrada(vendaData.valor_entrada.toString());
            setDataInicio(vendaData.inicio_contrato.toISOString().split('T')[0]);
            setDataFim(vendaData.final_contrato.toISOString().split('T')[0]);
            setNomeContato(vendaData.nome_contato);
            setTelefoneContato(vendaData.telefone);
            setEmailContato(vendaData.email);
            setnew_cliente_id(vendaData.cliente_id.toString());
            setnew_tipo_contrato_id(vendaData.tipo_contrato_id.toString());
            setnew_produto_id(vendaData.produto_id.toString());
            setnew_usuario_id(vendaData.usuario_id.toString());
            setvalortotal(vendaData.valor_total);
            setmetodo_pagamento(vendaData.metodo_pagamento);
            setnumero_parcela(vendaData.numero_parcela);
            setstatusCliente(vendaData.status_cliente === 1 ? "antigo" : "novo");
            setstatusClienteValor(vendaData.status_cliente);
        }

        fetchVenda();
    }, [vendaId]);

    useEffect(() => {
        if (foundCliente) {
            setnew_cliente_id(foundCliente.id.toString());
        }
    }, [foundCliente]);

    useEffect(() => {
        async function fetchUsername() {
            const user = await getCookie("CookiCriado");
            setnew_usuario_id(user || "Usuário");
        }
        fetchUsername();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const tipos_contrato = await getAllContratos();
            setModeloContrato(tipos_contrato);
            const tipo_Produto = await getAllProduto();
            setTipoProduto(tipo_Produto);
            const LCliente = await getAllClient();
            setListaCliente(LCliente);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (new_produto_id && horas_trabalhadas) {
            const selectedProduct = TiposProduto.find(produto => produto.id.toString() === new_produto_id);
            if (selectedProduct) {
                const valorEntradaNumerico = parseFloat(valor_entrada) || 0;
                setvalortotal((selectedProduct.horas_trabalhadas * horas_trabalhadas) - valorEntradaNumerico);
            }
        }
    }, [new_produto_id, horas_trabalhadas, valor_entrada]);

    useEffect(() => {
        if (new_produto_id) {
            const selectedProduct = TiposProduto.find(produto => produto.id.toString() === new_produto_id);
            if (selectedProduct) {
                const comissao = statusCliente === "antigo" ? selectedProduct.comissao_antiga : selectedProduct.comissao_nova;
                setstatusClienteValor(comissao);
            }
        }
    }, [statusCliente, new_produto_id]);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!venda) return;

        const inicio_contrato = new Date(DataInicio);
        const final_contrato = new Date(DataFim);

        await updateVenda(
            Number(venda.id),  // Adicione o id do objeto para atualização
            Number(new_cliente_id),
            Number(new_tipo_contrato_id),
            Number(new_produto_id),
            Number(new_usuario_id),
            statusClienteValor,
            final_contrato,
            Number(valor_entrada),
            valor_total,
            inicio_contrato,
            metodo_pagamento,
            email,
            telefone,
            nome_contato,
            numero_parcela,
            2
        );
        route.push("/routes/home");
    }

    async function handleSearchCPF(event: FormEvent) {
        event.preventDefault();
        const clienteEncontrado = listaCliente.find(client => client.cpf_cnpj === cpf_cnpj_input);
        setFoundCliente(clienteEncontrado || null);
    }

    const renderGestaoCliente = () => {
        if (!foundCliente) return null;
        return (
            <Link href={`/routes/gestao/cliente/${foundCliente.id}`} key={foundCliente.id}>
                <div onClick={() => route.push(`/routes/gestao/cliente/${foundCliente.id}`)} className='bg-gray-300 mb-4 rounded-lg flex-grow'>
                    <a className="block w-full">
                        <CardCliente dados={foundCliente} />
                    </a>
                </div>
            </Link>
        );
    };

    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-7">
                <Card className="p-10 drop-shadow-xl">
                    <form onSubmit={handleSearchCPF}>
                        <div className="flex justify-between mb-6 md:text-2xl font-bold">
                            <h1>Contrato</h1>
                            <h1 className="hidden">Nº {venda?.id.toString()}</h1>
                        </div>

                        <h2 className="mb-5 font-bold">Dados do Contrato</h2>

                        <div className="md:grid md:grid-cols-12 gap-5 mb-5">
                            <input
                                className="border-b-2 mt-auto md:col-span-4 focus:outline-none focus:border-blue-500"
                                placeholder="CPF/CNPJ do Cliente"
                                type="text"
                                value={cpf_cnpj_input}
                                onChange={(e) => setCpfCnpjInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="p-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 md:col-span-2">
                                BUSCAR
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-5 mb-5">
                            <div className="md:col-span-6">
                                <label className="mb-2">Status Cliente</label>
                                <Select value={statusCliente} onValueChange={setstatusCliente}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status Cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="antigo">Antigo</SelectItem>
                                        <SelectItem value="novo">Novo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="md:col-span-6">
                                <label className="mb-2">Produto</label>
                                <Select value={new_produto_id} onValueChange={setnew_produto_id}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Produto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TiposProduto.map((produto) => (
                                            <SelectItem key={produto.id} value={produto.id.toString()}>
                                                {produto.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-12 gap-5 mb-5">
                            <div className="md:col-span-6">
                                <label className="mb-2">Horas Trabalhadas</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Horas Trabalhadas"
                                    type="number"
                                    value={horas_trabalhadas}
                                    onChange={(e) => setHorasTrabalhadas(Number(e.target.value))}
                                />
                            </div>

                            <div className="md:col-span-6">
                                <label className="mb-2">Valor Entrada</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Valor Entrada"
                                    type="number"
                                    value={valor_entrada}
                                    onChange={(e) => setValorEntrada(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-12 gap-5 mb-5">
                            <div className="md:col-span-6">
                                <label className="mb-2">Data Início</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    type="date"
                                    value={DataInicio}
                                    onChange={(e) => setDataInicio(e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-6">
                                <label className="mb-2">Data Fim</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    type="date"
                                    value={DataFim}
                                    onChange={(e) => setDataFim(e.target.value)}
                                />
                            </div>
                        </div>

                        <h2 className="mb-5 font-bold">Dados do Contato</h2>
                        <div className="grid md:grid-cols-12 gap-5 mb-5">
                            <div className="md:col-span-6">
                                <label className="mb-2">Nome do Contato</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    type="text"
                                    value={nome_contato}
                                    onChange={(e) => setNomeContato(e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-6">
                                <label className="mb-2">Telefone</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    type="text"
                                    value={telefone}
                                    onChange={(e) => setTelefoneContato(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-12 gap-5 mb-5">
                            <div className="md:col-span-12">
                                <label className="mb-2">Email</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmailContato(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-12 gap-5 mb-5">
                            <div className="md:col-span-6">
                                <label className="mb-2">Método de Pagamento</label>
                                <Select value={metodo_pagamento} onValueChange={setmetodo_pagamento}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Método de Pagamento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                                        <SelectItem value="Boleto">Boleto</SelectItem>
                                        <SelectItem value="Transferência">Transferência</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="md:col-span-6">
                                <label className="mb-2">Número de Parcelas</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    type="number"
                                    value={numero_parcela}
                                    onChange={(e) => setnumero_parcela(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="p-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                            SALVAR
                        </button>
                    </form>
                </Card>
            </div>
            <div className="col-span-12 lg:col-span-5">
                {renderGestaoCliente()}
            </div>
        </div>
    );
}

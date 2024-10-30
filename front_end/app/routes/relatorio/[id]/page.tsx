'use client';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CancelamentodaVenda, getVendaById, ativarVenda, updateVenda } from "@/lib/VendaController";
import { dadosCliente, dadosModelo_contrato, dadosProduto, dadosVenda } from "@/lib/interfaces/dadosUsuarios";
import { getAllContratos } from "@/lib/ContratoController";
import CardCliente from '@/components/CardClienteGestao';
import PopUpConfig from "@/components/PopUpConfig";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Span } from "next/dist/trace";
import PopUpCancelamento from "@/components/PopUpCancelamento";

export default function EditVenda({ params }: { params: { id: number } }) {
    const [venda, setVenda] = useState<dadosVenda | null>(null);
    const [ModeloContrato, setModeloContrato] = useState<dadosModelo_contrato[]>([]);
    const [listaCliente, setListaCliente] = useState<dadosCliente[]>([]);
    const [mostrarParcelas, setMostrarParcelas] = useState(false);
    const [valor_entrada, setValorEntrada] = useState("");
    const [inputsHabilitados, setInputHabilitados] = useState(false);
    const [DataInicio, setDataInicio] = useState("");
    const [DataFim, setDataFim] = useState("");
    const [nome_contato, setNomeContato] = useState("");
    const [telefone, setTelefoneContato] = useState("");
    const [email, setEmailContato] = useState("");
    const [new_cliente_id, setnew_cliente_id] = useState("");
    const [new_tipo_contrato_id, setnew_tipo_contrato_id] = useState("");
    const [new_produto_id, setnew_produto_id] = useState("0");
    const [newProdutoNome, setProdutoNome] = useState("");
    const [new_usuario_id, setnew_usuario_id] = useState("");
    const [valor_total, setvalortotal] = useState(0);
    const [metodo_pagamento, setmetodo_pagamento] = useState("");
    const [numero_parcela, setnumero_parcela] = useState("1");
    const [cpf_cnpj_input, setCpfCnpjInput] = useState("");
    const [statusCliente, setstatusCliente] = useState("");
    const [statusClienteValor, setstatusClienteValor] = useState(0);
    const [foundCliente, setFoundCliente] = useState<dadosCliente | null>(null);
    const [horas_trabalhadas, setHorasTrabalhadas] = useState<number>(0);
    const [statusVenda, setStatusVenda] = useState("");

    const route = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        async function fetchVenda() {
            const vendaData = await getVendaById(params.id);
            if (vendaData) {
                setVenda(vendaData);
                setValorEntrada(vendaData.valor_entrada);
                setDataInicio(vendaData.inicio_contrato);
                setDataFim(vendaData.final_contrato);
                setNomeContato(vendaData.nome_contato);
                setTelefoneContato(vendaData.telefone_contato);
                setEmailContato(vendaData.email_contato);
                setnew_cliente_id(vendaData.cliente_id.toString());
                setnew_tipo_contrato_id(vendaData.tipo_contrato_id.toString());
                setnew_produto_id(vendaData.produto_id.toString());
                setProdutoNome(vendaData.nome_produto);
                setnew_usuario_id(vendaData.usuario_id.toString());
                setvalortotal(vendaData.valor_total);
                setmetodo_pagamento(vendaData.metodo_pagamento);
                setnumero_parcela(vendaData.numero_parcela);
                setstatusCliente(vendaData.status_cliente === 1 ? "antigo" : "novo");
                setHorasTrabalhadas(vendaData.horas_trabalhadas);
                setstatusClienteValor(vendaData.status_cliente);
                setCpfCnpjInput(vendaData.cpf_cnpj);
                setMostrarParcelas(vendaData.metodo_pagamento === "Parcelado");
                setStatusVenda(vendaData.status_venda);
            }
        }
        fetchVenda();
    }, [params.id]);
    useEffect(() => {
        const fetchData = async () => {
            const tipos_contrato = await getAllContratos();
            setModeloContrato(tipos_contrato);
        };

        fetchData();
    }, []);

    async function handleAtivarVenda() {
        try {
            const response = await ativarVenda(params.id);
            if (response.status === 1) {
                toast({
                    title: "Sucesso",
                    description: "Venda ativada!",
                    className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
                });
                setTimeout(() => {
                    route.push('/routes/relatorio');
                }, 1000);
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao ativar a venda!",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
            console.error("Erro ao ativar a venda:", error);
        }
    }

    async function handleSearchCPF(event: FormEvent) {
        event.preventDefault();
        const clienteEncontrado = listaCliente.find(client => client.cpf_cnpj === cpf_cnpj_input);
        setFoundCliente(clienteEncontrado || null);
    }
    const handleButtonsavle = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await updateVenda(
                Number(new_cliente_id),
                Number(new_tipo_contrato_id),
                Number(new_produto_id),
                Number(new_usuario_id),
                String(statusCliente),
                horas_trabalhadas,
                String(DataInicio),
                String(DataFim),
                Number(valor_entrada),
                Number(valor_total),
                String(nome_contato),
                String(email),
                String(telefone),
                String(metodo_pagamento),
                Number(numero_parcela),
                String(statusVenda),
                params.id
            );
            toast({
                title: "Sucesso",
                description: "Venda atualizada com sucesso!",
                className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
            });
            setTimeout(() => {
                route.push('/routes/relatorio');
            }, 2000);
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao atualizar a venda!",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });

            console.error("Erro ao atualizar a venda:", error);
        }
    };


    const handleButtonClick = async () => {
        setInputHabilitados(true);
    };
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
        <div className="flex flex-col md:gap-3 md:flex md:flex-col lg:flex-row">
            <div className="w-full lg:w-3/5">
                <Card className="p-10 drop-shadow-xl">
                    <form>
                        <div className="flex justify-between mb-6 md:text-2xl font-bold">
                            <h1>Contrato</h1>
                            <h1 className="hidden">Nº </h1>
                        </div>

                        <h2 className="mb-5 font-bold">Dados do Contrato</h2>

                        <div className="md:grid md:grid-cols-12 gap-5 mb-5">
                            <input
                                className="border-b-2 mt-auto md:col-span-4 focus:outline-none focus:border-blue-500 disabled"
                                placeholder="CPF/CNPJ do Cliente"
                                type="text"
                                value={cpf_cnpj_input}
                                disabled={!inputsHabilitados}
                            />
                        </div>

                        <div className="md:grid md:grid-cols-2 gap-5 mt-5">
                            <div className="flex flex-col mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Data Inicio</label>
                                <input className="border-b-2 focus:outline-none focus:border-blue-500" value={DataInicio}
                                    placeholder="Data de inicio" type="date"
                                    disabled={!inputsHabilitados}
                                    onChange={(event) => setDataInicio(event.target.value)} />

                            </div>
                            <div className="flex flex-col mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Data Termino</label>
                                <input className="border-b-2 focus:outline-none focus:border-blue-500" value={DataFim} type="date"
                                    disabled={!inputsHabilitados}
                                    onChange={(event) => setDataFim(event.target.value)} />

                            </div>
                        </div>

                        <div className="md:grid md:grid-cols-3 gap-5 mb-5">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Modelo do Contratos</label>
                                <Select value={new_tipo_contrato_id}
                                    disabled={!inputsHabilitados}>

                                    <SelectTrigger>
                                        <SelectValue placeholder="Modelo do Contratos" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ModeloContrato.map((tipos_contrato) => (
                                            <SelectItem key={tipos_contrato.id} value={tipos_contrato.id.toString()}>{tipos_contrato.nome}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Produto</label>
                                <Select value={new_produto_id}
                                    disabled={!inputsHabilitados}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Produto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={new_produto_id}>{newProdutoNome}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Horas Trabalhadas</label>
                                <input
                                    className="border-b-2 h-10 focus:outline-none focus:border-blue-500"
                                    placeholder="Horas"
                                    value={horas_trabalhadas}
                                    disabled={!inputsHabilitados}
                                    type="text"
                                    onChange={(event) => setHorasTrabalhadas(Number(event.target.value))}
                                />
                            </div>
                        </div>

                        <h2 className="font-bold">Dados do Contato</h2>
                        <div className="grid grid-cols-2 gap-5 mt-5">
                            <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="Nome"
                                value={nome_contato}
                                disabled={!inputsHabilitados}
                                onChange={(event) => setNomeContato(event.target.value)}
                                type="text" />
                            <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="(99) 99999-9999"
                                onChange={(event) => setTelefoneContato(event.target.value)} type="phone"
                                value={telefone}
                                disabled={!inputsHabilitados} />
                            <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="Email" onChange={(event) => setEmailContato(event.target.value)}
                                type="email"
                                value={email}
                                disabled={!inputsHabilitados}
                            />
                        </div>
                    </form>
                </Card>
            </div>

            <div className="w-full lg:w-2/5">
                <form onSubmit={handleSearchCPF}>
                    <Card className="p-10 drop-shadow-xl grid grid-cols-2 gap-5">
                        <div className="col-span-2 text-2xl text-center font-bold">
                            <span>Forma de Pagamento</span>
                        </div>

                        <div className="col-span-2 grid grid-cols-2 items-center gap-5">
                            <label className="block text-md font-bold text-gray-700">Valor da Entrada</label>
                            <div className="relative w-full">
                                <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500">
                                    R$
                                </span>
                                <input
                                    className="border-b-2 pl-8 w-full focus:outline-none focus:border-blue-500"
                                    placeholder="0000,00"
                                    type="text"
                                    value={valor_entrada}
                                    disabled={!inputsHabilitados}
                                    onChange={(event) => setValorEntrada(event.target.value)}
                                />
                            </div>
                        </div>


                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status Cliente</label>
                            <Select value={statusCliente}
                                disabled={!inputsHabilitados}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status Cliente" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="antigo">Antigo</SelectItem>
                                    <SelectItem value="novo">Novo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-2 font-bold">
                            <h2 className="col-span-2">Método de Pagamento</h2>
                        </div>

                        <div className="col-span-2 grid grid-cols-12 ">
                            <div className="col-span-3">
                                <input
                                    id="pagamento-opcao-1"
                                    type="radio"
                                    name="forma-pagamento"
                                    value="À vista"
                                    className="w-5 h-5 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                    aria-labelledby="pagamento-opcao-1"
                                    aria-describedby="pagamento-opcao-1"
                                    checked={metodo_pagamento === "À vista"}
                                    disabled={!inputsHabilitados}
                                    onChange={() => {
                                        setMostrarParcelas(false);
                                        setmetodo_pagamento("À vista");
                                    }}
                                />
                                <label
                                    htmlFor="pagamento-opcao-1"
                                    className="ml-2 text-sm font-medium text-gray-900">
                                    À vista
                                </label>
                            </div>

                            <div className="col-span-3">
                                <input
                                    id="pagamento-opcao-2"
                                    type="radio"
                                    name="forma-pagamento"
                                    value="Parcelado"
                                    className="w-5 h-5 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                    aria-labelledby="pagamento-opcao-2"
                                    aria-describedby="pagamento-opcao-2"
                                    checked={metodo_pagamento === "Parcelado"}
                                    disabled={!inputsHabilitados}
                                    onChange={() => {
                                        setMostrarParcelas(true);
                                        setmetodo_pagamento("Parcelado");
                                    }}
                                />
                                <label
                                    htmlFor="pagamento-opcao-2"
                                    className="ml-2 text-sm font-medium text-gray-900">
                                    Parcelado
                                </label>
                            </div>

                            {mostrarParcelas && (
                                <div className="col-span-6 grid grid-cols-3 gap-x-5">
                                    <div className="col-start-2">
                                        <input
                                            value={numero_parcela}
                                            className="border-b-2 text-center w-full focus:outline-none focus:border-blue-500"
                                            placeholder="36x"
                                            type="number"
                                            onChange={(event) => setnumero_parcela(event.target.value)}
                                            disabled={!inputsHabilitados}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <Link href="">
                                            {/* <PopUpConfig valorTotal={valor_total} parcelas={Number(numero_parcela)} idVenda={params.id}} /> */}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-span-2 grid grid-cols-2">
                            <label className="font-bold col-span-1" htmlFor="teste">Valor total a pagar:</label>
                            <h1 className="font-bold col-span-1 text-end">44584</h1>
                        </div>
                        <div className="text-center col-span-2">
                            <div className="text-center ">
                                <div className="grid grid-cols-2 gap-x-5">
                                    {statusVenda === "em andamento" ? (
                                        <PopUpCancelamento id={params.id} />
                                    ) : (
                                        <button
                                            type="submit"
                                            onClick={handleAtivarVenda}
                                            className="col-span-1 p-2 font-bold text-black bg-white rounded border border-green-600 hover:bg-green-700 hover:text-white focus:outline-none">
                                            Ativar Venda
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleButtonsavle}
                                        className="col-span-1 p-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none">
                                        SALVAR
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={handleButtonClick}
                                        className="  mt-3 col-span-2 p-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none">
                                        Editar
                                    </button>


                                </div>

                            </div>
                        </div>
                    </Card>
                </form >
                <div className="flex flex-col mb-5 py-3">
                    {renderGestaoCliente()}
                </div>
            </div >
            <Toaster />
        </div >
    );
}
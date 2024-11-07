'use client';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getVendaById, ativarVenda, updateVenda, updateParcelaByIDv, getParcelaByidv, ConcluirVenda } from "@/lib/VendaController";
import { dadosCliente, dadosModelo_contrato, dadosVenda } from "@/lib/interfaces/dadosUsuarios";
import { getAllContratos } from "@/lib/ContratoController";
import CardCliente from '@/components/CardClienteGestao';
import EditConfiguracoesParcela from "@/components/ParcelaEdit";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import PopUpCancelamento from "@/components/PopUpCancelamento";
import { insertMaskTelefone, insertMaskValorMonetarioSemVirgula } from "@/lib/MaskInput/MaskInput";
import MotivoCancelamento from "@/components/MotivoCancelamento";

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
    const [descricaoProduto, setDescricaoProduto] = useState<string>('');
    const [parcelas, setParcelas] = useState<any[]>([]); // Estado para armazenar as parcelas

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
                setDescricaoProduto(vendaData.justificativa_cancelamento);

                // Carregar parcelas ao carregar a venda
                const parcelasData = await getParcelaByidv(params.id);
                setParcelas(parcelasData);
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

    const [isHidden, setIsHidden] = useState(false);

    const handleIsHidden = () => {
        setIsHidden(true);
    };

    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescricaoProduto(event.target.value);
    };

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

    async function handleConcluirVenda() {
        try {
            const response = await ConcluirVenda(params.id);
            if (response.status === 1) {
                toast({
                    title: "Sucesso",
                    description: "Venda Concluida!",
                    className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
                });
                setTimeout(() => {
                    route.push('/routes/relatorio');
                }, 1000);
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao Concluir venda!",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
            console.error("Erro ao Concluir a venda:", error);
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

    const [isEditing, setIsEditing] = useState(false); // Novo estado para controlar o modo de edição

    const handleButtonClick = (event: FormEvent) => {
        if (isEditing) {
            handleButtonsavle(event); // Passa o event ao chamar handleButtonsavle
        }
        setInputHabilitados(!inputsHabilitados);
        setIsEditing(!isEditing);
        setIsHidden(!isHidden);
    };



    const handleParcelasChange = (novosValores: number[], novosStatus: string[]) => {
        const novasParcelas = parcelas.map((parcela, i) => ({
            ...parcela,
            valor_da_parcela: novosValores[i],
            status: novosStatus[i],
        }));
        setParcelas(novasParcelas);
    };

    const handleConfirmParcelas = async (vendaId: number, numeroParcelas: number, valoresParcelas: number[], statusParcelas: string[]) => {
        try {
            for (let i = 0; i < parcelas.length; i++) {
                const parcela = parcelas[i];
                const statusParcela = statusParcelas[i];
                await updateParcelaByIDv(valoresParcelas[i], statusParcela, parcela.id);
            }

            toast({
                title: "Sucesso",
                description: "Parcelas atualizadas com sucesso!",
                className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
            });
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao atualizar as parcelas!",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
            console.error("Erro ao atualizar as parcelas:", error);
        }
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
        <div className="flex flex-col gap-3 md:flex md:flex-col lg:flex-row">
            <div className="w-full lg:w-7/12">
                <Card className="p-10 hover:shadow-xl rounded-lg border">
                    <form>
                        <div className="flex justify-between mb-6 md:text-2xl font-bold">
                            <h1>Contrato</h1>
                            <h1 className="">{`Nº ${params.id}`}</h1>
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
                                onChange={(event) => setTelefoneContato(insertMaskTelefone(event.target.value))}
                                type="phone"
                                value={telefone}
                                disabled={!inputsHabilitados} />
                            <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="Email"
                                onChange={(event) => setEmailContato(event.target.value)}
                                type="email"
                                value={email}
                                disabled={!inputsHabilitados}
                            />
                        </div>
                    </form>
                </Card>
            </div>

            <div className="w-full lg:w-4/12 h-auto gap-3">
                <form>
                    <Card className="py-5 px-8 grid grid-cols-2 gap-5 hover:shadow-xl rounded-lg border">
                        <div className="col-span-2 flex justify-between">
                            <div className="col-span-2 text-2xl text-left font-bold">
                                <span>Forma de Pagamento</span>
                            </div>
                            <div>
                                {statusVenda === "cancelado" && (
                                    <MotivoCancelamento
                                        idVenda={params.id}
                                        descricaoProduto={descricaoProduto}
                                        onDescricaoChange={handleDescricaoChange}
                                    />
                                )}
                            </div>

                        </div>

                        <div className="col-span-2 grid grid-cols-2 items-center gap-5">
                            <label className="block text-md font-bold text-gray-700">Valor da Entrada</label>
                            <div className="relative w-full">
                                <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500">
                                    R$
                                </span>
                                <input
                                    className="border-b-2 pl-8 w-full bg-white focus:outline-none focus:border-blue-500"
                                    placeholder="0000,00"
                                    type="text"
                                    value={valor_entrada}
                                    disabled={!inputsHabilitados}
                                    onChange={(event) => setValorEntrada(insertMaskValorMonetarioSemVirgula(event.target.value))}
                                />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Status Cliente</label>
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

                        <div className="col-span-2">
                            <h2 className="font-bold mb-3">Método de Pagamento</h2>

                            <div className="flex items-center justify-between">
                                {/* Contêiner de Radio Buttons alinhado à esquerda */}
                                <div className="flex items-center space-x-6">
                                    {/* Opção "À vista" */}
                                    <div className="flex items-center">
                                        <input
                                            id="pagamento-opcao-1"
                                            type="radio"
                                            name="forma-pagamento"
                                            value="À vista"
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                            checked={metodo_pagamento === "À vista"}
                                            disabled={!inputsHabilitados}
                                            onChange={() => {
                                                setMostrarParcelas(false);
                                                setmetodo_pagamento("À vista");
                                            }}
                                        />
                                        <label htmlFor="pagamento-opcao-1" className="ml-2 text-sm font-medium text-gray-900">
                                            À vista
                                        </label>
                                    </div>

                                    {/* Opção "Parcelado" */}
                                    <div className="flex items-center">
                                        <input
                                            id="pagamento-opcao-2"
                                            type="radio"
                                            name="forma-pagamento"
                                            value="Parcelado"
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                            checked={metodo_pagamento === "Parcelado"}
                                            disabled={!inputsHabilitados}
                                            onChange={() => {
                                                setMostrarParcelas(true);
                                                setmetodo_pagamento("Parcelado");
                                            }}
                                        />
                                        <label htmlFor="pagamento-opcao-2" className="ml-2 text-sm font-medium text-gray-900">
                                            Parcelado
                                        </label>
                                    </div>
                                </div>

                                {/* Contêiner de Parcelas alinhado à direita */}
                                {mostrarParcelas && (
                                    <div className="flex items-center space-x-8">
                                        <input
                                            className="border-b-2 w-16 text-center focus:outline-none focus:border-blue-500"
                                            placeholder="36x"
                                            type="text"
                                            value={numero_parcela}
                                            onChange={(event) => setnumero_parcela(event.target.value)}
                                        />
                                        <EditConfiguracoesParcela
                                            valorTotal={valor_total}
                                            parcelas={parcelas.length}
                                            onSetValoresParcelas={handleParcelasChange}
                                            onConfirm={handleConfirmParcelas}
                                            idVenda={params.id}
                                            listaParcelas={parcelas}
                                            disabled={!inputsHabilitados}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2 flex justify-between items-center">
                            <label className="font-bold" htmlFor="teste">
                                Valor total a pagar:
                            </label>
                            <h1 className="font-bold">
                                {`R$ ${valor_total}`}
                            </h1>
                        </div>

                        <div className="text-center col-span-2">
                            <div className="text-center col-span-2">
                                <div className="grid grid-cols-2 gap-2">
                                    {statusVenda === "em andamento" && isHidden ? (

                                        <PopUpCancelamento id={params.id} />

                                    ) : (
                                        isHidden && (
                                            <button
                                                type="submit"
                                                onClick={handleAtivarVenda}
                                                className="col-span-1 py-2 font-bold text-black bg-white rounded border border-green-600 hover:bg-green-700 hover:text-white focus:outline-none">
                                                Ativar Venda
                                            </button>
                                        )
                                    )}
                                    {isEditing && statusVenda === "em andamento" && (
                                        <button
                                            type="button"
                                            onClick={handleConcluirVenda}
                                            className="col-span-1 py-2 font-bold text-black bg-white rounded border border-green-600 hover:bg-green-700 hover:text-white focus:outline-none">
                                            Concluir Venda
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={(event) => handleButtonClick(event)}
                                        className="col-span-2 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none">
                                        {isEditing ? "Salvar" : "Editar"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </form>
            </div>
            <Toaster />
        </div>
    );
}

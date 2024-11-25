import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createNewParcela, createNewSell, CountVendas } from "@/lib/VendaController";
import { dadosCliente, dadosModelo_contrato, dadosProduto } from "@/lib/interfaces/dadosUsuarios";
import { getAllProduto } from "@/lib/ProdutoController";
import { getAllContratos } from "@/lib/ContratoController";
import { getAllClient } from "@/lib/ClienteController";
import CardCliente from '@/components/CardClienteGestao';
import PopUpConfig from "./PopUpConfig";
import { getCookie } from "@/lib/coockie";
import { useToast } from "@/components/ui/use-toast";
import { entradaMask, insertMaskCpfCnpj, insertMaskTelefone, moneyMask } from "@/lib/MaskInput/MaskInput";



export default function CardCadastro() {
    const [numero_parcelas, setNumeroParcelas] = useState("");
    const [valor_entrada, setValorEntrada] = useState("");
    const [valor_entrada_num, setValorEntradaNum] = useState(0);
    const [TiposProduto, setTipoProduto] = useState<dadosProduto[]>([]);
    const [ModeloContrato, setModeloContrato] = useState<dadosModelo_contrato[]>([]);
    const [listaCliente, setListaCliente] = useState<dadosCliente[]>([]);
    const [mostrarParcelas, setMostrarParcelas] = useState(false);
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
    const [numero_parcelo, setnumero_parcelo] = useState(1);
    const [cpf_cnpj_input, setCpfCnpjInput] = useState("");
    const [statusCliente, setstatusCliente] = useState("");
    const [statusClienteValor, setstatusClienteValor] = useState(0);
    const [foundCliente, setFoundCliente] = useState<dadosCliente | null>(null);
    const [horas_trabalhadas, setHorasTrabalhadas] = useState(0);
    const [valoresParcelas, setValoresParcelas] = useState<number[]>([]);
    const [id_venda, setIdVenda] = useState(1);

    const route = useRouter();
    const { toast } = useToast();

    function removeMaskAndConvert(value: string): number {
        if (!value) return 0;
        return parseFloat(value.replace(/\./g, '').replace(',', '.'));
    }


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
        if (new_produto_id && horas_trabalhadas >= 0) {
            const selectedProduct = TiposProduto.find(produto => produto.id.toString() === new_produto_id);
            if (selectedProduct) {
                const entrada = removeMaskAndConvert(valor_entrada);
                setvalortotal((selectedProduct.horas_trabalhadas * horas_trabalhadas) - entrada);
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

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const vendaCountResponse = await CountVendas();
                const vendaCount = vendaCountResponse["COUNT(*)"];
                setIdVenda(vendaCount + 1);
            } catch (error) {
                toast({
                    title: "Erro",
                    description: "Erro ao contar as vendas. Por favor, tente novamente.",
                    className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);



    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!cpf_cnpj_input) newErrors.cpf_cnpj_input = "Campo obrigatório";
        if (!DataInicio) newErrors.DataInicio = "Campo obrigatório";
        if (!DataFim) newErrors.DataFim = "Campo obrigatório";
        if (!new_tipo_contrato_id) newErrors.new_tipo_contrato_id = "Campo obrigatório";
        if (!new_produto_id) newErrors.new_produto_id = "Campo obrigatório";
        if (!horas_trabalhadas) newErrors.horas_trabalhadas = "Campo obrigatório";
        if (!nome_contato) newErrors.nome_contato = "Campo obrigatório";
        if (!telefone) newErrors.telefone = "Campo obrigatório";
        if (!email) newErrors.email = "Campo obrigatório";
        if (!statusCliente) newErrors.statusCliente = "Campo obrigatório";
        if (!metodo_pagamento) newErrors.metodo_pagamento = "Campo obrigatório";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            toast({
                title: "Erro de Validação",
                description: "Por favor, preencha todos os campos obrigatórios.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
            });
            return false;
        }
        return true;
    };
    const resetForm = () => {
        setNumeroParcelas("");
        setValorEntrada("");
        setMostrarParcelas(false);
        setDataInicio("");
        setDataFim("");
        setNomeContato("");
        setTelefoneContato("");
        setEmailContato("");
        setnew_cliente_id("");
        setnew_usuario_id("");
        setvalortotal(0);
        setmetodo_pagamento("");
        setnumero_parcelo(1);
        setCpfCnpjInput("");
        setstatusCliente("");
        setstatusClienteValor(0);
        setFoundCliente(null);
        setHorasTrabalhadas(0);
        setValoresParcelas([]);
    };

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!validateForm()) return;

        const datadoinicio = new Date(DataInicio);
        const datadofim = new Date(DataFim);
        const entrada = valor_entrada_num;
        try {
            const numeroFinal = metodo_pagamento === "À vista" ? 1 : 2;
            const vendaResponse = await createNewSell(
                Number(new_cliente_id),
                Number(new_tipo_contrato_id),
                Number(new_produto_id),
                Number(new_usuario_id),
                statusClienteValor,
                horas_trabalhadas,
                datadofim,
                Number(entrada),
                valor_total,
                datadoinicio,
                metodo_pagamento,
                email,
                telefone,
                nome_contato,
                Number(numero_parcelo),
                numeroFinal
            );

            if (vendaResponse) {
                toast({
                    title: "Sucesso",
                    description: "Cadastro realizado com sucesso!",
                    className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400"
                });

                resetForm();
                route.push("/routes/home");

            } else {
                throw new Error("Erro ao cadastrar a venda: resposta inválida");
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Falha ao cadastrar a venda",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
            });
        }
    }


    async function handleSubmitParcela(vendaId: number, numeroParcelas: number, valoresParcelas: number[], toast: any) {
        try {
            for (let i = 0; i < numeroParcelas; i++) {
                const valorParcela = valoresParcelas[i] || 0;
                const responseParcela = await createNewParcela(
                    vendaId,
                    numeroParcelas,
                    i + 1,
                    valorParcela,
                    2
                );

                if (responseParcela && responseParcela.status === 0) {
                    throw new Error(responseParcela.message || "Erro ao cadastrar parcela");
                }
            }

            toast({
                title: "Sucesso",
                description: "Parcelas cadastradas com sucesso!",
                className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
            });

        } catch (error) {
            toast({
                title: "Erro",
                description: "Falha ao cadastrar as parcelas",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
            });

            throw error;
        }
    }


    async function handleSearchCPF(event: FormEvent) {
        event.preventDefault();
        const clienteEncontrado = listaCliente.find(client => client.cpf_cnpj === cpf_cnpj_input);
        setFoundCliente(clienteEncontrado || null);
        if (!clienteEncontrado) {
            toast({
                title: "Erro de Validação",
                description: "Cliente não encontrado",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
            });
        }
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

    const handleSetValoresParcelas = (novosValores: number[]) => {
        setValoresParcelas(novosValores);
    };

    const handleValorEntradaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valorFormatado = entradaMask(event.target.value);
        const valorNumerico = removeMaskAndConvert(valorFormatado);

        setValorEntrada(valorFormatado);
        setValorEntradaNum(valorNumerico);
    };


    return (
        <div className="gap-5 min-h-screen flex flex-col lg:flex-row">
            {/* Primeira Coluna: Formulário Principal */}
            <div className="w-full lg:w-7/12">
                <Card className="p-6 md:p-10 hover:shadow-xl rounded-lg border">
                    <form onSubmit={handleSearchCPF}>
                        <div className="flex justify-between mb-4 md:mb-6 md:text-2xl font-bold">
                            <h1>Contrato</h1>
                        </div>
                        <h2 className="mb-4 font-bold text-lg">Dados do Contrato</h2>

                        {/* CPF e Botão Buscar */}
                        <div className="md:grid md:grid-cols-12 gap-4">
                            <input
                                className="border-b-2 md:col-span-8 focus:outline-none focus:border-blue-500 p-2"
                                placeholder="CPF/CNPJ do Cliente"
                                type="text"
                                value={cpf_cnpj_input}
                                onChange={(e) => {
                                    setCpfCnpjInput(insertMaskCpfCnpj(e.target.value));
                                    setErrors((prevErrors) => ({ ...prevErrors, cpf_cnpj_input: '' }));
                                }}
                            />
                            <button
                                type="submit"
                                className="col-span-4 mt-2 md:mt-0 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 p-2">
                                BUSCAR
                            </button>
                        </div>
                        {errors.cpf_cnpj_input && (
                            <span className="error text-xs text-red-600">{errors.cpf_cnpj_input}</span>
                        )}

                        {/* Datas */}
                        <div className="md:grid md:grid-cols-2 gap-4 mt-4">
                            <div className="flex flex-col mb-4 md:mb-0">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Data Início</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    type="date"
                                    value={DataInicio}
                                    onChange={(event) => {
                                        setDataInicio(event.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, DataInicio: '' }));
                                    }}
                                />
                                {errors.DataInicio && (
                                    <span className="error text-xs text-red-600 mt-1">{errors.DataInicio}</span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Data Término</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    type="date"
                                    value={DataFim}
                                    onChange={(event) => {
                                        setDataFim(event.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, DataFim: '' }));
                                    }}
                                />
                                {errors.DataFim && (
                                    <span className="error text-xs text-red-600 mt-1">{errors.DataFim}</span>
                                )}
                            </div>
                        </div>

                        {/* Campos do Contrato */}
                        <div className="md:grid md:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Modelo do Contrato
                                </label>
                                <Select
                                    onValueChange={(value) => {
                                        setnew_tipo_contrato_id(value);
                                        setErrors((prevErrors) => ({ ...prevErrors, new_tipo_contrato_id: '' }));
                                    }}
                                >
                                    <SelectTrigger className="rounded-lg">
                                        <SelectValue placeholder="Tipo Contrato" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ModeloContrato.map((tipo) => (
                                            <SelectItem key={tipo.id} value={tipo.id.toString()}>
                                                {tipo.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.new_tipo_contrato_id && (
                                    <span className="error text-xs text-red-600">{errors.new_tipo_contrato_id}</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Produto</label>
                                <Select
                                    onValueChange={(value) => {
                                        setnew_produto_id(value);
                                        setErrors((prevErrors) => ({ ...prevErrors, new_produto_id: '' }));
                                    }}
                                >
                                    <SelectTrigger className="rounded-lg">
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
                                {errors.new_produto_id && (
                                    <span className="error text-xs text-red-600">{errors.new_produto_id}</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Horas Trabalhadas
                                </label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="0"
                                    type="number"
                                    min="0"
                                    value={horas_trabalhadas === 0 ? '' : horas_trabalhadas}
                                    onChange={(event) => {
                                        const value = Number(event.target.value);
                                        if (!isNaN(value) && value >= 0) {
                                            setHorasTrabalhadas(value);
                                            setErrors((prevErrors) => ({ ...prevErrors, horas_trabalhadas: '' }));
                                        } else {
                                            setHorasTrabalhadas(0);
                                        }
                                    }}
                                />
                                {errors.horas_trabalhadas && (
                                    <span className="error text-xs text-red-600">{errors.horas_trabalhadas}</span>
                                )}
                            </div>
                        </div>

                        {/* Contato */}
                        <h2 className="font-bold text-lg mt-6">Dados do Contato</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <input
                                className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="Nome"
                                value={nome_contato}
                                onChange={(event) => {
                                    setNomeContato(event.target.value);
                                    setErrors((prevErrors) => ({ ...prevErrors, nome_contato: '' }));
                                }}
                                type="text"
                            />
                            {errors.nome_contato && (
                                <span className="error text-xs text-red-600">{errors.nome_contato}</span>
                            )}

                            <input
                                className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="(99) 99999-9999"
                                value={telefone}
                                onChange={(event) => {
                                    setTelefoneContato(insertMaskTelefone(event.target.value));
                                    setErrors((prevErrors) => ({ ...prevErrors, telefone: '' }));
                                }}
                                type="tel"
                            />
                            {errors.telefone && (
                                <span className="error text-xs text-red-600">{errors.telefone}</span>
                            )}

                            <input
                                className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => {
                                    setEmailContato(event.target.value);
                                    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
                                }}
                                type="email"
                            />
                            {errors.email && <span className="error text-xs text-red-600">{errors.email}</span>}
                        </div>
                    </form>
                </Card>
            </div>

            {/* Segunda Coluna: Detalhes de Pagamento */}
            <div className="flex flex-col gap-5 lg:flex-row">
                <form>
                    <div className="w-full lg:w-4/12">
                        <Card className="p-6 hover:shadow-xl rounded-lg border">
                            <div className="flex justify-between mb-6">
                                <h1 className="text-2xl font-bold">Forma de Pagamento</h1>
                            </div>

                            {/* Valor da Entrada */}
                            <div className="grid grid-cols-2 items-center gap-5 mb-6">
                                <label className="block text-md font-bold text-gray-700">Valor da Entrada</label>
                                <div className="relative w-full">
                                    <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                                    <input
                                        type="text"
                                        value={valor_entrada}
                                        onChange={handleValorEntradaChange}
                                        placeholder="00,00"
                                        className="border-b-2 pl-8 w-full bg-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Status Cliente */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">Status Cliente</label>
                                <Select
                                    onValueChange={(value) => {
                                        setstatusCliente(value);
                                        setErrors((prevErrors) => ({ ...prevErrors, statusCliente: '' }));
                                    }}
                                >
                                    <SelectTrigger className="h-8 mt-2 rounded-lg w-36">
                                        <SelectValue placeholder="Tipo Cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="antigo">Antigo</SelectItem>
                                        <SelectItem value="novo">Novo</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.statusCliente && (
                                    <span className="error text-xs text-red-600">{errors.statusCliente}</span>
                                )}
                            </div>

                            {/* Método de Pagamento */}
                            <h2 className="font-bold mb-3">Método de Pagamento</h2>
                            <div className="mb-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center">
                                            <input
                                                id="pagamento-opcao-1"
                                                type="radio"
                                                name="forma-pagamento"
                                                value="À vista"
                                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                                onClick={() => {
                                                    setmetodo_pagamento("À vista");
                                                    setnumero_parcelo(1);
                                                    setMostrarParcelas(false);
                                                    setErrors((prevErrors) => ({ ...prevErrors, metodo_pagamento: '' }));
                                                }}
                                            />
                                            <label
                                                htmlFor="pagamento-opcao-1"
                                                className="ml-2 text-sm font-medium text-gray-900"
                                            >
                                                À vista
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="pagamento-opcao-2"
                                                type="radio"
                                                name="forma-pagamento"
                                                value="Parcelado"
                                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                                onClick={() => {
                                                    setmetodo_pagamento("Parcelado");
                                                    setMostrarParcelas(true);
                                                    setnumero_parcelo(0);
                                                }}
                                            />
                                            <label
                                                htmlFor="pagamento-opcao-2"
                                                className="ml-2 text-sm font-medium text-gray-900"
                                            >
                                                Parcelado
                                            </label>
                                        </div>
                                    </div>

                                    {mostrarParcelas && (
                                        <div className="flex items-center space-x-8">
                                            <input
                                                className="border-b-2 w-16 text-center focus:outline-none focus:border-blue-500"
                                                placeholder="0"
                                                type="number"
                                                min="1"
                                                value={numero_parcelo === 0 ? "" : numero_parcelo}
                                                onChange={(event) => {
                                                    const value = Number(event.target.value);
                                                    setnumero_parcelo(value || 0);
                                                }}
                                            />
                                            <PopUpConfig
                                                valorTotal={valor_total}
                                                parcelas={numero_parcelo}
                                                onSetValoresParcelas={handleSetValoresParcelas}
                                                onConfirm={(vendaId, numeroParcelas, valoresParcelas) =>
                                                    handleSubmitParcela(vendaId, numeroParcelas, valoresParcelas, toast)
                                                }
                                                idVenda={id_venda}
                                            />
                                        </div>
                                    )}
                                </div>
                                {errors.metodo_pagamento && (
                                    <span className="error text-xs text-red-600">{errors.metodo_pagamento}</span>
                                )}
                            </div>

                            {/* Valor Total */}
                            <div className="flex justify-between items-center mb-6">
                                <label className="font-bold">Valor total a pagar:</label>
                                <h1 className="font-bold">{`R$ ${valor_total}`}</h1>
                            </div>

                            {/* Botão Cadastrar */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                                >
                                    CADASTRAR
                                </button>
                            </div>
                        </Card>
                    </div>
                </form>
                <div className="flex flex-col mb-5 py-3">
                    {renderGestaoCliente()}
                </div>
            </div>
        </div>
    );
}



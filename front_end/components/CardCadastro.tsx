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
import { Toaster } from "@/components/ui/toaster";
import { insertMaskCpfCnpj, insertMaskTelefone, } from "@/lib/MaskInput/MaskInput";
import { number } from "zod";


export default function CardCadastro() {
    const [numero_parcelas, setNumeroParcelas] = useState("");
    const [valor_entrada, setValorEntrada] = useState(0);
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
                setvalortotal((selectedProduct.horas_trabalhadas * horas_trabalhadas) - valor_entrada);
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
        const atualizarIdVenda = async () => {
            try {
                const vendaCountResponse = await CountVendas();
                const vendaCount = vendaCountResponse["COUNT(*)"];
                setIdVenda(vendaCount + 1);
            } catch (error) {
                console.error("Erro ao contar as vendas: ", error);
            }
        };
        atualizarIdVenda();
    }, []);

    
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!cpf_cnpj_input) newErrors.cpf_cnpj_input = "CPF/CNPJ é obrigatório";
        if (!DataInicio) newErrors.DataInicio = "Data de início é obrigatória";
        if (!DataFim) newErrors.DataFim = "Data de término é obrigatória";
        if (!new_tipo_contrato_id) newErrors.new_tipo_contrato_id = "Modelo de contrato é obrigatório";
        if (!new_produto_id) newErrors.new_produto_id = "Produto é obrigatório";
        if (!horas_trabalhadas) newErrors.horas_trabalhadas = "Horas trabalhadas é obrigatório";
        if (!nome_contato) newErrors.nome_contato = "Nome do contato é obrigatório";
        if (!telefone) newErrors.telefone = "Telefone do contato é obrigatório";
        if (!email) newErrors.email = "Email do contato é obrigatório";
        if (!statusCliente) newErrors.statusCliente = "Status do cliente é obrigatório";
        if (!metodo_pagamento) newErrors.metodo_pagamento = "Selecione um método de pagamento";

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
        setValorEntrada(0);
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
                Number(valor_entrada),
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

    return (
        <div className="flex flex-col gap-3 md:flex md:flex-col lg:flex-row">
            <div className="w-full lg:w-7/12">
                <Card className="p-10 hover:shadow-xl rounded-lg border">
                    <form onSubmit={handleSearchCPF}>
                        <div className="flex justify-between mb-6 md:text-2xl font-bold">
                            <h1>Contrato</h1>
                        </div>
                        <h2 className="mb-5 font-bold">Dados do Contrato</h2>
                        <div className="md:grid md:grid-cols-12 gap-5 mb-5">
                            <input
                                className="border-b-2 mt-auto md:col-span-4 focus:outline-none focus:border-blue-500"
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
                                className="col-span-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                BUSCAR
                            </button>
                            {errors.cpf_cnpj_input && <span className="error text-xs text-red-600 -mt-4">{errors.cpf_cnpj_input}</span>}
                        </div>

                        <div className="md:grid md:grid-cols-2 gap-5 mt-5">
                            <div className="flex flex-col mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Data Inicio</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Data de inicio" type="date"
                                    value={DataInicio}
                                    onChange={(event) => {
                                        setDataInicio(event.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, DataInicio: '' }));
                                    }}
                                />
                                {errors.DataInicio && <span className="error text-xs text-red-600 mt-1">{errors.DataInicio}</span>}
                            </div>

                            <div className="flex flex-col mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Data Termino</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    type="date"
                                    value={DataFim}
                                    onChange={(event) => {
                                        setDataFim(event.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, DataFim: '' }));
                                    }} />
                                {errors.DataFim && <span className="error text-xs text-red-600 mt-1">{errors.DataFim}</span>}
                            </div>
                        </div>

                        <div className="md:grid md:grid-cols-3 gap-5 mb-5">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Modelo do Contratos</label>
                                <Select onValueChange={(value) => {
                                    setnew_tipo_contrato_id(value);
                                    setErrors((prevErrors) => ({ ...prevErrors, new_tipo_contrato_id: '' }));
                                }}>
                                    <SelectTrigger className="rounded-lg">
                                        <SelectValue placeholder="Tipo Contrato" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ModeloContrato.map((tipos_contrato) => (
                                            <SelectItem key={tipos_contrato.id} value={tipos_contrato.id.toString()}>{tipos_contrato.nome}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.new_tipo_contrato_id && <span className="error text-xs text-red-600 h-fit mt-10 mr-1">{errors.new_tipo_contrato_id}</span>}
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Produto</label>
                                <Select onValueChange={(value) => {
                                    setnew_produto_id(value);
                                    setErrors((prevErrors) => ({ ...prevErrors, new_produto_id: '' }));
                                }}>
                                    <SelectTrigger className="rounded-lg">
                                        <SelectValue placeholder="Produto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TiposProduto.map((tipo_Produto) => (
                                            <SelectItem key={tipo_Produto.id} value={tipo_Produto.id.toString()}>{tipo_Produto.nome}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div></div> {/*Sim, deixa dessa forma, gambiarra mas funciona, se tirar essa div vai quebrar*/}
                                {errors.new_produto_id && <span className="error text-xs text-red-600 h-fit mt-1 w-max ,r-1">{errors.new_produto_id}</span>}
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Horas Trabalhadas</label>
                                <input
                                    id="horas-trabalhadas"
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="0 "
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
                                {errors.horas_trabalhadas && <span className="error text-xs text-red-600 mt-1">{errors.horas_trabalhadas}</span>}
                            </div>
                        </div>

                        <h2 className="font-bold">Dados do Contato</h2>
                        <div className="grid grid-cols-2 gap-5 mt-5">
                            <div className="grid grid-cols-1">
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Nome"
                                    value={nome_contato}
                                    onChange={(event) => {
                                        setNomeContato(event.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, nome_contato: '' }));
                                    }}
                                    type="text" />
                                {errors.nome_contato && <span className="error text-xs text-red-600 mt-1">{errors.nome_contato}</span>}
                            </div>
                            <div className="grid grid-cols-1">
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="(99) 99999-9999"
                                    value={telefone}
                                    onChange={(event) => {
                                        setTelefoneContato(insertMaskTelefone(event.target.value));
                                        setErrors((prevErrors) => ({ ...prevErrors, telefone: '' }));
                                    }}
                                    type="tel" />
                                {errors.telefone && <span className="error text-xs text-red-600 mt-1">{errors.telefone}</span>}
                            </div>
                            <div className="grid grid-cols-1">
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmailContato(event.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
                                    }}
                                    type="email" />
                                {errors.email && <span className="error text-xs text-red-600 mt-1">{errors.email}</span>}
                            </div>
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
                        </div>

                        <div className="col-span-2 grid grid-cols-2 items-center gap-5">
                            <label className="block text-md font-bold text-gray-700">Valor da Entrada</label>
                            <div className="relative w-full">
                                <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500">
                                    R$
                                </span>
                                <input
                                    type="text"
                                    id="valorEntrada"
                                    name="valorEntrada"
                                    value={valor_entrada}
                                    onChange={(event) => setValorEntrada(Number(event.target.value))}
                                    placeholder="R$"
                                    className="border-b-2 pl-8 w-full bg-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Status Cliente</label>
                            <Select onValueChange={(value) => {
                                setstatusCliente(value);
                                setErrors((prevErrors) => ({ ...prevErrors, statusCliente: '' }));
                            }}>
                                <SelectTrigger className="h-8 mt-2 rounded-lg w-36">
                                    <SelectValue placeholder="Tipo Cliente" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"antigo"}>Antigo</SelectItem>
                                    <SelectItem value={"novo"}>Novo</SelectItem>
                                </SelectContent>
                                {errors.statusCliente && <span className="error text-xs text-red-600 mt-1">{errors.statusCliente}</span>}
                            </Select>
                        </div>

                        <div className="col-span-2">
                            <h2 className="font-bold mb-3">Método de Pagamento</h2>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center">
                                        <input
                                            id="pagamento-opcao-1" type="radio" name="forma-pagamento"
                                            value="À vista"
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                            aria-labelledby="pagamento-opcao-1"
                                            aria-describedby="pagamento-opcao-1"
                                            onClick={() => {
                                                setmetodo_pagamento("À vista");
                                                setnumero_parcelo(1);
                                                setMostrarParcelas(false);
                                                setErrors((prevErrors) => ({ ...prevErrors, metodo_pagamento: '' }));
                                            }} />
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
                                            aria-labelledby="pagamento-opcao-2"
                                            aria-describedby="pagamento-opcao-2"
                                            onClick={() => {
                                                setmetodo_pagamento("Parcelado");
                                                setMostrarParcelas(true);
                                                setnumero_parcelo(0);
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
                        </div>
                        {errors.metodo_pagamento && <span className="error text-xs text-red-600 mt-1">{errors.metodo_pagamento}</span>}

                        <div className="col-span-2 flex justify-between items-center">
                            <label className="font-bold">
                                Valor total a pagar:
                            </label>
                            <h1 className="font-bold">
                                {`R$ ${valor_total.toFixed(2)}`}
                            </h1>
                        </div>
                        <div className="text-center col-span-2">
                            <div className="text-center col-span-2">
                                <div className="text-center">
                                    <button type="submit"
                                        onClick={handleSubmit}
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                        CADASTRAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </form>
                <div className="flex flex-col mb-5 py-3">
                    {renderGestaoCliente()}
                </div>
            </div>
        </div>
    );
}

function setErrors(newErrors: { [key: string]: string; }) {
    throw new Error("Function not implemented.");
}   

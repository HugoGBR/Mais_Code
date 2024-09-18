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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { insertMaskCpfCnpj, insertMaskTelefone, insertMaskValorMonetario } from "@/lib/MaskInput/MaskInput";

export default function CardCadastro() {
    const [numero_parcelas, setNumeroParcelas] = useState("");
    const [valor_entrada, setValorEntrada] = useState("");
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
                setvalortotal(selectedProduct.horas_trabalhadas * horas_trabalhadas);
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
                const vendaCountResponse = await CountVendas(); // Chama a função para obter o count
                const vendaCount = vendaCountResponse["COUNT(*)"]; // Extrai o valor do count
                setIdVenda(vendaCount + 1); // Define o novo valor de id_venda (count + 1)
            } catch (error) {
                console.error("Erro ao contar as vendas: ", error);
            }
        };
        atualizarIdVenda();
    }, []);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!cpf_cnpj_input) newErrors.cpf_cnpj_input = "CPF/CNPJ é obrigatório";
        if (!DataInicio) newErrors.DataInicio = "Data de início é obrigatória";
        if (!DataFim) newErrors.DataFim = "Data de fim é obrigatória";
        if (!new_tipo_contrato_id) newErrors.new_tipo_contrato_id = "Modelo de contrato é obrigatório";
        if (!new_produto_id) newErrors.new_produto_id = "Produto é obrigatório";
        if (horas_trabalhadas < 0) newErrors.horas_trabalhadas = "Horas trabalhadas não pode ser negativa";
        if (!nome_contato) newErrors.nome_contato = "Nome do contato é obrigatório";
        if (!telefone) newErrors.telefone = "Telefone do contato é obrigatório";
        if (!email) newErrors.email = "Email do contato é obrigatório";
        if (!metodo_pagamento) newErrors.metodo_pagamento = "Método de pagamento é obrigatório";

        if (Object.keys(newErrors).length > 0) {
            toast({
                title: "Erro de Validação",
                description: "Por favor, preencha todos os campos obrigatórios.",
                className: "bg-red-600 text-white"
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
    
        try {
            console.log("Tentando cadastrar a venda...");
    
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
                2
            );
    
            // Verifica se a resposta da venda é verdadeira (true)
            if (vendaResponse) {
                console.log("Venda cadastrada com sucesso.");
    
                toast({
                    title: "Sucesso",
                    description: "Cadastro realizado com sucesso!",
                    className: "bg-green-500 text-white",
                });
    
                resetForm();
                route.push("/routes/home");
    
            } else {
                // Lança erro se a resposta for falsa
                throw new Error("Erro ao cadastrar a venda: resposta inválida");
            }
        } catch (error) {
            console.error("Erro ao cadastrar a venda:", error);
            toast({
                title: "Erro",
                description: "Falha ao cadastrar a venda",
                className: "bg-red-600 text-white",
            });
        }
    }
    
    
    

    async function handleSubmitParcela(vendaId: number, numeroParcelas: number, valoresParcelas: number[], toast: any) {
        try {
            console.log("Iniciando cadastro das parcelas...");
    
            for (let i = 0; i < numeroParcelas; i++) {
                const valorParcela = valoresParcelas[i] || 0;
                const responseParcela = await createNewParcela(
                    vendaId,
                    numeroParcelas,
                    i + 1,
                    valorParcela,
                    2
                );
    
                // Verifica se a resposta da parcela contém um erro
                if (responseParcela && responseParcela.status === 0) {
                    throw new Error(responseParcela.message || "Erro ao cadastrar parcela");
                }
    
                console.log(`Parcela ${i + 1} cadastrada com sucesso.`);
            }
    
            toast({
                title: "Sucesso",
                description: "Parcelas cadastradas com sucesso!",
                className: "bg-green-500 text-white",
            });
    
        } catch (error) {
            console.error("Erro ao cadastrar as parcelas:", error);
            toast({
                title: "Erro",
                description: "Falha ao cadastrar as parcelas",
                className: "bg-red-600 text-white",
            });
    
            // Relança o erro para ser capturado no handleSubmit
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
                className: "bg-red-600 text-white"
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
        <>
            <div className="flex flex-col md:gap-3 md:flex md:flex-col lg:flex-row">
                <div className="w-full lg:w-3/5">
                    <Card className="p-10 drop-shadow-xl">
                        <form onSubmit={handleSearchCPF}>
                            <div className="flex justify-between mb-6 md:text-2xl font-bold">
                                <h1>Contrato</h1>
                                <h1 className="hidden">Nº 00005</h1>
                            </div>
                            <h2 className="mb-5 font-bold">Dados do Contrato</h2>
                            <div className="md:grid md:grid-cols-2 gap-5 mb-5">
                                <div className="md:grid md:grid-cols-2 gap-5 mt-5">
                                    <input
                                        className="border-b-2 h-6 mt-auto focus:outline-none focus:border-blue-500"
                                        placeholder="CPF/CNPJ do Cliente"
                                        type="text"
                                        value={cpf_cnpj_input}
                                        onChange={(e) => setCpfCnpjInput(insertMaskCpfCnpj(e.target.value))}
                                    />
                                    <button
                                        type="submit"
                                        className="w-28 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                        BUSCAR
                                    </button>
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2 gap-5 mt-5">
                                <div className="flex flex-col mb-5">
                                    <label className="text-sm" htmlFor="teste">Data Inicio</label>
                                    <input
                                        className="border-b-2 focus:outline-none focus:border-blue-500"
                                        placeholder="Data de inicio" type="date"
                                        value={DataInicio}
                                        onChange={(event) => setDataInicio(event.target.value)} />
                                </div>
                                <div className="flex flex-col mb-5">
                                    <label className="text-sm" htmlFor="teste">Data Termino</label>
                                    <input
                                        className="border-b-2 focus:outline-none focus:border-blue-500" type="date"
                                        value={DataFim}
                                        onChange={(event) => setDataFim(event.target.value)} />
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2">
                                <div className="md:grid md:grid-cols-1 mb-5 md:mb-9 w-48">
                                    <label className="col-span-2 text-sm" htmlFor="teste">Modelo do Contratos</label>
                                    <Select onValueChange={(value) => setnew_tipo_contrato_id(value)}>
                                        <SelectTrigger className="h-8 mt-1 mb-4 rounded-lg w-36">
                                            <SelectValue placeholder="Tipo Contrato" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ModeloContrato.map((tipos_contrato) => (
                                                <SelectItem key={tipos_contrato.id} value={tipos_contrato.id.toString()}>{tipos_contrato.nome}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <label className="col-span-2 text-sm" htmlFor="teste">Produto</label>
                                    <Select onValueChange={(value) => setnew_produto_id(value)}>
                                        <SelectTrigger className="h-8 mt-1 rounded-lg w-36">
                                            <SelectValue placeholder="Produto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TiposProduto.map((tipo_Produto) => (
                                                <SelectItem key={tipo_Produto.id} value={tipo_Produto.id.toString()}>{tipo_Produto.nome}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col mb-5 md:ml-5">
                                    <label className="text-sm mb-2" htmlFor="horas-trabalhadas">Horas Trabalhadas</label>
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
                                            } else {
                                                setHorasTrabalhadas(0);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <h2 className="font-bold">Dados do Contato</h2>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Nome"
                                    value={nome_contato}
                                    onChange={(event) => setNomeContato(event.target.value)}
                                    type="text" />
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="(99) 99999-9999"
                                    value={telefone}
                                    onChange={(event) => setTelefoneContato(insertMaskTelefone(event.target.value))}
                                    type="tel" />
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(event) => setEmailContato(event.target.value)}
                                    type="email" />
                            </div>
                        </form>
                    </Card>
                </div>
                <div className="w-full lg:w-2/5">
                    <Card className="p-10 drop-shadow-xl">
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-center mb-6 text-2xl font-bold">
                                <h1>Forma de Pagamento</h1>
                            </div>
                            <div className="flex mb-4 ">
                                <label className="mr-4" htmlFor="teste">Valor da Entrada</label>
                                <div className="relative w-28">
                                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        R$
                                    </span>
                                    <input
                                        className="border-b-2 pl-8 w-auto focus:outline-none focus:border-blue-500"
                                        placeholder="0000,00"
                                        type="text"
                                        value={valor_entrada}
                                        onChange={(event) => setValorEntrada(insertMaskValorMonetario(event.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="text-sm" htmlFor="Nn">Status Cliente</label>
                                <Select onValueChange={(value) => setstatusCliente(value)}>
                                    <SelectTrigger className="h-8 mt-2 rounded-lg w-36">
                                        <SelectValue placeholder="Tipo Cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"antigo"}>Antigo</SelectItem>
                                        <SelectItem value={"novo"}>Novo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <h2 className="font-bold mb-5">Metodo de Pagamento</h2>
                            <div className="space-y-4 md:flex md:justify-between md:w-full">
                                <div className="flex gap-3">
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
                                            }} />
                                        <label htmlFor="pagamento-opcao-1"
                                            className="block ml-2 text-sm font-medium text-gray-900">
                                            À vista
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="pagamento-opcao-2" type="radio" name="forma-pagamento"
                                            value="Parcelado"
                                            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                            aria-labelledby="pagamento-opcao-2"
                                            aria-describedby="pagamento-opcao-2"
                                            onClick={() => {
                                                setmetodo_pagamento("Parcelado");
                                                setMostrarParcelas(true);
                                            }} />
                                        <label htmlFor="pagamento-opcao-2"
                                            className="block ml-2 text-sm font-medium text-gray-900">
                                            Parcelado
                                        </label>
                                    </div>
                                </div>
                                {mostrarParcelas && (
                                    <div className="flex space-x-4">
                                        <input
                                            className="border-b-2 text-center w-14 flex focus:outline-none focus:border-blue-500"
                                            placeholder="36x"
                                            type="number"
                                            min="1"
                                            value={numero_parcelo}
                                            onChange={(event) => setnumero_parcelo(Number(event.target.value))}
                                        />
                                        <PopUpConfig
                                            valorTotal={valor_total}
                                            parcelas={numero_parcelo}
                                            onSetValoresParcelas={handleSetValoresParcelas}
                                            onConfirm={(vendaId, numeroParcelas, valoresParcelas) => handleSubmitParcela(vendaId, numeroParcelas, valoresParcelas, toast)}
                                            idVenda={id_venda}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between mt-5 h-auto">
                                <label className="font-bold" htmlFor="teste">Valor total a pagar:</label>
                                <h1 className="font-bold">{`R$ ${valor_total.toFixed(2)}`}</h1>
                            </div>
                            <div className="mt-5 text-center">
                                <button type="submit"
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                    CADASTRAR
                                </button>
                            </div>
                        </form>
                    </Card>
                    <div className="flex flex-col mb-5 py-3">
                        {renderGestaoCliente()}
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
}

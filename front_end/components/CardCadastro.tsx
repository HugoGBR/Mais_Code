import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { GoGear } from "react-icons/go";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createNewSell } from "@/lib/VendaController";
import { dadosModelo_contrato, dadosProduto, dadosTipo_cliente } from "@/lib/interfaces/dadosUsuarios";
import { getAllProduto, getAllTiposClientes } from "@/lib/ProdutoController";
import { getAllContratos } from "@/lib/ContratoController";

export default function CardCadastro() {
    const [TiposClientes, setTiposClientes] = useState<dadosTipo_cliente[]>([]);
    const [TiposProduto, setTipoProduto] = useState<dadosProduto[]>([]);
    const [ModeloContrato, setModeloContrato] = useState<dadosModelo_contrato[]>([]);
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
    const [valor_total, setvalortotal] = useState("");
    const [metodo_pagamento, setmetodo_pagamento] = useState("");
    const [numero_parcelo, setnumero_parcelo] = useState("");

    const route = useRouter();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const datadoinicio = new Date(DataInicio)
        const datadofim = new Date(DataFim)

        await createNewSell(
            Number(new_cliente_id),
            Number(new_tipo_contrato_id),
            Number(new_produto_id),
            Number(new_usuario_id),
            datadofim,
            Number(valor_entrada),
            Number(valor_total),
            datadoinicio,
            metodo_pagamento,
            email,
            telefone,
            nome_contato,
            Number(numero_parcelo),
            2
        )
        route.push("/routes/cadastros")
    }

    useEffect(() => {
        const fetchData = async () => {
            const tipos_cliente = await getAllTiposClientes();
            setTiposClientes(tipos_cliente);
            const tipos_contrato = await getAllContratos();
            setModeloContrato(tipos_contrato);
            const tipo_Produto = await getAllProduto();
            setTipoProduto(tipo_Produto);
        };

        fetchData();
    }, []);
    
    async function handleSubmitCPF(event: FormEvent) {
        event.preventDefault()
    }

    return (
        <div className="flex flex-col md:gap-3 md:flex md:flex-col lg:flex-row">
            <div className="w-full lg:w-3/5">
                <Card className="p-10 drop-shadow-xl">
                    <form onSubmit={handleSubmitCPF}>
                        <div className="flex justify-between mb-6 md:text-2xl font-bold">
                            <h1>Contrato</h1>
                            <h1>Nº 00005</h1>
                        </div>

                        <h2 className="mb-5 font-bold">Dados do Contrato</h2>
                        <div className="md:grid md:grid-cols-2 gap-5 mb-5">
                            <div className="md:grid md:grid-cols-2 gap-5 mt-5">
                                <input className="border-b-2 h-6 mt-auto focus:outline-none focus:border-blue-500"
                                    placeholder="CPF/CNPJ do Cliente"
                                    type="text" />
                                <button type="submit"
                                    className="w-28 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                    BUSCAR
                                </button>
                            </div>

                            <input className="border-b-2 mt-auto focus:outline-none focus:border-blue-500 invisible"
                                placeholder="Colaborador"
                                type="text" />
                            <div className="flex flex-col mb-5">
                                <label className="text-sm" htmlFor="teste">Data Inicio</label>
                                <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Data de inicio" type="date"
                                    onChange={(event) => setDataInicio(event.target.value)} />
                            </div>
                            <div className="flex flex-col mb-5">
                                <label className="text-sm" htmlFor="teste">Data Termino</label>
                                <input className="border-b-2 focus:outline-none focus:border-blue-500" type="date"
                                    onChange={(event) => setDataFim(event.target.value)} />
                            </div>
                        </div>

                        <div className="md:grid md:grid-cols-2 ">
                            <div className="md:grid md:grid-cols-1 mb-5 md:mb-9 w-48">
                                <label className="col-span-2 text-sm" htmlFor="teste">Modelo do Contratos</label>
                                <Select>
                                    <SelectTrigger className="h-8 mt-1 mb-4 rounded-lg w-36">
                                        <SelectValue placeholder="Tipo Contrato" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {ModeloContrato.map((tipos_contrato) => (
                                        <SelectItem key={tipos_contrato.id} value={tipos_contrato.nome}>{tipos_contrato.nome}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>

                                <label className="col-span-2 text-sm" htmlFor="teste">Produto</label>
                                <Select>
                                    <SelectTrigger className="h-8 mt-1 rounded-lg w-36">
                                        <SelectValue placeholder="Produto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {TiposProduto.map((tipo_Produto) => (
                                        <SelectItem key={tipo_Produto.id} value={tipo_Produto.nome}>{tipo_Produto.nome}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col mb-5 md:ml-5">
                                <label className="text-sm mb-2" htmlFor="teste">Horas Trabalhadas</label>
                                <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                    // onChange={(event) => setHoraTrabalhada(event.target.value)}
                                    placeholder="Horas" type="number" />
                            </div>
                        </div>

                        <h2 className="font-bold">Dados do Contato</h2>
                        <div className="grid grid-cols-2 gap-5 mt-5">
                            <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="Nome"
                                onChange={(event) => setNomeContato(event.target.value)}
                                type="text" />
                            <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="(99) 99999-9999"
                                onChange={(event) => setTelefoneContato(event.target.value)} type="tel" />
                            <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="Email" onChange={(event) => setEmailContato(event.target.value)}
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
                            <input className="border-b-2 w-28 focus:outline-none focus:border-blue-500"
                                placeholder="R$ 0000,00" type="text"
                                onChange={(event) => setValorEntrada(event.target.value)} />
                        </div>

                        <div className="mb-5">
                            <label className="text-sm" htmlFor="Nn">Status Cliente</label>
                            <Select>
                                <SelectTrigger className="h-8 mt-2 rounded-lg w-36">
                                    <SelectValue placeholder="Tipo Cliente" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TiposClientes.map((tipos_cliente) => (
                                        <SelectItem key={tipos_cliente.id} value={tipos_cliente.nome}>{tipos_cliente.nome}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <h2 className="font-bold mb-5">Metodo de Pagamento</h2>
                        <div className="space-y-4 md:flex md:justify-between md:w-full">
                            <div className="flex gap-3">
                                <div className="flex items-center">
                                    <input id="pagamento-opcao-1" type="radio" name="forma-pagamento"
                                        value="À vista"
                                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                        aria-labelledby="pagamento-opcao-1"
                                        aria-describedby="pagamento-opcao-1"
                                        onClick={() => setMostrarParcelas(false)} />
                                    <label htmlFor="pagamento-opcao-1"
                                        className="block ml-2 text-sm font-medium text-gray-900">
                                        À vista
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input id="pagamento-opcao-2" type="radio" name="forma-pagamento"
                                        value="Parcelado"
                                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                        aria-labelledby="pagamento-opcao-2"
                                        aria-describedby="pagamento-opcao-2"
                                        onClick={() => setMostrarParcelas(true)} />
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
                                        type="text"
                                    />
                                    <Link href="">
                                        <GoGear className="w-8 h-8" />
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between mt-5 h-auto">
                            <label className="font-bold" htmlFor="teste">Valor total a pagar:</label>
                            <h1 className="font-bold">R$ 0000,00</h1>
                        </div>
                        <div className="mt-5 text-center">
                            <button type="submit"
                                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                CADASTRAR
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}



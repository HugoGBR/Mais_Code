'use client'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { GoGear } from 'react-icons/go';
import { useRouter } from 'next/navigation'; // Importe from next/navigation em vez de next/router
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createNewSell } from '@/lib/VendaController';
import { dadosCliente, dadosModelo_contrato, dadosProduto } from '@/lib/interfaces/dadosUsuarios';
import { getAllProduto } from '@/lib/ProdutoController';
import { getAllContratos } from '@/lib/ContratoController';
import { getAllClient } from '@/lib/ClienteController';
import CardCliente from '@/components/CardClienteGestao';

export default function CardCadastro() {
    const [TiposProduto, setTiposProduto] = useState<dadosProduto[]>([]);
    const [ModeloContrato, setModeloContrato] = useState<dadosModelo_contrato[]>([]);
    const [listaCliente, setListaCliente] = useState<dadosCliente[]>([]);
    const [mostrarParcelas, setMostrarParcelas] = useState(false);
    const [valor_entrada, setValorEntrada] = useState<string>('0');
    const [DataInicio, setDataInicio] = useState<string>('');
    const [DataFim, setDataFim] = useState<string>('');
    const [nome_contato, setNomeContato] = useState<string>('');
    const [telefone, setTelefoneContato] = useState<string>('');
    const [email, setEmailContato] = useState<string>('');
    const [new_cliente_id, setNewClienteId] = useState<string>('');
    const [new_tipo_contrato_id, setNewTipoContratoId] = useState<string>('');
    const [new_produto_id, setNewProdutoId] = useState<string>('');
    const [new_usuario_id, setNewUsuarioId] = useState<string>('');
    const [valor_total, setValorTotal] = useState<number>(0);
    const [metodo_pagamento, setMetodoPagamento] = useState<string>('');
    const [numero_parcelo, setNumeroParcelo] = useState<string>('1');
    const [cpf_cnpj_input, setCpfCnpjInput] = useState<string>('');
    const [statusCliente, setStatusCliente] = useState<string>('');
    const [foundCliente, setFoundCliente] = useState<dadosCliente | null>(null);
    const [horas_trabalhadas, setHorasTrabalhadas] = useState<number>(0);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const tiposContrato = await getAllContratos();
            setModeloContrato(tiposContrato);
            const tiposProduto = await getAllProduto();
            setTiposProduto(tiposProduto);
            const clientes = await getAllClient();
            setListaCliente(clientes);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (new_produto_id && horas_trabalhadas) {
            const selectedProduct = TiposProduto.find(produto => produto.id.toString() === new_produto_id);
            if (selectedProduct) {
                const valorEntradaNumerico = parseFloat(valor_entrada) || 0;
                const total = (selectedProduct.horas_trabalhadas * horas_trabalhadas) - valorEntradaNumerico;
                setValorTotal(total);
            }
        }
    }, [new_produto_id, horas_trabalhadas, valor_entrada]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const datadoinicio = new Date(DataInicio);
        const datadofim = new Date(DataFim);

        await createNewSell(
            Number(new_cliente_id),
            Number(new_tipo_contrato_id),
            Number(new_produto_id),
            Number(new_usuario_id),
            Number(statusCliente), // Aqui statusCliente é string, e createNewSell espera number
            datadofim,
            parseFloat(valor_entrada),
            valor_total,
            datadoinicio,
            metodo_pagamento,
            email,
            telefone,
            nome_contato,
            numero_parcelo,
            2
        );

        router.push("/routes/cadastros");
    };

    const handleSearchCPF = (event: FormEvent) => {
        event.preventDefault();
        const clienteEncontrado = listaCliente.find(cliente => cliente.cpf_cnpj === cpf_cnpj_input);
        setFoundCliente(clienteEncontrado || null);
    };

    const renderGestaoCliente = () => {
        if (!foundCliente) return null;
        return (
            <div onClick={() => router.push(`/routes/gestao/cliente/${foundCliente.id}`)} className='bg-gray-300 mb-4 rounded-lg flex-grow cursor-pointer'>
                <Link href={`/routes/gestao/cliente/${foundCliente.id}`}>
                    <a className="block w-full">
                        <CardCliente dados={foundCliente} />
                    </a>
                </Link>
            </div>
        );
    };

    return (
        <div className="flex flex-col md:flex md:flex-col lg:flex-row md:gap-3">
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
                                    onChange={(e) => setCpfCnpjInput(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="w-28 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                    BUSCAR
                                </button>
                            </div>

                            <input
                                className="border-b-2 mt-auto focus:outline-none focus:border-blue-500"
                                placeholder="Colaborador"
                                type="text"
                                onChange={(e) => setNewUsuarioId(e.target.value)}
                            />
                            <div className="flex flex-col mb-5">
                                <label className="text-sm" htmlFor="teste">Data Início</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Data de início"
                                    type="date"
                                    value={DataInicio}
                                    onChange={(e) => setDataInicio(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col mb-5">
                                <label className="text-sm" htmlFor="teste">Data Término</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Data de término"
                                    type="date"
                                    value={DataFim}
                                    onChange={(e) => setDataFim(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="md:grid md:grid-cols-2 ">
                            <div className="md:grid md:grid-cols-1 mb-5 md:mb-9 w-48">
                                <label className="col-span-2 text-sm" htmlFor="teste">Modelo do Contrato</label>
                                <Select onValueChange={(value) => setNewTipoContratoId(value)}>
                                    <SelectTrigger className="h-8 mt-1 mb-4 rounded-lg w-36">
                                        <SelectValue placeholder="Tipo de Contrato" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ModeloContrato.map((tipoContrato) => (
                                            <SelectItem key={tipoContrato.id} value={tipoContrato.id.toString()}>
                                                {tipoContrato.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <label className="col-span-2 text-sm" htmlFor="teste">Produto</label>
                                <Select onValueChange={(value) => setNewProdutoId(value)}>
                                    <SelectTrigger className="h-8 mt-1 rounded-lg w-36">
                                        <SelectValue placeholder="Produto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TiposProduto.map((tipoProduto) => (
                                            <SelectItem key={tipoProduto.id} value={tipoProduto.id.toString()}>
                                                {tipoProduto.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col mb-5 md:ml-5">
                                <label className="text-sm mb-2" htmlFor="teste">Horas Trabalhadas</label>
                                <input
                                    className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Horas"
                                    type="number"
                                    value={horas_trabalhadas}
                                    onChange={(e) => setHorasTrabalhadas(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <h2 className="font-bold">Dados do Contato</h2>
                        <div className="grid grid-cols-2 gap-5 mt-5">
                            <input
                                className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="Nome"
                                type="text"
                                value={nome_contato}
                                onChange={(e) => setNomeContato(e.target.value)}
                            />
                            <input
                                className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="(99) 99999-9999"
                                type="tel"
                                value={telefone}
                                onChange={(e) => setTelefoneContato(e.target.value)}
                            />
                            <input
                                className="border-b-2 focus:outline-none focus:border-blue-500"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmailContato(e.target.value)}
                            />
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
                            <input
                                className="border-b-2 w-28 focus:outline-none focus:border-blue-500"
                                placeholder="R$ 0000,00"
                                type="text"
                                value={valor_entrada}
                                onChange={(e) => setValorEntrada(e.target.value)}
                            />
                        </div>

                        <div className="mb-5">
                            <label className="text-sm" htmlFor="teste">Status Cliente</label>
                            <Select onValueChange={(value) => setStatusCliente(value)}>
                                <SelectTrigger className="h-8 mt-2 rounded-lg w-36">
                                    <SelectValue placeholder="Tipo Cliente" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="antigo">Antigo</SelectItem>
                                    <SelectItem value="novo">Novo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <h2 className="font-bold mb-5">Método de Pagamento</h2>
                        <div className="space-y-4 md:flex md:justify-between md:w-full">
                            <div className="flex gap-3">
                                <div className="flex items-center">
                                    <input
                                        id="pagamento-opcao-1"
                                        type="radio"
                                        name="forma-pagamento"
                                        value="À vista"
                                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                        onClick={(e) => {
                                            setMetodoPagamento("À vista");
                                            setNumeroParcelo("1");
                                            setMostrarParcelas(false);
                                        }}
                                    />
                                    <label htmlFor="pagamento-opcao-1" className="block ml-2 text-sm font-medium text-gray-900">
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
                                            setMetodoPagamento("Parcelado");
                                            setMostrarParcelas(true);
                                        }}
                                    />
                                    <label htmlFor="pagamento-opcao-2" className="block ml-2 text-sm font-medium text-gray-900">
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
                                        value={numero_parcelo}
                                        onChange={(e) => setNumeroParcelo(e.target.value)}
                                    />
                                    <Link href="">
                                        <GoGear className="w-8 h-8" />
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between mt-5 h-auto">
                            <label className="font-bold" htmlFor="teste">Valor total a pagar:</label>
                            <h1 className="font-bold">{`R$ ${valor_total.toFixed(2)}`}</h1>
                        </div>
                        <div className="mt-5 text-center">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            >
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
    );
}

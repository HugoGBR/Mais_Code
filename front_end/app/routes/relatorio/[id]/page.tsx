import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllContratos, getContractById, updateContract } from "@/lib/ContratoController";
import { dadosCliente, dadosModelo_contrato, dadosProduto } from "@/lib/interfaces/dadosUsuarios";
import { getAllProduto } from "@/lib/ProdutoController";
import { getAllClient } from "@/lib/ClienteController";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EditContract({ contractId }) {
    const [contract, setContract] = useState(null);
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
    const [numero_parcelo, setnumero_parcelo] = useState("1");
    const [cpf_cnpj_input, setCpfCnpjInput] = useState("");
    const [statusCliente, setstatusCliente] = useState("");
    const [statusClienteValor, setstatusClienteValor] = useState(0);
    const [foundCliente, setFoundCliente] = useState<dadosCliente | null>(null);
    const [horas_trabalhadas, setHorasTrabalhadas] = useState(0);

    const route = useRouter();

    useEffect(() => {
        async function fetchContract() {
            const contractData = await getContractById(contractId);
            setContract(contractData);
            setValorEntrada(contractData.valor_entrada);
            setDataInicio(contractData.DataInicio);
            setDataFim(contractData.DataFim);
            setNomeContato(contractData.nome_contato);
            setTelefoneContato(contractData.telefone);
            setEmailContato(contractData.email);
            setnew_cliente_id(contractData.new_cliente_id.toString());
            setnew_tipo_contrato_id(contractData.new_tipo_contrato_id.toString());
            setnew_produto_id(contractData.new_produto_id.toString());
            setnew_usuario_id(contractData.new_usuario_id.toString());
            setvalortotal(contractData.valor_total);
            setmetodo_pagamento(contractData.metodo_pagamento);
            setnumero_parcelo(contractData.numero_parcelo.toString());
            setCpfCnpjInput(contractData.cpf_cnpj_input);
            setstatusCliente(contractData.statusCliente);
            setstatusClienteValor(contractData.statusClienteValor);
            setHorasTrabalhadas(contractData.horas_trabalhadas);
        }

        fetchContract();

        const fetchData = async () => {
            const tipos_contrato = await getAllContratos();
            setModeloContrato(tipos_contrato);
            const tipo_Produto = await getAllProduto();
            setTipoProduto(tipo_Produto);
            const LCliente = await getAllClient();
            setListaCliente(LCliente);
        };

        fetchData();
    }, [contractId]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const datadoinicio = new Date(DataInicio);
        const datadofim = new Date(DataFim);

        await updateContract(contractId, {
            new_cliente_id: Number(new_cliente_id),
            new_tipo_contrato_id: Number(new_tipo_contrato_id),
            new_produto_id: Number(new_produto_id),
            new_usuario_id: Number(new_usuario_id),
            statusClienteValor,
            datadofim,
            valor_entrada: Number(valor_entrada),
            valor_total,
            datadoinicio,
            metodo_pagamento,
            email,
            telefone,
            nome_contato,
            numero_parcelo,
            cpf_cnpj_input,
            statusCliente,
            horas_trabalhadas
        });
        route.push("/routes/home");
    };

    if (!contract) return <div>Loading...</div>;

    return (
        <Card className="p-10 drop-shadow-xl">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between mb-6 md:text-2xl font-bold">
                    <h1>Edit Contract</h1>
                </div>
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
                        <label className="text-sm mb-2" htmlFor="teste">Horas Trabalhadas</label>
                        <input
                            className="border-b-2 focus:outline-none focus:border-blue-500"
                            placeholder="Horas"
                            type="number"
                            onChange={(event) => setHorasTrabalhadas(Number(event.target.value))}
                        />
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
                {/* Use the state values to pre-fill the fields */}

                <div className="mt-5 text-center">
                    <button type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                        UPDATE
                    </button>
                </div>
            </form>
        </Card>
    );
}

'use client'
import {Card} from "@/components/ui/card";
import React from "react";

import { GoGear } from "react-icons/go";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {useRouter} from "next/navigation";


export default function Contrato() {
    //Faça suas const aqui(constantes)
    const routa = useRouter()
    const RotaContrato = () => {
        routa.push('/Rotas/Cadastros');
    }
    const RotaCliente = () => {
        routa.push('/Rotas/Cadastros/Cliente');
    }
    return (
        <div className="flex flex-col items-center md:grid md:grid-cols-2 space-x-4">
            <div>
                <Card className="p-10 drop-shadow-xl">
                    <form>
                        <div className="flex flex-col justify-between mb-6 text-2xl font-bold">
                            <h1>Contrato</h1>
                            <h1>Nº 00005</h1>
                        </div>

        <div className="flex flex-col my-auto space-x-4">

            <div className="flex gap-5 mb-5">
                <div>
                    <button className="focus:font-bold focus:text-blue-700 focus:border-b-2 focus:outline-none focus:border-blue-500">Contrato</button>
                </div>
                <div>
                    <button className="focus:font-bold focus:text-blue-700 focus:border-b-2 focus:outline-none focus:border-blue-500">Cliente</button>
                </div>
            </div>

            <div className="flex grid grid-cols-2 space-x-4">


                <div className="">


                    <Card className="p-10 drop-shadow-xl">
                        <form>
                            <div className="flex justify-between mb-6 text-2xl font-bold">
                                <h1>Contrato</h1>
                                <h1>Nº 00005</h1>
                            </div>

                            <h2 className="mb-4 font-bold">Dados do Contrato</h2>
                            <div className="grid grid-cols-2 gap-5 mb-4">
                                <input className="border-b-2 focus:outline-none focus:border-blue-500" placeholder="Cliente"
                                    type="text" />
                                <input className="invisible border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Colaborador"
                                    type="text" />
                                <div className="flex flex-col">
                                    <label className="text-sm" htmlFor="teste">Data Inicio</label>
                                    <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                        placeholder="Data de inicio" type="date" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm" htmlFor="teste">Data Termino</label>
                                    <input className="border-b-2 focus:outline-none focus:border-blue-500" type="date" />
                                </div>
                            </div>


                            <div className="grid grid-cols-2 mb-5">
                                <label className="col-span-2 text-sm" htmlFor="teste">Modelo do Contratos</label>
                                <Select>
                                    <SelectTrigger className="h-8 mt-1 rounded-lg w-36">
                                        <SelectValue placeholder="Tipo Contrato" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="teste">Pontual</SelectItem>
                                        <SelectItem value="testee">Contínuo</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="flex flex-col ml-5">
                                    <label className="text-sm" htmlFor="teste">Horas Trabalhadas</label>
                                    <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                        placeholder="Horas" type="number" />
                                </div>
                                <label className="col-span-2 text-sm" htmlFor="teste">Produto</label>
                                <Select>
                                    <SelectTrigger className="h-8 mt-1 rounded-lg w-36">
                                        <SelectValue placeholder="Produto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="teste">Python</SelectItem>
                                        <SelectItem value="testee">php</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <h2 className="font-bold">Dados do Contato</h2>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <input className="border-b-2 focus:outline-none focus:border-blue-500" placeholder="Nome"
                                    type="text" />
                                <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                    placeholder="(99) 99999-9999" type="tel" />
                                <input className="border-b-2 focus:outline-none focus:border-blue-500" placeholder="Email"
                                    type="email" />
                            </div>
                        </form>
                    </Card>
                </div>

                <div>
                    <Card className="p-10 drop-shadow-xl">
                        <form>
                            <div className="flex justify-center mb-6 text-2xl font-bold">
                                <h1>Forma de Pagamento</h1>
                            </div>
                            <div className="flex mb-4 ">
                                <label className="mr-4" htmlFor="teste">Valor da Entrada</label>
                                <input className="border-b-2 w-28 focus:outline-none focus:border-blue-500"
                                    placeholder="R$ 0000,00" type="text" />
                            </div>

                            <div className="mb-5">
                                <label className="text-sm " htmlFor="Nn">Status Cliente</label>
                                <Select>
                                    <SelectTrigger className="h-8 mt-2 rounded-lg w-36">
                                        <SelectValue placeholder="Tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="teste">Novo</SelectItem>
                                        <SelectItem value="testee">Antigo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <h2 className="font-bold">Metodo de Pagamento</h2>
                            <div className="flex items-center space-x-8 border-b-2">
                                <div className="flex items-center mb-4">
                                    <input id="pagamento-opcao-1" type="radio" value="À vista"
                                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                        aria-labelledby="pagamento-opcao-1" aria-describedby="pagamento-opcao-1" />
                                    <label htmlFor="pagamento-opcao-1"
                                        className="block ml-2 text-sm font-medium text-gray-900">
                                        À vista
                                    </label>
                                </div>
                                <div className="flex items-center mb-4">
                                    <input id="pagamento-opcao-2" type="radio" value="Parcelado"
                                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                        aria-labelledby="pagamento-opcao-2" aria-describedby="pagamento-opcao-2" />
                                    <label htmlFor="pagamento-opcao-2"
                                        className="block ml-2 text-sm font-medium text-gray-900">
                                        Parcelado
                                    </label>
                                </div>
                                <input className="w-24 border-b-2" placeholder="N Parcelas" type="text" />
                                <GoGear />
                            </div>

                            <div className="flex justify-between mt-5">
                                <label className="font-bold" htmlFor="teste">Valor da Entrada</label>
                                <input className="font-bold border-b-2 w-28 focus:outline-none focus:border-blue-500"
                                    placeholder="R$ 0000,00" type="text" />
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
        </div>

    )
}
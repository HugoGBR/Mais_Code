'use client'
import {Card} from "@/components/ui/card";
import React from "react";

import {GoGear} from "react-icons/go";
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
  import { useRouter } from "next/navigation";


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
        <div className="flex space-x-4">
            <div>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger onClick={RotaContrato}>Contrato</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger onClick={RotaCliente}>Cliente</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
            </div>
            <div>
                <Card className="p-10 drop-shadow-xl">
                    <form>
                        <div className="flex justify-between mb-6 text-2xl font-bold">
                            <h1>Contrato</h1>
                            <h1>Nº 00005</h1>
                        </div>

                        <h2 className="mb-4 font-bold">Dados do Contrato</h2>
                        <div className="grid grid-cols-2 gap-5 mb-4">
                            <input className="border-b-2 focus:outline-none focus:border-blue-500" placeholder="Cliente"
                                   type="text"/>
                            <input className="border-b-2 focus:outline-none focus:border-blue-500 invisible"
                                   placeholder="Colaborador"
                                   type="text"/>
                            <div className="flex-col flex">
                                <label className="text-sm" htmlFor="teste">Data Inicio</label>
                                <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                       placeholder="Data de inicio" type="date"/>
                            </div>
                            <div className="flex-col flex">
                                <label className="text-sm" htmlFor="teste">Data Termino</label>
                                <input className="border-b-2 focus:outline-none focus:border-blue-500" type="date"/>
                            </div>
                        </div>


                        <div className="grid grid-cols-2 mb-5">
                            <label className="text-sm col-span-2" htmlFor="teste">Modelo do Contratos</label>
                            <Select>
                                <SelectTrigger className="h-8 w-36 rounded-lg mt-1">
                                    <SelectValue placeholder="Tipo Contrato"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="teste">Pontual</SelectItem>
                                    <SelectItem value="testee">Contínuo</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex flex-col ml-5">
                                <label className="text-sm" htmlFor="teste">Horas Trabalhadas</label>
                                <input className=" border-b-2 focus:outline-none focus:border-blue-500"
                                       placeholder="Horas" type="number"/>
                            </div>
                            <label className="text-sm col-span-2" htmlFor="teste">Produto</label>
                            <Select>
                                <SelectTrigger className="h-8 w-36 rounded-lg mt-1">
                                    <SelectValue placeholder="Produto"/>
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
                                   type="text"/>
                            <input className="border-b-2 focus:outline-none focus:border-blue-500"
                                   placeholder="(99) 99999-9999" type="tel"/>
                            <input className="border-b-2 focus:outline-none focus:border-blue-500" placeholder="Email"
                                   type="email"/>
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
                                   placeholder="R$ 0000,00" type="text"/>
                        </div>

                        <div className="mb-5">
                            <label className="text-sm " htmlFor="Nn">Status Cliente</label>
                            <Select>
                                <SelectTrigger className="h-8 w-36 rounded-lg mt-2">
                                    <SelectValue placeholder="Tipo"/>
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
                                       className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                       aria-labelledby="pagamento-opcao-1" aria-describedby="pagamento-opcao-1"/>
                                <label htmlFor="pagamento-opcao-1"
                                       className="text-sm font-medium text-gray-900 ml-2 block">
                                    À vista
                                </label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input id="pagamento-opcao-2" type="radio" value="Parcelado"
                                       className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                       aria-labelledby="pagamento-opcao-2" aria-describedby="pagamento-opcao-2"/>
                                <label htmlFor="pagamento-opcao-2"
                                       className="text-sm font-medium text-gray-900 ml-2 block">
                                    Parcelado
                                </label>
                            </div>
                            <input className="border-b-2 w-24" placeholder="N Parcelas" type="text"/>
                            <GoGear/>
                        </div>

                        <div className="flex justify-between mt-5">
                            <h1>Total à Pagar</h1>
                            <h1 className="font-bold">R$ 0000,00</h1>
                        </div>
                        <div className="text-center mt-5">
                            <button type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                CADASTRAR
                            </button>
                        </div>


                    </form>
                </Card>

            </div>
        </div>

    )
}
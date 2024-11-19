import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import * as React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {useState} from "react";

export default function TipoClientes() {
    const [mostrarParcelas, setMostrarParcelas] = useState(false);
    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <Card className="w-[375px]Z\ rounded-lg border">
                    <CardHeader>
                        <CardTitle>Cliente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center items-center opacity-40">
                            <img src="/icons/icon-perfil-preto.png" className="w-20 h-20 opacity-40" alt="imagem"/>
                        </div>
                        <form>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <input className="invisible border-b-2 focus:outline-none focus:border-blue-500"
                                           placeholder="Nome"
                                           type="text"/>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <input className="invisible border-b-2 focus:outline-none focus:border-blue-500"
                                           placeholder="CPF/CNPJ"
                                           type="text"/>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <input className="invisible border-b-2 focus:outline-none focus:border-blue-500"
                                           placeholder="Email"
                                           type="text"/>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <input className="invisible border-b-2 focus:outline-none focus:border-blue-500"
                                           placeholder="Endereço"
                                           type="text"/>
                                </div>
                            </div>
                            <h1>Cargo</h1>


                            <div className="flex gap-3">
                                <div className="flex items-center">
                                    <input id="pagamento-opcao-1" type="radio" name="forma-pagamento"
                                           value="À vista"
                                           className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                           aria-labelledby="pagamento-opcao-1"
                                           aria-describedby="pagamento-opcao-1"
                                           onClick={() => setMostrarParcelas(false)}/>
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
                                           onClick={() => setMostrarParcelas(true)}/>
                                    <label htmlFor="pagamento-opcao-2"
                                           className="block ml-2 text-sm font-medium text-gray-900">
                                        Parcelado
                                    </label>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button
                                    className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ">Cadastrar
                                    cliente
                                </button>
                            </DialogTrigger>
                        </Dialog>
                    </CardFooter>
                </Card>
            </div>
        </div>

    );
}
import * as React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import PopupConfirmacao from "@/components/PopUpConfirmacao";


export default function GestaoCliente() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[375px] shadow-xl">
                <CardHeader>
                    <CardTitle>Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center ">
                        <img
                            className="w-20 h-20 opacity-40"
                            src={'/icons/icon-empresa.png'}
                            alt="Imagem"
                        />
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
                                       placeholder="CPF"
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
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center items-center ">
                    <PopupConfirmacao/>
                </CardFooter>
            </Card>
        </div>
    );
}


"use client"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import * as React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import FileAvatar from "@/components/FileAvatar";
import {Menubar} from "@/components/ui/menubar";


export default function CardWithForm() {
    return (

        <div className="flex flex-col justify-center gap-5">

            <div className="flex justify-center mb-2">
                <Card className=" shadow-xl">
                    <CardHeader>
                        <CardTitle>Usuario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center items-center">
                            <FileAvatar/>
                        </div>
                        <form>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        placeholder="Nome"
                                        required
                                        className="border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="tel"
                                        id="cpf-cnpj"
                                        name="cpf-cnpj"
                                        placeholder="(99) 99999-9999"
                                        required
                                        className="border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        className="border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Endereço"
                                        required
                                        className="border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="">
                                <h1 className="mb-2 text-xl font-semibold">Cargo</h1>
                                <RadioGroup defaultValue="option-one">
                                    <div>
                                        <RadioGroupItem value="option-one" id="option-one"/>
                                        <Label htmlFor="option-one"> Vendedor</Label>
                                    </div>
                                    <div>
                                    <RadioGroupItem value="option-two" id="option-two"/>
                                        <Label htmlFor="option-two"> Financeiro</Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="option-three" id="option-three"/>
                                        <Label htmlFor="option-three"> Administrador</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline"
                                        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ">Cadastrar
                                    cliente </Button>
                            </DialogTrigger>
                            <DialogContent className="w-auto">
                                <DialogHeader>
                                    <DialogTitle className="mt-3 text-center text-2xl">Confirmar
                                        alteração?</DialogTitle>
                                </DialogHeader>
                                <DialogFooter className="flex justify-center items-center">
                                    <div className="space-x-4">
                                        <Button
                                            className="w-32 border  border-green-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-green-500 hover:text-white"
                                            type="button">Confirmar </Button>
                                        <Button
                                            className="w-32 border  border-red-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-red-500 hover:text-white"
                                            type="button"> Cancelar</Button>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card></div>
        </div>

    );
}
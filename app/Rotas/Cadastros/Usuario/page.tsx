"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Image from "next/image";
import urlimagem from "@/public/icons/icon_perfil_preto.png"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
export default function CardWithForm() {
    return (

        <div >
            <div>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>Contrato</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Cliente</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Usuario</MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
            </div>
            <div className="flex justify-center items-center h-screen" >
                <Card className="w-[375px]Z\">
                    <CardHeader>
                        <CardTitle>Cliente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center items-center opacity-40">
                            <Image src={urlimagem} style={{ height: "25%", width: "25%" }} sizes="5vw" alt="imagem" />
                        </div>
                        <form>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name"></Label>
                                    <Input className="rounded-none opacity-40" id="name" placeholder="Nome" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="cnpj/cpf"></Label>
                                    <Input className="rounded-none opacity-40" id="cpf" placeholder="CNPJ/CPF" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="E-mail"></Label>
                                    <Input className="rounded-none opacity-40" id="email" placeholder="Email" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="Endereço"></Label>
                                    <Input className="rounded-none opacity-40" id="address" placeholder="Endereço" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                                </div>
                            </div>
                            <CardTitle>Cargo</CardTitle>


                            <div className=" flex flex-row">
                                <RadioGroup defaultValue="option-one ">
                                    <div className="">
                                        <RadioGroupItem value="option-one" id="option-one" />
                                        <Label htmlFor="option-one">Vendedor</Label>
                                    </div>
                                    <div className="">
                                        <RadioGroupItem value="option-two" id="option-two" />
                                        <Label htmlFor="option-two">Financeiro</Label>
                                    </div>
                                    <div className="">
                                        <RadioGroupItem value="option-three" id="option-three" />
                                        <Label htmlFor="option-three">Administrador</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ">Cadastrar cliente </Button>
                            </DialogTrigger>
                            <DialogContent className="w-auto">
                                <DialogHeader>
                                    <DialogTitle className="mt-3 text-center text-2xl">Confirmar alteração?</DialogTitle>
                                </DialogHeader>
                                <DialogFooter className="flex justify-center items-center">
                                    <div className="space-x-4">
                                        <Button className="bg-green-500" type="button">Confirmar </Button>
                                        <Button className="bg-red-500 " type="button"> Cancelar</Button>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card></div>
        </div>

    );
}
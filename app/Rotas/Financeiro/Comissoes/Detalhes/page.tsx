'use client'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Detalhescomissao() {
    return (
        <div className="flex justify-start items-center h-screen">
            <Card className="w-[350px] shadow-xl ">
                <CardHeader>
                    <CardTitle>Detalhes contrato</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="Insira">N° Contrato</Label>
                                <Input className="rounded-none opacity-40" id="address" placeholder="Insira" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cnpj/cpf">Data</Label>
                                <Input className="rounded-none opacity-40" id="cpf" placeholder="Data" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cnpj/cpf">Cliente</Label>
                                <Input className="rounded-none opacity-40" id="cpf" placeholder="Nome" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cnpj/cpf">Tipo</Label>
                                <Input className="rounded-none opacity-40" id="cpf" placeholder="Tipo" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cnpj/cpf">Parcelas</Label>
                                <Input className="rounded-none opacity-40" id="cpf" placeholder="Parcelas" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cnpj/cpf">Valor Total</Label>
                                <Input className="rounded-none opacity-40" id="cpf" placeholder="Valor" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card className="flex justify-center h-[700px] w-[500px] shadow-xl ">
                <CardHeader className="flex flex-col">
                    <CardTitle>Detalhes parcelas</CardTitle>
                </CardHeader>
                <ScrollArea className="h-[600px] w-[400px] rounded-md border p-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="grid-cols-3 grid-rows-3 space-x-9">
                                <TableHead className="text-lg text-black ">Dias</TableHead>
                                <TableHead className="text-lg text-center text-black">Parcelas</TableHead>
                                <TableHead className="text-lg pl-7 text-black">Comissão</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center">1x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">2x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center">3x</TableCell>
                                <TableCell className="text-center">$250.00</TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>
                </ScrollArea>

            </Card>
        </div>
    )
}


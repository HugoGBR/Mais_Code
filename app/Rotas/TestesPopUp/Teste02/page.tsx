'use client'
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"




export default function ConfiguracoesParcela() {
    return (
        <CardFooter className="flex justify-center items-center shadow-xl">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ">Cadastrar cliente</Button>
                </DialogTrigger>
                <DialogContent className="w-[475px] rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="mt-3 text-center text-2xl text-black">
                            Configuração de Parcelas
                        </DialogTitle>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Parcelas</TableHead>
                                    <TableHead className="text-center">Valor</TableHead>
                                </TableRow>
                            </TableHeader>
                     <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
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
                                    <TableCell className="text-center">4x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">5x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">6x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">7x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">8x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">9x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">10x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">11x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">12x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">13x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">12x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">12x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">12x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">12x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">12x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">12x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">12x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">12x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">12x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-center">12x</TableCell>
                                    <TableCell className="text-center">$250.00</TableCell>
                                </TableRow>

                            </TableBody>
                        </ScrollArea> 
                        </Table>


                </DialogHeader>
                <DialogFooter className="flex justify-center items-center">
                    <div>
                        <Button className="w-auto border border-green-500 text-black font-semibold bg-white transition duration-500 ease-in-out
                             hover:bg-green-500 hover:text-white" type="button">Confirmar</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </CardFooter >
    )
}
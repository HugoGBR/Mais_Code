import {
    CardFooter,
} from "@/components/ui/card";
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
import { GoGear } from "react-icons/go";




export default function ConfiguracoesParcela() {
    return (
        <CardFooter className="flex justify-center items-center ">
            <Dialog>
                <DialogTrigger asChild>

                    <GoGear className="w-8 h-8" />

                </DialogTrigger>
                <DialogContent className="pt-10 rounded-lg">
                    <div className="text-center">
                        <h1 className="text-2xl">
                            Configuração de Parcelas
                        </h1>
                    </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="grid-cols-2 grid">
                                    <TableHead className="text-lg text-center text-black ">Parcelas</TableHead>
                                    <TableHead className="text-lg text-center text-black">Valor</TableHead>
                                </TableRow>
                            </TableHeader>
                            <ScrollArea className="h-[500px] rounded-md border p-4">
                                <TableBody>
                                    <TableRow className="grid-cols-2 grid">
                                        <TableCell className="text-center col-span-1">1x</TableCell>
                                        <TableCell className="text-center col-span-1">$250.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </ScrollArea>

                        </Table>
                    <DialogFooter>
                        <button className="hover:bg-green-500 hover:text-white text-black font-bold py-2 px-4 rounded border-2 border-green-500">
                            Confirmar
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter >
    )
}
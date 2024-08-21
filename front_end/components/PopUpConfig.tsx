import {
    CardFooter,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { FormEvent, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoGear } from "react-icons/go";

interface PopUpConfigProps {
    valorTotal: number;
    parcelas: number;
}

export default function ConfiguracoesParcela({ valorTotal: initialValorTotal, parcelas: initialParcelas }: PopUpConfigProps): React.JSX.Element {
    const [valorTotal, setValorTotal] = useState<number>(initialValorTotal);
    const [parcelas, setParcelas] = useState<number>(initialParcelas);
    const [parcelasValores, setParcelasValores] = useState<number[]>(Array(initialParcelas).fill(0));

    const handleParcelaChange = (index: number, value: number) => {
        const newParcelasValores = [...parcelasValores];
        newParcelasValores[index] = value;
        setParcelasValores(newParcelasValores);
    };

    const handleAddParcela = () => {
        setParcelas(parcelas + 1);
        setParcelasValores([...parcelasValores, 0]);
    };

    const handleRemoveParcela = (index: number) => {
        const newParcelasValores = parcelasValores.filter((_, i) => i !== index);
        setParcelasValores(newParcelasValores);
        setParcelas(parcelas - 1);
    };

    const calcularValorRestante = () => valorTotal - parcelasValores.reduce((acc, val) => acc + val, 0);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        await createNewSell(parcelasValores, 2);
    }

    return (
        <CardFooter className="flex justify-center items-center">
            <Dialog>
                <DialogTrigger asChild>
                    <GoGear className="w-8 h-8" />
                </DialogTrigger>
                <DialogContent className="pt-10 rounded-lg">
                    <div className="text-center">
                        <h1 className="text-2xl">Configuração de Parcelas</h1>
                    </div>
                    <ScrollArea className="h-[500px] rounded-md border p-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-lg text-center text-black">Parcela</TableHead>
                                    <TableHead className="text-lg text-center text-black">Valor</TableHead>
                                    <TableHead className="text-lg text-center text-black">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {parcelasValores.map((valor, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="text-center">Parcela {i + 1}</TableCell>
                                        <TableCell className="text-center">
                                            <input
                                                className="border-b-2 text-center w-28 flex focus:outline-none focus:border-blue-500"
                                                type="text"
                                                value={`R$ ${valor}`}
                                                onChange={(event) => handleParcelaChange(i, parseFloat(event.target.value.replace('R$', '').replace(',', '.')))}
                                                placeholder="R$ 0.00"
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <button
                                                className="text-red-500"
                                                onClick={() => handleRemoveParcela(i)}
                                            >
                                                X
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={2} className="text-right font-bold">Valor Restante:</TableCell>
                                    <TableCell className="text-center">R$ {calcularValorRestante()}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </ScrollArea>
                    <DialogFooter>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleAddParcela}
                            className="hover:bg-blue-500 hover:text-white text-black font-bold py-2 px-4 rounded border-2 border-blue-500"
                        >
                            Adicionar Parcela
                        </button>
                    
                    
                        <button
                            onClick={handleSubmit}
                            className="hover:bg-green-500 hover:text-white text-black font-bold py-2 px-4 rounded border-2 border-green-500"
                        >
                            Confirmar
                        </button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    );
}

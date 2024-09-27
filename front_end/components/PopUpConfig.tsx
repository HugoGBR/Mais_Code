'use client'

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import {
    CardFooter,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
    DialogClose, // Use DialogClose para fechar o modal
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoGear } from "react-icons/go";

interface PopUpConfigProps {
    valorTotal: number;
    parcelas: number;
    onSetValoresParcelas: (valores: number[]) => void; // Callback para enviar os valores ao componente pai
    onConfirm: (vendaId: number, numeroParcelas: number, valoresParcelas: number[]) => void; // Função para executar a confirmação
    idVenda: number; // Receba o idVenda do CardCadastro
}

export default function ConfiguracoesParcela({ valorTotal, parcelas, onSetValoresParcelas, onConfirm, idVenda }: PopUpConfigProps): React.JSX.Element {
    const [valoresParcelas, setValoresParcelas] = useState<number[]>([]);

    useEffect(() => {
        const valorParcela = parcelas > 0 ? valorTotal / parcelas : 0;
        setValoresParcelas(Array.from({ length: parcelas }, () => valorParcela));
    }, [valorTotal, parcelas]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const novoValor = e.target.value.replace('R$ ', '').replace(',', '.');
        const valorNumerico = parseFloat(novoValor);

        if (!isNaN(valorNumerico)) {
            const novosValores = [...valoresParcelas];
            novosValores[index] = valorNumerico;

            const somaAteAtual = novosValores.slice(0, index + 1).reduce((acc, cur) => acc + cur, 0);

            const restante = valorTotal - somaAteAtual;

            const restantes = parcelas - (index + 1);
            if (restantes > 0) {
                const valorRestantePorParcela = restante / restantes;
                for (let i = index + 1; i < parcelas; i++) {
                    novosValores[i] = valorRestantePorParcela;
                }
            }

            setValoresParcelas(novosValores);
        }
    };

    const handleConfirm = () => {
        onSetValoresParcelas(valoresParcelas);
        onConfirm(idVenda, parcelas, valoresParcelas);
    };

    return (
        <CardFooter className="flex justify-center items-center">
            <Dialog>
                <DialogTrigger asChild>
                    <FontAwesomeIcon icon={faSlidersH} className="w-8 h-8" />
                </DialogTrigger>
                <DialogContent className="pt-10 rounded-lg">
                    <div className="text-center">
                        <h1 className="text-2xl">Configuração de Parcelas</h1>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow className="grid-cols-2 grid">
                                <TableHead className="text-lg text-center text-black">Parcelas</TableHead>
                                <TableHead className="text-lg text-center text-black">Valor</TableHead>
                            </TableRow>
                        </TableHeader>
                        <ScrollArea className="h-[500px] rounded-md border p-4">
                            <TableBody>
                                {Array.from({ length: parcelas }, (_, i) => (
                                    <TableRow key={i} className="grid-cols-2 grid">
                                        <TableCell className="text-center col-span-1">{`${i + 1}x`}</TableCell>
                                        <TableCell>
                                            <input
                                                className="focus:outline-none focus:border-blue-500"
                                                placeholder="0000,00"
                                                type="text"
                                                value={`R$ ${valoresParcelas[i]}`}
                                                onChange={(e) => handleChange(i, e)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </ScrollArea>
                    </Table>
                    <DialogFooter>
                        <DialogClose asChild>
                            <button
                                className="hover:bg-green-500 hover:text-white text-black font-bold py-2 px-4 rounded border-2 border-green-500"
                                onClick={handleConfirm} // Chama handleConfirm ao confirmar
                            >
                                Confirmar
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    );
}

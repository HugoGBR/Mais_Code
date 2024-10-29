'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from './ui/select';

interface PopUpConfigProps {
    valorTotal: number;
    parcelas: number;
    onSetValoresParcelas: (valores: number[], status: string[]) => void;
    onConfirm: (vendaId: number, numeroParcelas: number, valoresParcelas: number[], statusParcelas: string[]) => Promise<void>; // Adicionado status
    idVenda: number;
    listaParcelas: any[];
}

export default function EditConfiguracoesParcela({ valorTotal, parcelas, onSetValoresParcelas, onConfirm, idVenda, listaParcelas }: PopUpConfigProps): React.JSX.Element {
    const [valoresParcelas, setValoresParcelas] = useState<number[]>([]);
    const [statusParcelas, setStatusParcelas] = useState<string[]>([]);
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);

    useEffect(() => {
        if (listaParcelas) {
            setValoresParcelas(listaParcelas.map((parcela: any) => parseFloat(parcela.valor_da_parcela)));
            setStatusParcelas(listaParcelas.map((parcela: any) => parcela.status));
        }
    }, [listaParcelas]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const novoValor = e.target.value.replace('R$ ', '').replace(',', '.');
        const valorNumerico = parseFloat(novoValor);

        if (!isNaN(valorNumerico) && valorNumerico > 0) {
            if (valorNumerico >= valorTotal) {
                setMensagemErro('Impossível definir parcela com valor igual ou maior que o valor total.');
            } else {
                setMensagemErro(null);
                const novosValores = [...valoresParcelas];
                novosValores[index] = valorNumerico;

                setValoresParcelas(novosValores);
            }
        }
    };

    const handleStatusChange = (index: number, status: string) => {
        const novosStatus = [...statusParcelas];
        novosStatus[index] = status;
        setStatusParcelas(novosStatus);
    };

    const handleConfirm = () => {
        if (!mensagemErro) {
            onSetValoresParcelas(valoresParcelas, statusParcelas);
            onConfirm(idVenda, parcelas, valoresParcelas, statusParcelas); // Chamando a função onConfirm
        }
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
                    {mensagemErro && (
                        <p className="text-red-500 text-center font-bold mb-4">{mensagemErro}</p>
                    )}
                    <Table>
                        <TableHeader>
                            <TableRow className="grid-cols-3 grid">
                                <TableHead className="text-lg text-center text-black">Parcelas</TableHead>
                                <TableHead className="text-lg text-center text-black">Valor</TableHead>
                                <TableHead className="text-lg text-center text-black">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <ScrollArea className="h-[500px] rounded-md border p-4">
                            <TableBody>
                                {listaParcelas.map((parcela, i) => (
                                    <TableRow key={i} className="grid-cols-3 grid">
                                        <TableCell className="text-center col-span-1">{`${i + 1}x`}</TableCell>
                                        <TableCell>
                                            <input
                                                className="focus:outline-none focus:border-blue-500"
                                                placeholder="0000,00"
                                                type="text"
                                                value={`R$ ${valoresParcelas[i]?.toFixed(2) || '0.00'}`}
                                                onChange={(e) => handleChange(i, e)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Select onValueChange={(value) => handleStatusChange(i, value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={statusParcelas[i]} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="pago">Pago</SelectItem>
                                                        <SelectItem value="a pagar">A pagar</SelectItem>
                                                        <SelectItem value="cancelado">Cancelado</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </ScrollArea>
                    </Table>
                    <DialogFooter>
                        <DialogClose asChild>
                            <button
                                className={`hover:bg-green-500 hover:text-white text-black font-bold py-2 px-4 rounded border-2 border-green-500 ${mensagemErro ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleConfirm}
                                disabled={!!mensagemErro}
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

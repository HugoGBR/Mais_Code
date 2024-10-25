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
    DialogClose,
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
import { SelectContent, SelectGroup, SelectItem } from './ui/select';
import { getParcelaByidv, updateParcelaByIDv } from "@/lib/VendaController";

interface PopUpConfigProps {
    valorTotal: number;
    parcelas: number;
    onSetValoresParcelas: (valores: number[]) => void;
    onConfirm: (vendaId: number, numeroParcelas: number, valoresParcelas: number[]) => void;
    idVenda: number;
}

export default function EditConfiguracoesParcela({ valorTotal, parcelas, onSetValoresParcelas, onConfirm, idVenda }: PopUpConfigProps): React.JSX.Element {
    const [valoresParcelas, setValoresParcelas] = useState<number[]>([]);
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);
    const [listaParcelas, setListaParcelas] = useState<any[]>([]); // Armazena as parcelas recuperadas do banco

    useEffect(() => {
        // Carrega as parcelas do banco quando o componente é montado
        const carregarParcelas = async () => {
            const dadosParcelas = await getParcelaByidv(idVenda);
            if (dadosParcelas) {
                setListaParcelas(dadosParcelas);
                setValoresParcelas(dadosParcelas.map((parcela: any) => parseFloat(parcela.valor_da_parcela)));
            }
        };

        carregarParcelas();
    }, [idVenda]);

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

    const handleStatusChange = (index: number, status: number) => {
        const novaListaParcelas = [...listaParcelas];
        novaListaParcelas[index].status = status;
        setListaParcelas(novaListaParcelas);
    };

    const handleConfirm = async () => {
        if (!mensagemErro) {
            onSetValoresParcelas(valoresParcelas);

            // Atualiza cada parcela no banco de dados
            for (let i = 0; i < listaParcelas.length; i++) {
                const parcela = listaParcelas[i];
                await updateParcelaByIDv(valoresParcelas[i], parcela.status, parcela.id);
            }

            onConfirm(idVenda, parcelas, valoresParcelas);
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
                                            <SelectContent id={`status-parcela-${i}`}>
                                                <SelectGroup>
                                                    <SelectItem value="1" onClick={() => handleStatusChange(i, 1)}>Pago</SelectItem>
                                                    <SelectItem value="2" onClick={() => handleStatusChange(i, 2)}>A pagar</SelectItem>
                                                    <SelectItem value="3" onClick={() => handleStatusChange(i, 3)}>Cancelado</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
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
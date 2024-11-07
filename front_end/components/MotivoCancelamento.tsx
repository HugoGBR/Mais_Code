'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MotivoCancelamentoProps {
    descricaoProduto: string;
    idVenda: number;
    onDescricaoChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function MotivoCancelamento({ descricaoProduto, onDescricaoChange }: MotivoCancelamentoProps): React.JSX.Element {

    return (
        <Card className="flex justify-center items-center bg-none">
            <Dialog>
                <DialogTrigger asChild>
                    <FontAwesomeIcon icon={faExclamationCircle} className="w-5 h-5 cursor-pointer text-red-500" />
                </DialogTrigger>
                <DialogContent className="w-1/3 rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="mt-2 text-center text-4xl text-red-500 mb-2">
                            Cancelamento Venda
                        </DialogTitle>
                    </DialogHeader>
                    <div>
                        <textarea
                            id="descricaoProduto"
                            name="descricaoProduto"
                            value={descricaoProduto}
                            onChange={onDescricaoChange}
                            disabled
                            className="shadow-inner-2 p-2 block w-full h-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>

                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
}

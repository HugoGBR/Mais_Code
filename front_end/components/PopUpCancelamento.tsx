import { CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import { useState } from "react";


export default function PopUpCancelamento() {
    const [descricaoProduto, setDescricaoProduto] = useState<string>('');
    const descricaoLimiteCaracteres = 255;
    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const descricao = event.target.value;
        if (descricao.length <= descricaoLimiteCaracteres) {
            setDescricaoProduto(descricao);
        }
    };

    return (
        <CardFooter className="flex justify-center items-center shadow-xl">
            <Dialog>
                <DialogTrigger asChild>
                    <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ">Confirmar</button>
                </DialogTrigger>
                <DialogContent className="w-1/3 rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="mt-2 text-center text-4xl text-red-500 mb-2">
                            Cancelamento Venda
                        </DialogTitle>
                        <DialogDescription className="flex justify-center items-center">
                            Explique o motivo do cancelamento
                            da venda no campo a baixo
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <textarea
                            id="descricaoProduto"
                            name="descricaoProduto"
                            value={descricaoProduto}
                            onChange={handleDescricaoChange}
                            placeholder="Descreva o motivo do cancelamento"
                            rows={4}
                            maxLength={descricaoLimiteCaracteres}
                            className="shadow-inner-2 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500">{descricaoProduto.length}/{descricaoLimiteCaracteres}</p>
                        </div>
                    </div>
                    <DialogFooter className="flex justify-center items-center">
                        <div>
                            <button className="w-auto border border-green-500 text-black font-semibold bg-white transition duration-500 ease-in-out
                             hover:bg-green-500 hover:text-white" type="button">Confirmar</button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    )
}

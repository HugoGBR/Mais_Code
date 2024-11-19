import { CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { CancelamentodaVenda } from "@/lib/VendaController";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function PopUpCancelamento({ id }: { id: number }) {
    const [descricaoProduto, setDescricaoProduto] = useState<string>('');
    const descricaoLimiteCaracteres = 255;
    const route = useRouter();
    const { toast } = useToast();

    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const descricao = event.target.value;
        if (descricao.length <= descricaoLimiteCaracteres) {
            setDescricaoProduto(descricao);
        }
    };

    async function handleCancel() {
        console.log("ID:", id, "Justificativa:", descricaoProduto);
        try {
            const response = await CancelamentodaVenda(id, descricaoProduto);
            console.log("Response:", response);
            if (response.status === 1) {
                toast({
                    title: "Sucesso",
                    description: "Venda inativada!",
                    className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
                });
                setTimeout(() => {
                    route.push('/routes/relatorio');
                }, 2000);
            } else {
                toast({
                    title: "Erro",
                    description: response.message || "Erro ao inativar a venda!",
                    className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
                });
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro ao inativar a venda!",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
            console.error("Erro ao cancelar a venda:", error);
        }
    }

    return (
        <CardFooter className="p-0 flex justify-center items-center w-full h-full">
            <Dialog>
                <DialogTrigger asChild >
                    <button className="w-full h-full col-span-1 p-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none">Inativar Venda</button>
                </DialogTrigger>
                <DialogContent className="w-1/3 rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="mt-2 text-center text-4xl text-red-500 mb-2">
                            Cancelamento Venda
                        </DialogTitle>
                        <DialogDescription className="flex justify-center items-center">
                            Explique o motivo do cancelamento
                            da venda no campo abaixo
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
                    <DialogFooter className="flex justify-center items-center sm:justify-center">
                        <div>
                            <button className="w-52 h-auto col-span-1 p-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none" type="button" onClick={handleCancel}>Confirmar</button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    );
}

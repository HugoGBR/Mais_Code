import { CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function PopupConfirmacao() {
    
    return (
        <CardFooter className="flex justify-center items-center">
            <Dialog>
                <DialogTrigger asChild>
                    <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ">Cadastrar</button>
                </DialogTrigger>
                <DialogContent className="w-auto rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="mt-3 mb-4 text-center text-2xl">Confirmar alteração?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="flex justify-center items-center">
                        <div className="space-x-2">
                            <button className="w-32 border  border-green-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-green-500 hover:text-white rounded-sm" type="button">Confirmar </button>
                            <button className="w-32 border border-red-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-red-500 hover:text-white rounded-sm" type="button"> Cancelar</button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    )
}


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
} from "@/components/ui/dialog"


export default function PopupConfirmacao() {
    return (
        <CardFooter className="flex justify-center items-center shadow-2xl">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded  transition duration-500 ease-in-out hover:text-white">Cadastrar cliente </Button>
                </DialogTrigger>
                <DialogContent className="w-auto">
                    <DialogHeader>
                        <DialogTitle className="mt-3 text-center text-xl">Confirmar alteração?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="flex justify-center items-center">
                        <div className="space-x-3">
                            <Button className="w-32 border  border-green-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-green-500 hover:text-white" type="button">Confirmar </Button>
                            <Button className="w-32 border border-red-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-red-500 hover:text-white" type="button"> Cancelar</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    )
}
'use client'
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
    DialogDescription,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"


export default function PopUpCancelamento() {
    return (
        <CardFooter className="flex justify-center items-center shadow-xl">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ">Cadastrar cliente</Button>
                </DialogTrigger>
                <DialogContent className="w-[475px] rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="mt-3 text-center text-4xl text-red-500 mb-4">
                            Cancelamento Venda
                        </DialogTitle>
                        <DialogDescription className="flex justify-center items-center">
                            Explique o motivo do cancelamento 
                            da venda no campo a baixo
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mb-4">
                        <Textarea placeholder="Type your message here." />
                    </div>
                    <DialogFooter className="flex justify-center items-center">
                        <div>
                            <Button className="w-auto border border-green-500 text-black font-semibold bg-white transition duration-500 ease-in-out
                             hover:bg-green-500 hover:text-white" type="button">Confirmar</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    )
}

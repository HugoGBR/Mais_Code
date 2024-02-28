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
} from "@/components/ui/dialog"


export default function PopupConfirmacao() {
    return (
        <CardFooter className="flex justify-center items-center">
            <Dialog>
                <DialogContent className="w-auto rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="mt-3 mb-4 text-center text-2xl">Confirmar alteração?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="flex justify-center items-center">
                        <div className="space-x-7">
                            <Button className="w-32 border  border-green-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-green-500 hover:text-white" type="button">Confirmar </Button>
                            <Button className="w-32 border border-red-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-red-500 hover:text-white" type="button"> Cancelar</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    )
}


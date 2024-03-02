'use client'
import { Grid } from "lucide-react"



import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Detalhescomissao() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px] shadow-xl ">
                <CardHeader>
                    <CardTitle>Detalhes contrato</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="Insira">N° Contrato</Label>
                                <Input className="rounded-none opacity-40" id="address" placeholder="Insira" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cnpj/cpf">Data</Label>
                                <Input className="rounded-none opacity-40" id="cpf" placeholder="Data" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cnpj/cpf">Cliente</Label>
                                <Input className="rounded-none opacity-40" id="cpf" placeholder="Nome" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cnpj/cpf">Tipo</Label>
                                <Input className="rounded-none opacity-40" id="cpf" placeholder="Tipo" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cnpj/cpf">Parcelas</Label>
                                <Input className="rounded-none opacity-40" id="cpf" placeholder="Parcelas" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cnpj/cpf">Valor Total</Label>
                                <Input className="rounded-none opacity-40" id="cpf" placeholder="Valor" style={{ border: 'none', borderBottom: '1px solid #000' }} />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}


'use cliente'
import {Card} from "@/components/ui/card"
import React from "react"
import {

    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function Contrato() {
    //Faça suas const aqui(constantes)

    return (
        <div className="flex items-center justify-center h-screen ">

            <Card>
                <CardHeader>
                    <CardTitle>Contrato: Nº 00005</CardTitle>
                    <CardDescription>Dados do Contrato</CardDescription>
                </CardHeader>
                <div className="grid grid-cols-2 gap-5 ">
                    <div>
                        <input placeholder="Nome" type="text"/>
                    </div>
                    <div>
                        <input placeholder="Sobrenome" type="text"/>
                    </div>
                    <div>
                        <input placeholder="Data de inicio" type="text"/>
                    </div>
                    <div>
                        <input placeholder="Data de termino" type="text"/>
                    </div>

                </div>


                <h2>Modelo de Contrato:</h2>
                <div className="gap-5">
                    <div>
                        <Select>
                            <SelectTrigger className="w-[180px] gap-3">
                                <SelectValue placeholder="Continuidade"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="teste">Pontual</SelectItem>
                                <SelectItem value="testee">Contínuo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Hora Dev"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hrdev1">PHP</SelectItem>
                                <SelectItem value="hrdev2">Python</SelectItem>
                                <SelectItem value="hrdev3">React</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>
        </div>

    )
}
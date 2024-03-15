'use cliente'
import {Card} from "@/components/ui/card";
import React from "react";

import {GoGear} from "react-icons/go";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CardCadastro from "@/components/CardCadastro";


export default function Contrato() {
    //Faça suas const aqui(constantes)

    return (
        <div className="flex space-x-4">
            <div>
                <CardCadastro/>
            </div>
        </div>

    )
}
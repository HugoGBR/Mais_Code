'use cliente'
import { Card } from "@/components/ui/card"
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
    
    return(
        <div className="flex items-center justify-center h-screen ">

    <Card className="w-1/3">
  <CardHeader>
    <CardTitle>Contrato: Nº 00005</CardTitle>
    <CardDescription>Dados do Contrato</CardDescription>
  </CardHeader>
  <div className="grid grid-cols-2 gap-5 ">
    <div>
        <input placeholder="Nome" type="text" />
    </div>
    <div>
        <input placeholder="Sobrenome" type="text" />
    </div>
    <div>
        <input  placeholder="Data de inicio" type="text" />
    </div>
    <div>
        <input placeholder="Data de termino" type="text" />
    </div>

  </div>


<div className="grid grid-cols-2 gap-5 mt-5 ">
<label className="" htmlFor="DadosContrato">Dados do Contrato</label>
    <div>
<Select>
<SelectTrigger className="w-[180px] gap-3">
    <SelectValue placeholder="Continuidade" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="teste">Pontual</SelectItem>
    <SelectItem value="testee">Contínuo</SelectItem>
  </SelectContent>
</Select>
    </div>
<div className="grid grid-cols-2 gap-5 ">
<Select>
<SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Hora Dev" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="hrdev1">PHP</SelectItem>
    <SelectItem value="hrdev2">Python</SelectItem>
    <SelectItem value="hrdev3">React</SelectItem>
  </SelectContent>
</Select>
<div>
  <label htmlFor="teste">Horas Trabalhadas</label> <br />
  <input placeholder="0000" type="text" />
</div>
<div>
  <h2>Dados do Contato</h2>

  <input placeholder="Nome:" type="text" /> 
  <input placeholder="Contato" type="text" />
  <input placeholder="Email:" type="text" />
</div>
</div>

</div>


</Card>
        </div>
        
    )
}
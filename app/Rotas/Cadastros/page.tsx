'use cliente'
import { Card } from "@/components/ui/card"
import React from "react"
import { useState } from "react"
import {
    
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"



export default function Contrato() {
    //Faça suas const aqui(constantes)
    return(
        <div className="flex items-center justify-center h-screen ">

    <Card >
  <CardHeader>
    <CardTitle>Contrato</CardTitle>
    <CardDescription>Dados do Contrato</CardDescription>
  </CardHeader>
  <input placeholder="Nome" type="text" />
  <input placeholder="Sobrenome" type="text" />

<input placeholder="Data de inicio" type="date" />
<input placeholder="Data de termino" type="date" />

<h2>Modelo de Contrato</h2>

</Card>
        </div>
        
    )
}
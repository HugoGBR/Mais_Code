'use cliente'
import { useState } from "react"
import { Card } from "@/components/ui/card"
import React from "react"
import { Checkbox } from "@/components/ui/checkbox"

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
    <div className="grid w-2/3 grid-cols-2">
      <div className="">
        <Card className="w-auto p-10">
          <form>
            <div className="flex justify-between mb-6 text-2xl font-bold">
              <h1>Contrato</h1>
              <h1>Nº 00005</h1>
            </div>

            <h1 className="mb-4">Dados do Contrato</h1>
            <div className="grid grid-cols-2 gap-5 mb-4">
              <input className="border-b-2" placeholder="Nome" type="text" />
              <input className="border-b-2" placeholder="Sobrenome" type="text" />
              <input className="border-b-2" placeholder="Data de inicio" type="text" />
              <input className="border-b-2" placeholder="Data de termino" type="text" />
            </div>
            <label className="" htmlFor="DadosContrato">Modelo do Contrato</label>
            <div className="grid grid-cols-2 grid-rows-2 mt-5">
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Continuidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teste">Pontual</SelectItem>
                  <SelectItem value="testee">Contínuo</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex flex-col ml-5">
                <label htmlFor="teste">Horas Trabalhadas</label>
                <input className="w-10 border-b-2" placeholder="0000" type="text" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Hora Dev" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teste">Python</SelectItem>
                  <SelectItem value="testee">php</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <h2>Dados do Contato</h2>
            <div className="grid grid-cols-2">

              <input className="border-b-2" placeholder="Nome:" type="text" />
              <input className="border-b-2" placeholder="Contato" type="text" />
              <input className="border-b-2" placeholder="Email:" type="text" />
            </div>

          </form>
        </Card>
      </div>








      <div className="w-auto">

        <Card className="w-auto p-10">
          <form>
            <div className="flex justify-between mb-6 text-2xl font-bold">
              <h1>Forma de Pagamento</h1>

            </div>
            <div className="flex flex-col mb-4 ml-5">
              <label htmlFor="teste">Valor da Entrada</label>
              <input className="border-b-2 " placeholder="R$ 0000,00" type="text" />
            </div>
            
            <div className="">
              <label htmlFor="Nn">Status Cliente</label>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 mt-5">
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Novo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teste">Novo</SelectItem>
                  <SelectItem value="testee">Antigo</SelectItem>
                </SelectContent>
              </Select>



            </div>
            <h2>Dados do Contato</h2>
            <div className="grid grid-cols-2">

              <input className="border-b-2" placeholder="Nome:" type="text" />
              <input className="border-b-2" placeholder="Contato" type="text" />
              <input className="border-b-2" placeholder="Email:" type="text" />
            </div>

          </form>
        </Card>

      </div>
    </div>

  )
}
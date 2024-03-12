"use client"

import * as React from "react"
import { Payment, columns } from "./Table/columns"
import { DataTable } from "./Table/data-table"




async function getData(): Promise<Payment[]> {
 
  return [
    {
      id: "m5gr84i9",
      quantia: 316,
      status: "Ativo",
      email: "ken99@yahoo.com",
      N_de_contrato: 1158976,
      Novo_Antigo: "Novo",
      Vendedor:"Gustavo",
      Cliente:"Jubiscleu"

    },
    {
      id: "3u1reuv4",
      quantia: 242,
      status: "Concluido",
      email: "Abe45@gmail.com",
      N_de_contrato: 1158976,
      Novo_Antigo: "Novo",
      Vendedor:"Gustavo",
      Cliente:"Jubiscleu"
    },
    {
      id: "derv1ws0",
      quantia: 837,
      status: "Ativo",
      email: "Monserrat44@gmail.com",
      N_de_contrato: 1158976,
      Novo_Antigo: "Antigo",
      Vendedor:"Gustavo",
      Cliente:"Jubiscleu"
    },
    {
      id: "5kma53ae",
      quantia: 874,
      status: "Concluido",
      email: "Silas22@gmail.com",
      N_de_contrato: 1158976,
      Novo_Antigo: "Antigo",
      Vendedor:"Gustavo",
      Cliente:"Jubiscleu"
    },
    {
      id: "bhqecj4p",
      quantia: 721,
      status: "Inativo",
      email: "10/25/1998",
      N_de_contrato: 1158976,
      Novo_Antigo: "Antigo",
      Vendedor:"Gustavo",
      Cliente:"Jubiscleu"
    },
    {
      id: "m5gr84i9",
      quantia: 316,
      status: "Ativo",
      email: "ken99@yahoo.com",
      N_de_contrato: 1158976,
      Novo_Antigo: "Antigo",
      Vendedor:"Gustavo",
      Cliente:"Jubiscleu"

    },
    {
      id: "3u1reuv4",
      quantia: 242,
      status: "Concluido",
      email: "Abe45@gmail.com",
      N_de_contrato: 1158976,
      Novo_Antigo: "Antigo",
      Vendedor:"Gustavo",
      Cliente:"Jubiscleu",
    },
    {
      id: "derv1ws0",
      quantia: 837,
      status: "Ativo",
      email: "Monserrat44@gmail.com",
      N_de_contrato: 1158976,
      Novo_Antigo: "Antigo",
      Vendedor:"Gustavo",
      Cliente:"Jubiscleu"
    },
    {
      id: "5kma53ae",
      quantia: 874,
      status: "Concluido",
      email: "Silas22@gmail.com",
      N_de_contrato: 1158976,
      Novo_Antigo: "Antigo",
      Vendedor:"Gustavo",
      Cliente:"Jubiscleu"
    },
    {
      id: "bhqecj4p",
      quantia: 721,
      status: "Inativo",
      email: "10/25/1998",
      N_de_contrato: 1158976,
      Novo_Antigo: "Antigo",
      Vendedor:"Gustavo",
      Cliente:"Jubiscleu"
    },
    {
      id: "bhqecj4p",
      quantia: 721,
      status: "Inativo",
      email: "10/25/1998",
      N_de_contrato: 1158976,
      Novo_Antigo: "Antigo",
      Vendedor:"Gustavo",
      Cliente:"Jubiscleu"
    },
    

  ]
}
export default async function Relatorio() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>

  )
}
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";

export default function Financeiro() {

  const Lista = [{

    nome: "Maria",
    telefone: "6799999999",
    tipo_Pessoa: "Pessoa Fisica",
    tipo_Cadastro: 1
  },

  {
    nome: "Gustavo",
    telefone: "67888888888",
    tipo_Pessoa: "Pessoa Juridica",
    tipo_Cadastro: 2
  },

  {
    nome: "Calebe",
    telefone: "67777777777",
    tipo_Pessoa: "Pessoa Fisica",
    tipo_Cadastro: 3
  },

  {
    nome: "Rosa",
    telefone: "674444444444",
    tipo_Pessoa: "Pessoa Juridica",
    tipo_Cadastro: 2
  },

  {
    nome: "Emilly",
    telefone: "67555555555",
    tipo_Pessoa: "Pessoa Fisica",
    tipo_Cadastro: 1
  },

  {
    nome: "Julia",
    telefone: "67333333333333",
    tipo_Pessoa: "Pessoa Juridica",
    tipo_Cadastro: 2
  },

  {
    nome: "Cris",
    telefone: "67111111111111",
    tipo_Pessoa: "Pessoa Fisica",
    tipo_Cadastro: 3
  },

  {
    nome: "Rafa",
    telefone: "679999999",
    tipo_Pessoa: "Pessoa Juridica",
    tipo_Cadastro: 3
  }
  ];



  return (
    <div className="grid grid-cols-2 gap-5">
      {Lista.map((item) => (
        <button className=''>
          <Card className="w-[250px]">
            <CardContent>
              <div className="flex items-center">
                <img src="/icons/icon_perfil_preto.png" alt="Perfil" className="w-12 h-12 rounded-2xl" />
                {/* onClick */}
                <div className="ml-4">
                  <Label htmlFor="nome">{item.nome}</Label>
                  <Label htmlFor="e-mail" className="block">{item.telefone}</Label>
                  <Label htmlFor="tipo de cadastro" className="text-sky-800 text-xs">{item.tipo_Pessoa}</Label>
                </div>

              </div>
            </CardContent>
          </Card>
        </button>

      ))}
    </div>

  )
}
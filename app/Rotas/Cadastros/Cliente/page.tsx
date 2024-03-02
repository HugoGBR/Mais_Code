"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import urlimagem from "@/public/icon-empresa.png"
import { useRouter } from "next/navigation";
 
export default function CardWithForm() {
  const route = useRouter()
  const RotaContrato = () => {
    route.push('/Rotas/Cadastros');
  }
  return (
   
    <div >
        <div className="flex justify-center items-center h-screen" ><Card className="w-[375px]Z\">
        <Menubar>
      <MenubarMenu>
        <MenubarTrigger onClick={RotaContrato}>Contrato</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Cliente</MenubarTrigger>
      </MenubarMenu>
      </Menubar>
      <CardHeader>
        <CardTitle>Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center opacity-40">
        <Image src={urlimagem} style={{height: "25%", width: "25%"}} sizes="5vw" alt="imagem"/>
        </div>
       
         
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name"></Label>
              <Input className="rounded-none opacity-40" id="name" placeholder="Nome" style={{ border: 'none', borderBottom: '1px solid #000' }} />
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="cnpj/cpf"></Label>
            <Input className="rounded-none opacity-40" id="cpf" placeholder="CNPJ/CPF" style={{ border: 'none', borderBottom: '1px solid #000' }} />
            </div>
            <div className="flex flex-col space-y-1.5">              
                <Label htmlFor="E-mail"></Label>
                <Input className="rounded-none opacity-40" id="email" placeholder="Email" style={{ border: 'none', borderBottom: '1px solid #000' }} />
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="Endereço"></Label>
            <Input className="rounded-none opacity-40" id="address" placeholder="Endereço" style={{ border: 'none', borderBottom: '1px solid #000' }} />
            </div>
          </div>
        </form>
      </CardContent>
        <CardFooter className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"className=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded ">Cadastrar cliente </Button>
            </DialogTrigger>
            <DialogContent className="w-auto">
              <DialogHeader>
                <DialogTitle className="mt-3 text-center text-2xl">Confirmar alteração?</DialogTitle>
              </DialogHeader>
              <DialogFooter className="flex justify-center items-center">
                <div className="space-x-4">
                  <Button className="bg-green-500" type="button">Confirmar </Button>
                  <Button className="bg-red-500 " type="button"> Cancelar</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
    </Card></div>
    </div>

  );}
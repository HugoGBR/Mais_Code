"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginWallpaper from "@/public/tecnologia (1).png"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CardWithForm() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[375px]">
        <CardHeader>
          <CardTitle>Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center ">
            <Image
              className="opacity-40"
              src={loginWallpaper}
              alt="Imagem"
              sizes="10vw"
              style={
                {
                  width: "25%",
                  height: "25%"
                }
              }
            />
          </div>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name"></Label>
                <Input className='rounded-none opacity-40' id="name" placeholder="Nome" style={{ border: 'none', borderBottom: '1px solid #000' }} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cpf"></Label>
                <Input className='rounded-none opacity-40' id="cpf" placeholder="CNPJ/CPF" style={{ border: 'none', borderBottom: '1px solid #000' }} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email"></Label>
                <Input className='rounded-none opacity-40' id="email" placeholder="Email" style={{ border: 'none', borderBottom: '1px solid #000' }} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address"></Label>
                <Input className='rounded-none opacity-40' id="address" placeholder="Endereço" style={{ border: 'none', borderBottom: '1px solid #000' }} />
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
                <div className="space-x-4 ">
                  <Button className="bg-green-500" type="button">Confirmar </Button>
                  <Button className="bg-red-500 " type="button"> Cancelar</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}


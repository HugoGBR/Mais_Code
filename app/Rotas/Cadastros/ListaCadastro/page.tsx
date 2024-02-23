"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import loginWallpaper from "@/public/tecnologia (1).png"
import Image from "next/image"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export default function CardWithForm() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Card className="w-[350px]">
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
          <Button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Cadastrar cliente</Button>
        </CardFooter>
      </Card>

    </div>

  );
}


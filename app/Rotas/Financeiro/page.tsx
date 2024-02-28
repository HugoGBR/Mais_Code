"use client";

import * as React from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CardWithForm() {
  return (
    <Card className="w-auto">
      
      <CardContent>
        <div className="flex items-center">
          <div>
            <Image
              src="@/public/icons/icon_perfil_preto.svg"
              alt="Imagem"
              width={50} 
              height={600} 
              className="rounded-2xl"
            />
          </div>
          <div className="ml-4"> 
            <Label htmlFor="nome" className=""> GUSTAVO</Label>
            <Label htmlFor="e-mail" className="block">teste@gmail.com</Label>
            <Label htmlFor="tipo de cadsatro" className=" text-sky-800 text-xs">VENDEDOR</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
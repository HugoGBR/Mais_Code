
"use client";

import * as React from "react";
import Image from "next/image";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CardWithForm() {
  return (
    <Card className="flex w-[250px]">

      <CardContent>
        <div className="flex items-center justify-center">
          <div>
            <Image
              src={'icons/icon_perfil_preto.svg'}
              alt="Imagem"
              width={50} // Ajuste conforme necessárioS
              height={600} // Ajuste conforme necessário
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





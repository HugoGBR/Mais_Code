import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export default async function VendaDinamico({params}: {params: {id:number}}) {
    //const Vendas = await getDados(params.id)
    return(
        <div className="bg-grey-300 h-screen md:flex justify-center items-center p-20">
            <Card className="w-[560px] :">
      <CardHeader>
        <CardTitle>Contrato</CardTitle>
        <CardDescription>Dados do Contrato</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 w-[220px]">
              <Label className= "bg" htmlFor="nome"></Label>
              <Input id="name" placeholder="NOME DO CLIENTE" />
            </div>
            <div className="display:inline-block flex flex-col space-y-1.5 w-[220px] ">
              <Label className= "bg" htmlFor="DATAI"></Label>
              <Input id="name" placeholder="DATA INICIAL" />
              <Label className= "bg left-2" htmlFor="DATAF"></Label>
              <Input id="name" placeholder="DATA FINAL" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Produto">Produto</Label>
              <Select>
                <SelectTrigger id="Produto">
                  <SelectValue placeholder="Selecione um Produto" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="PHP">Hora Dev PHP</SelectItem>
                  <SelectItem value="C#">Hora Dev C#</SelectItem>
                  <SelectItem value="VUE.js">Hora Dev VUE.js</SelectItem>
                  <SelectItem value="Designer">Hora Dev Designer</SelectItem>
                  <SelectItem value="Suporte">Hora Infra Suporte</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
        </div>
        


    )
}


import { dadosUsuario } from "@/lib/interfaces/dadosUsuarios";
import { Card, CardContent } from "./card";
import { Label } from "./label";

export default function CardUsuario ({dados}: {dados: dadosUsuario}) {
    return(
        <div>
            <button className=''>  
            <Card className="bg-white shadow-lg rounded-lg overflow-hidden w-64">
                <CardContent>
                  <div className="flex justify-center items-center mt-3">
                    <img src="/icons/icon_perfil_preto.png" alt="Perfil" className="w-12 h-12 rounded-2xl" />
                    {/* onClick */}
                    <div  className="ml-4">
                    <Label htmlFor="nome">{dados.nome}</Label>
                    <Label htmlFor="e-mail" className="block">{dados.telefone}</Label>
                    <Label htmlFor="tipo de cadastro" className="text-sky-800 text-xs">{dados.tipo_Pessoa}</Label>
                  </div>
                    
                  </div>
                </CardContent>
              </Card>
          </button>
        </div>
    )
}
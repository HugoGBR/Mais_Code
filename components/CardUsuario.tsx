import {dadosUsuario} from "@/lib/interfaces/dadosUsuarios";
import {Card, CardContent} from "./ui/card";
import {Label} from "./ui/label";
import Link from "next/link";

export default function CardUsuario({dados}: { dados: dadosUsuario }) {
    return (
        <div>
            <Link href="">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full py-3 px-5">
                    <div className="flex gap-6 items-center">
                        <img src="/icons/icon-perfil-preto.png" alt="Perfil" className="w-12 h-12 rounded-2xl"/>
                        {/* onClick */}
                        <div className="">
                            <h1 className="text-sm">{dados.nome}</h1>
                            <h1>{dados.telefone}</h1>
                            <h1 className="text-blue-800 font-bold">{dados.tipo_Pessoa}</h1>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
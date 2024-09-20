
import {dadosUsuario} from "@/lib/interfaces/dadosUsuarios";
import { escolheTipoCliente } from "@/lib/UsuarioController";
import Link from "next/link";

export default function CardUsuario({nome,email,cargoId}: {nome: string, email: string, cargoId: number }) {
    return (
        <div>
            <Link href="">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full py-3 px-5">
                    <div className="flex gap-6 items-center">
                        <img src="/icons/icon-perfil-preto.png" alt="Perfil" className="w-12 h-12 rounded-2xl"/>
                        {/* onClick */}
                        <div className="">
                            <h1 className="text-sm">{nome}</h1>
                            <h1>{email}</h1>
                            <h1 className="text-blue-800 font-bold">{escolheTipoCliente(cargoId)}</h1>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

// fazer o if pra nao aparecer o id 
import { dadosUsuario } from "@/lib/interfaces/dadosUsuarios";
import { escolheTipoCliente } from "@/lib/UsuarioController";


export default function CardUsuario({ dados }: { dados: dadosUsuario }) {
    return (
        <div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full py-3 px-5">
                <div className="flex gap-6 items-center">
                    <img src="/icons/icon-perfil-preto.png" alt="Perfil" className="w-12 h-12 rounded-2xl" />
                    {/* onClick */}
                    <div className="">
                        <h1 className="text-sm">{dados.nome}</h1>
                        <h1>{dados.email}</h1>
                        <h1 className="text-blue-800 font-bold">{escolheTipoCliente(dados.cargo_id)}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
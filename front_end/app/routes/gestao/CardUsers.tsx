import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { createNewUserGestao } from "@/lib/usuarioController";

export default function cadastrarUsuarioGestao() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cargo_id, setCargoId] = useState("");
    const route = useRouter();
    const [camposPreenchidos, setCamposPreenchidos] = useState(false);

    const handleSubmit = async () => {
        if (nome.trim() !== '' && email.trim() !== '' && senha.trim() !== '' ) {
            setCamposPreenchidos(true);

            const response = await createNewUserGestao(nome, Number(cargo_id), email, senha);
            
            if (response == 1) {
                alert('Usuário cadastrado com sucesso!');
                route.push('/routes/gestao/Usuario'); 
            } else {
                alert('Erro ao cadastrar o usuário. Por favor, tente novamente.');
            }
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    };
    


    return (
        <form onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
            
            <div className="flex justify-center items-center bg-gray-100">
                <Card className="p-10 drop-shadow-xl rounded-xl">
                    <div className="h-12 mb-5">
                        <h1 className="font-bold text-2xl">Usuário</h1>
                    </div>
                    <div className="flex justify-center items-center opacity-40 mb-10">
                        <img src="/icons/icon-perfil-preto.png" className="w-28" alt="imagem" />
                    </div>

                    <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="flex flex-col space-y-1.5">
                            <input type="text" className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500" id="nome" placeholder="Nome"
                                onChange={(event) => setNome(event.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="email"
                                className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500"
                                id="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />

                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="password"
                                className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500"
                                id="senha" placeholder="Senha" onChange={(event) => setSenha(event.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <select id="cargo_id" onChange={(event) => setCargoId((event.target.value))}>
                                <option value="">Cargos...</option>
                                <option value={1}>Administrador</option>
                                <option value={2}>Vendedor</option>
                                <option value={3}>Financeiro</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded"
                            type="submit">
                            Cadastrar
                        </button>
                    </div>
                </Card>
            </div>
        </form>
    );
}
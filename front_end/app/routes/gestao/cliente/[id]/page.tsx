'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserById, updateUser } from "@/lib/UsuarioController";
import { Card } from "@/components/ui/card";




export default function App({ params }: { params: { id: number } }) {
    const [dadosUsuario, setdadosUsuario] = useState({ nome: "", cargo_id: 0, senha: "", email: "" });
    const [nome, setNome] = useState("");
    const router = useRouter();



    useEffect(() => {
        const setdados = async () => {
            const usuario = await getUserById(params.id);
            setdadosUsuario(usuario);
        };

        setdados();
    }, [params.id]);

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateUser(dadosUsuario.nome, dadosUsuario.cargo_id, dadosUsuario.email, dadosUsuario.senha, params.id);
        router.push('/routes/gestao');
    };



    return (
        <div>
            <form onSubmit={handleEditSubmit}>
                <div className="flex justify-center items-center bg-gray-100">
                    <Card className="p-10 drop-shadow-xl rounded-xl">
                        <div className="h-12 mb-5">
                            <h1 className="font-bold text-2xl">Cliente</h1>
                        </div>
                        <div className="flex justify-center items-center opacity-40 mb-10">
                            <img src="/icons/icon-empresa.png" className="w-28" alt="imagem" />
                        </div>

                        <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="flex flex-col space-y-1.5">
                                <input type="text"
                                    value={dadosUsuario.nome}
                                    onChange={(e) => setdadosUsuario({ ...dadosUsuario, nome: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="nome" placeholder="Nome"
                                    />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <input type="text"
                                    value={dadosUsuario.nome}
                                    onChange={(e) => setdadosUsuario({ ...dadosUsuario, nome: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="nome" placeholder="Nome"
                                    />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <input type="text"
                                    value={dadosUsuario.nome}
                                    onChange={(e) => setdadosUsuario({ ...dadosUsuario, nome: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="nome" placeholder="Nome"
                                    />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <input type="text"
                                    value={dadosUsuario.nome}
                                    onChange={(e) => setdadosUsuario({ ...dadosUsuario, nome: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="nome" placeholder="Nome"
                                    />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded" type="submit">EDITAR CLIENTE</button>
                        </div>
                    </Card>
                </div>
            </form>

        </div>
    );
}


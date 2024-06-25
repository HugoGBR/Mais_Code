'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserById, updateUser } from "@/lib/usuarioController";

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
        router.push("/users");
    };

    const handleCardSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ nome })
        });
        const resultado = await response.json();
        console.log(resultado);
        router.replace("/routes/gestao");
    };

    return (
        <div>
            <div className="flex justify-center items-center bg-gray-100">
                <Card className="p-10 drop-shadow-xl rounded-xl">
                    <h1 className="font-bold text-2xl mb-5">Editar Usuário</h1>
                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={dadosUsuario.nome}
                                onChange={(e) => setdadosUsuario({ ...dadosUsuario, nome: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={dadosUsuario.email}
                                onChange={(e) => setdadosUsuario({ ...dadosUsuario, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Cargo ID:</label>
                            <input
                                type="number"
                                value={dadosUsuario.cargo_id}
                                onChange={(e) => setdadosUsuario({ ...dadosUsuario, cargo_id: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label>Senha:</label>
                            <input
                                type="password"
                                value={dadosUsuario.senha}
                                onChange={(e) => setdadosUsuario({ ...dadosUsuario, senha: e.target.value })}
                            />
                        </div>
                        <button type="submit">Salvar</button>
                    </form>
                </Card>
            </div>

            <div className="flex justify-center items-center bg-gray-100 mt-10">
                <Card className="p-10 drop-shadow-xl rounded-xl">
                    <div className="h-12 mb-5">
                        <h1 className="font-bold text-2xl">Cliente</h1>
                    </div>
                    <div className="flex justify-center items-center opacity-40 mb-10">
                        <img src="/icons/icon-empresa.png" className="w-28" alt="imagem"/>
                    </div>

                    <form onSubmit={handleCardSubmit}>
                        <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="text"
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="nome"
                                    placeholder="Nome"
                                    onChange={(event) => setNome(event.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="text"
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="cpfcnpj"
                                    placeholder="CPF/CNPJ"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="email"
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="text"
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="address"
                                    placeholder="Endereço"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded">
                                EDITAR CLIENTE
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`bg-white p-4 rounded-md shadow-md ${className}`}>{children}</div>;
}
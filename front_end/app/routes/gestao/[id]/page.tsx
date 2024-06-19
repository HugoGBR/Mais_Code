'use client'

import React, {useState} from "react";
import {Card} from "@/components/ui/card";
import { useRouter} from "next/navigation";


export default function CardUsers() {
    const [nome, setNome] = useState("");
    const route = useRouter();
    async function handleSubmit() {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({nome})
        });
        const resultado = await response.json();
        console.log(resultado)
        route.replace("/routes/gestao")
    }

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <Card className="p-10 drop-shadow-xl rounded-xl">
                <div className="h-12 mb-5">
                    <h1 className="font-bold text-2xl">Cliente</h1>
                </div>
                <div className="flex justify-center items-center opacity-40 mb-10">
                    <img src="/icons/icon-empresa.png" className="w-28" alt="imagem"/>
                </div>

                <form onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }}>
                    <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="flex flex-col space-y-1.5">
                            <input type="text" className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500" id="nome" placeholder="Nome"
                                   onChange={(event) => setNome(event.target.value)}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="text"
                                   className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500"
                                   id="cpfcnpj" placeholder="CPF/CNPJ"
                                   onChange={(event) => setNome(event.target.value)}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="email"
                                   className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500"
                                   id="email" placeholder="Email" onChange={(event) => setNome(event.target.value)}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="text"
                                   className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500"
                                   id="address" placeholder="Endereço"/>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded">CADASTRAR
                            CLIENTE
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

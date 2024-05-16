import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { createNewCliente } from "@/lib/clienteController";

export default function CadastrarCliente() {
    const [user, setUser] = useState({
        id: 0,
        nome: "",
        telefone: "",
        email: "",
        cpf_cnpj: ""
    });


    const [telefone, setTelefone] = useState("");
    const [nome, setNome] = useState("");
    const [cpf_cnpj, setCpf_cnpj] = useState("");
    const [email, setEmail] = useState("");
    const route = useRouter();

    async function handleSubmit() {
        const resposta = await createNewCliente( nome, email,  telefone, cpf_cnpj)
        route.push("/routes/cadastros/Cliente")
    }



    return (
        <form onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
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

                            <input type="text" className="border-b-2 focus:border-b-2 focus:outline:" placeholder="Nome" onChange={(event) => setNome(event.target.value)} />

                        </div>
                        <div className="flex flex-col space-y-1.5">

                            <input type="text" className="border-b-2 focus:border-b-2 focus:outline:" placeholder="CPF/CNPJ" onChange={(event) => setCpf_cnpj(event.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">

                            <input type="text" className="border-b-2 focus:border-b-2 focus:outline:" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="text" className="border-b-2 focus:border-b-2 focus:outline:" placeholder="Telefone" onChange={(event) => setTelefone(event.target.value)} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded"
                            type="submit">CADASTRAR
                            CLIENTE
                        </button>
                    </div>
                </Card>
            </div>
        </form>

    );
}


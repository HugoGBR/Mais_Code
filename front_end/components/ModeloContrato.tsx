"use client"
import React, { useState, FormEvent } from 'react';
// import { createNewContrato } from '@/lib/ContratoController';
import { useRouter } from 'next/navigation';

export default function ModeloContrato() {
    const [nomeContrato, setNomeContrato] = useState<string>('');    
    const router = useRouter();

    // const handleSubmit = async (event: FormEvent) => {
    //     event.preventDefault();
    //     await createNewContrato(
    //         nomeContrato,            
    //     );
    //     // router.push("routes/ajustes");
    // };

    return (
        <div className="flex flex-col h-screen">
            {/* Card de Cadastro */}
            <div className="flex justify-center items-center flex-grow">
                <div className="max-w-lg w-full bg-white shadow-xl rounded-md p-8">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Tipo de Cadastro</h2>
                    <form>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="tipoContrato"
                                name="tipoContrato"
                                value={nomeContrato}
                                onChange={(event) => setNomeContrato(event.target.value)}
                                placeholder="Tipo de Contrato"
                                required
                                className="w-full border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>                        
                        <div className="text-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                CADASTRAR
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

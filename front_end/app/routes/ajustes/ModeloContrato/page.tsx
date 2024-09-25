"use client";
import React, { useState, FormEvent } from "react";

import { useRouter } from "next/navigation";
import { createNewTipoContrato } from "@/lib/TipoContratoController";
import AuthGuard from "@/components/ValidarTela";

export default function ModeloContrato() {
  const [nomeContrato, setNomeContrato] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await createNewTipoContrato(nomeContrato);
    router.push("/routes/ajustes");
  };

  return (
    <AuthGuard>
      <div className="flex h-full justify-center items-center">
        <div className="w-full bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Tipo de Contrato
          </h2>
          <form onSubmit={handleSubmit}>
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
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded w-full"
              >
                CADASTRAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthGuard>
  );
}

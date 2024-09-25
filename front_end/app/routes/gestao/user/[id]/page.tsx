"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getAllCargo, getUserById, updateUser } from "@/lib/UsuarioController";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema } from "@/app/schemas/userSchema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DadosCargos } from "@/lib/interfaces/dadosUsuarios";
import { z } from "zod";
import AuthGuard from "@/components/ValidarTela";

type LoginFormSchema = z.infer<typeof userSchema>;

export default function App({ params }: { params: { id: number } }) {
  const [dadosUsuario, setdadosUsuario] = useState({
    nome: "",
    cargo_id: 0,
    senha: "",
    email: "",
  });
  const router = useRouter();
  const [inputsHabilitados, setInputHabilitados] = useState(false);

  const HabilitarEventos = () => {
    setInputHabilitados(true);
  };
  const [listaCargo, setListaCargo] = useState<DadosCargos[]>([]);
  const { setValue } = useForm<LoginFormSchema>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      const Lcargo = await getAllCargo();
      setListaCargo(Lcargo);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const setdados = async () => {
      const usuario = await getUserById(params.id);
      setdadosUsuario(usuario);
      setValue("cargo", usuario.cargo_id.toString());
    };

    setdados();
  }, [params.id, setValue]);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUser(
      dadosUsuario.nome,
      dadosUsuario.cargo_id,
      dadosUsuario.email,
      dadosUsuario.senha,
      params.id
    );
    router.push("/routes/gestao");
  };
  const handleButtonClick = async () => {
    if (inputsHabilitados) {
      await updateUser(
        dadosUsuario.nome,
        dadosUsuario.cargo_id,
        dadosUsuario.email,
        dadosUsuario.senha,
        params.id
      );
      router.push("/routes/gestao");
    } else {
      HabilitarEventos();
    }
  };

  return (
    <AuthGuard>
      <div>
        <form onSubmit={handleEditSubmit}>
          <div className="flex justify-center items-center bg-gray-100 mt-10">
            <Card className="p-10 drop-shadow-xl rounded-xl">
              <div className="h-12 mb-5">
                <h1 className="font-bold text-2xl">Usuário</h1>
              </div>
              <div className="flex justify-center items-center opacity-40 mb-10">
                <img
                  src="/icons/icon-perfil-preto.png"
                  className="w-28"
                  alt="imagem"
                />
              </div>

              <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex flex-col space-y-1.5">
                  <input
                    type="text"
                    value={dadosUsuario.nome}
                    onChange={(e) =>
                      setdadosUsuario({ ...dadosUsuario, nome: e.target.value })
                    }
                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                    id="nome"
                    placeholder="Nome"
                    disabled={!inputsHabilitados}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <input
                    type="email"
                    value={dadosUsuario.email}
                    onChange={(e) =>
                      setdadosUsuario({
                        ...dadosUsuario,
                        email: e.target.value,
                      })
                    }
                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                    id="email"
                    placeholder="Email"
                    disabled={!inputsHabilitados}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <input
                    type="password"
                    value={dadosUsuario.senha}
                    onChange={(e) =>
                      setdadosUsuario({
                        ...dadosUsuario,
                        senha: e.target.value,
                      })
                    }
                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                    id="senha"
                    placeholder="Senha"
                    disabled={!inputsHabilitados}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Select
                    value={dadosUsuario.cargo_id.toString()}
                    disabled={!inputsHabilitados}
                    onValueChange={(value) =>
                      setdadosUsuario({
                        ...dadosUsuario,
                        cargo_id: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Cargos..." />
                    </SelectTrigger>
                    <SelectContent id="cargo_id">
                      <SelectGroup>
                        {listaCargo.map((Lcargo) => (
                          <SelectItem
                            key={Lcargo.id}
                            value={Lcargo.id.toString()}
                          >
                            {Lcargo.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {inputsHabilitados ? "Alterar" : "Editar"}
                </button>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </AuthGuard>
  );
}

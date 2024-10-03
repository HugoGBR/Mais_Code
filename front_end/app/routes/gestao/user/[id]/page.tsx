'use client'

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getAllCargo, getUserById, updateUser } from "@/lib/UsuarioController";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema } from "@/app/schemas/userSchema";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DadosCargos } from "@/lib/interfaces/dadosUsuarios";
import { z } from "zod";

type LoginFormSchema = z.infer<typeof userSchema>;

export default function App({ params }: { params: { id: number } }) {
    const [dadosUsuario, setdadosUsuario] = useState({ nome: "", cargo_id: 0, senha: "", email: "", status_usuario: 1 });
    const router = useRouter();
    const [inputsHabilitados, setInputHabilitados] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const HabilitarEventos = () => {
        setInputHabilitados(true);
    }
    const [listaCargo, setListaCargo] = useState<DadosCargos[]>([]);
    const { setValue } = useForm<LoginFormSchema>({
        resolver: zodResolver(userSchema)
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
            setValue('cargo', usuario.cargo_id.toString());
        };

        setdados();
    }, [params.id, setValue]);


    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateUser(dadosUsuario.nome, dadosUsuario.cargo_id, dadosUsuario.email, dadosUsuario.senha, dadosUsuario.status_usuario, params.id);
        router.push('/routes/gestao');
    };

    const [isHidden, setIsHidden] = useState(true);

    const handleButtonClick = async () => {
        if (inputsHabilitados) {
            await updateUser(dadosUsuario.nome, dadosUsuario.cargo_id, dadosUsuario.email, dadosUsuario.senha, dadosUsuario.status_usuario, params.id);
            router.push('/routes/gestao');
        } else {
            HabilitarEventos();
            setIsHidden(false);
            setInputHabilitados(true);
        }
    };

    const toggleUserStatus = async () => {
        try {
            const novoStatus = dadosUsuario.status_usuario === 1 ? 0 : 1;
            setdadosUsuario((prev) => ({ ...prev, status_usuario: novoStatus }));

        } catch (error) {
            console.error("Erro ao alterar o status do usuário: ", error);
        }
    };


    return (
        <div>
            <form onSubmit={handleEditSubmit}>
                <div className="flex justify-center items-center bg-gray-100 mt-10">
                    <Card className="p-10 drop-shadow-xl rounded-xl">
                        <div className="h-12 mb-5">
                            <h1 className="font-bold text-2xl">Usuário</h1>
                        </div>
                        <div className="flex justify-center items-center opacity-40 mb-10">
                            <img src="/icons/icon-perfil-preto.png" className="w-28" alt="imagem" />
                        </div>

                        <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="text"
                                    value={dadosUsuario.nome}
                                    onChange={(e) => setdadosUsuario({ ...dadosUsuario, nome: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="nome" placeholder="Nome"
                                    disabled={!inputsHabilitados}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="email"
                                    value={dadosUsuario.email}
                                    onChange={(e) => setdadosUsuario({ ...dadosUsuario, email: e.target.value })}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="email" placeholder="Email"
                                    disabled={!inputsHabilitados}
                                />
                            </div>
                            <div className="max-w-sm">
                                <div className="relative">
                                    <input
                                        id="hs-toggle-password"
                                        type={showPassword ? "text" : "password"}
                                        value={dadosUsuario.senha}
                                        onChange={(e) => setdadosUsuario({ ...dadosUsuario, senha: e.target.value })}
                                        className="border-b-2 ps-2 focus:border-b-2 focus:outline-none focus:border-blue-500 h-10 w-full pr-10"  // pr-10 para evitar que o botão sobreponha o texto
                                        placeholder="Senha"
                                        disabled={!inputsHabilitados}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-gray-400"
                                    >
                                        <svg
                                            className="shrink-0 size-3.5"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            {showPassword ? (
                                                <>
                                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </>
                                            ) : (
                                                <>
                                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                                    <line x1="2" x2="22" y1="2" y2="22"></line>
                                                </>
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Select
                                    value={dadosUsuario.cargo_id.toString()}
                                    disabled={!inputsHabilitados || dadosUsuario.status_usuario === 0}
                                    onValueChange={(value) => setdadosUsuario({ ...dadosUsuario, cargo_id: parseInt(value) })}>
                                    <SelectTrigger className="w-[220px]">
                                        <SelectValue placeholder="Cargos..." />
                                    </SelectTrigger>
                                    <SelectContent id="cargo_id">
                                        <SelectGroup>
                                            {listaCargo.map((Lcargo) => (
                                                <SelectItem key={Lcargo.id} value={Lcargo.id.toString()}>
                                                    {Lcargo.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className={`flex justify-center ${isHidden ? 'hidden' : ''}`}>
                            <button
                                type="button"
                                onClick={toggleUserStatus}
                                className={`w-full ${dadosUsuario.status_usuario === 1 ? 'bg-red-700' : 'bg-green-700'} hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded`}
                                disabled={!inputsHabilitados}
                            >
                                {dadosUsuario.status_usuario === 1 ? "Inativar Usuário" : "Ativar Usuário"}
                            </button>
                        </div>
                        <div className='flex justify-center'>
                            <button type='button' onClick={handleButtonClick}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 py-2 px-4 rounded">
                                {inputsHabilitados ? "Alterar" : "Editar"}
                            </button>
                        </div>
                    </Card>
                </div>
            </form>
        </div>
    );
}

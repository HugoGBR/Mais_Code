'use client'
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { createNewUserGestao, getAllCargo } from "@/lib/UsuarioController";
import { z } from "zod";
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
} from "@/components/ui/select"
import { DadosCargos } from "@/lib/interfaces/dadosUsuarios";
import { useToast } from "@/components/ui/use-toast";

type LoginFormSchema = z.infer<typeof userSchema>;

export default function CardUsers() {
    const route = useRouter();
    const [listaCargo, setListaCargo] = useState<DadosCargos[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginFormSchema>({
        resolver: zodResolver(userSchema)
    });
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            const Lcargo = await getAllCargo();
            setListaCargo(Lcargo);
        };

        fetchData();
    }, []);


    const resetForm = () => {
        setValue('nome', "");
        setValue('email', "");
        setListaCargo([]);
        setShowPassword(false);
    };

    const handleFormSubmit = async (data: LoginFormSchema) => {
        const { nome, email, password, cargo } = data;


        const response = await createNewUserGestao(
            nome,
            Number(cargo),
            email,
            password
        );
        if (Number(response.status) == 1) {
            toast({
                title: "Sucesso",
                description: "Usuário cadastrado com sucesso!",
                className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
            });
            resetForm();
            route.push('/routes/gestao');
        } else {
            toast({
                title: "Erro",
                description: "Erro ao cadastrar o usuário. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
        }

    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="flex justify-center items-center bg-gray-100">
                <Card className="rounded-lg border p-5 md:p-10 hover:shadow-xl">
                    <div className="h-12 mb-5">
                        <h1 className="font-bold text-2xl">Usuário</h1>
                    </div>
                    <div className="flex justify-center items-center mb-10">
                        <img
                            src="/icons/icon-perfil-preto.png"
                            className="w-28"
                            alt="imagem" />
                    </div>

                    <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="flex flex-col space-y-1.5">
                            <input
                                type="text"
                                className="border-b-2 ps-2 focus:border-b-2 focus:outline-none focus:border-blue-500 h-10 w-full pr-10"
                                id="nome"
                                placeholder="Nome"
                                {...register('nome')}
                            />
                            {errors && (<div className="text-red-500">{errors.nome?.message}</div>)}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <input
                                type="email"
                                className="border-b-2 ps-2 focus:border-b-2 focus:outline-none focus:border-blue-500 h-10 w-full pr-10"
                                id="email"
                                placeholder="Email"
                                {...register('email')}
                            />
                            {errors && (<div className="text-red-500">{errors.email?.message}</div>)}
                        </div>

                        <div className="max-w-sm">
                            <div className="relative">
                                <input
                                    id="hs-toggle-password"
                                    type={showPassword ? "text" : "password"}
                                    className="border-b-2 ps-2 focus:border-b-2 focus:outline-none focus:border-blue-500 h-10 w-full pr-10"
                                    placeholder="Senha"
                                    {...register('password')}
                                />
                                {errors && (<div className="text-red-500">{errors.password?.message}</div>)}

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

                        <div className="flex flex-col space-y-1.5 w-full">
                            <Select onValueChange={(value) => setValue('cargo', value)}>
                                <SelectTrigger className="h-10 ">
                                    <SelectValue placeholder="Cargos..." />
                                </SelectTrigger>
                                <SelectContent id="cargo_id">
                                    <SelectGroup>
                                        {listaCargo.map((Lcargo) => (
                                            <SelectItem className="cursor-pointer" key={Lcargo.id} value={Lcargo.id.toString()}>
                                                {Lcargo.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors && (<div className="text-red-500">{errors.cargo?.message}</div>)}
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

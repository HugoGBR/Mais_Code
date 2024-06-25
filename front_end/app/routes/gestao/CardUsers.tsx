import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { createNewUserGestao } from "@/lib/usuarioController";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema } from "@/app/schemas/userSchema";


type LoginFormSchema = z.infer<typeof userSchema>;

export default function CadastrarUsuarioGestao() {
    const route = useRouter();
    const [camposPreenchidos, setCamposPreenchidos] = useState(false);


    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
        resolver: zodResolver(userSchema)
    });


    const handleFormSubmit = async (data: LoginFormSchema) => {
        const { nome, email, password, cargo } = data;

        const response = await createNewUserGestao(nome, Number(cargo), email, password);

        if (response == 1) {
            alert('Usuário cadastrado com sucesso!');
            route.push('/routes/gestao/Usuario');
        } else {
            alert('Erro ao cadastrar o usuário. Por favor, tente novamente.');
        }
    };


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>

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
                                {...register('nome')} />
                            {errors && (<div className="text-red-500 ">{errors.nome?.message}</div>)}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="email"
                                className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500"
                                id="email" placeholder="Email" {...register('email')} />
                            {errors && (<div className="text-red-500 ">{errors.email?.message}</div>)}

                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="password"
                                className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500"
                                id="senha" placeholder="Senha" {...register('password')} />
                            {errors && (<div className="text-red-500 ">{errors.password?.message}</div>)}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <select id="cargo_id" {...register('cargo')}>
                                <option value="">Cargos...</option>
                                <option value={1}>Administrador</option>
                                <option value={2}>Vendedor</option>
                                <option value={3}>Financeiro</option>
                            </select>
                            {errors && (<div className="text-red-500 ">{errors.cargo?.message}</div>)}
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
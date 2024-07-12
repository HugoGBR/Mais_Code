import React, {useState} from "react";
import {Card} from "@/components/ui/card";
import {useRouter} from "next/navigation";
import {createNewCliente} from "@/lib/ClienteController";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {clientSchema} from "@/app/schemas/clientSchema";

type LoginFormSchema = z.infer<typeof clientSchema>;

export default function CadastrarCliente() {
    const route = useRouter();
    const [camposPreenchidos, setCamposPreenchidos] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormSchema>({
        resolver: zodResolver(clientSchema)
    });

    const handleFormSubmit = async (data: LoginFormSchema) => {
        const {
            nome,
            email,
            telefone,
            cpf_cnpj
        } = data;

        const response = await createNewCliente(
            nome,
            email,
            telefone,
            cpf_cnpj
        );

        if (response == 1) {
            alert('Cliente cadastrado com sucesso!');
            route.push("/routes/cadastros");
        } else {
            alert('Erro ao cadastrar o  cliente. Por favor, tente novamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="flex justify-center items-center bg-gray-100">
                <Card className="p-10 drop-shadow-xl rounded-xl">
                    <div className="h-12 mb-5">
                        <h1 className="font-bold text-2xl">Cliente</h1>
                    </div>
                    <div className="flex justify-center items-center opacity-40 mb-10">
                        <img src="/icons/icon-empresa.png" className="w-28" alt="imagem"/>
                    </div>

                    <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="flex flex-col space-y-1.5">
                            <input type="text"
                                   className={`border-b-2 focus:border-b-2 ${errors.nome ? 'border-red-500' : ''}`}
                                   placeholder="Nome" {...register('nome')} />
                            {errors.nome && <div className="text-red-500">{errors.nome.message}</div>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="text"
                                   className={`border-b-2 focus:border-b-2 ${errors.cpf_cnpj ? 'border-red-500' : ''}`}
                                   placeholder="CPF/CNPJ"  {...register('cpf_cnpj')} />
                            {errors.cpf_cnpj && <div className="text-red-500">{errors.cpf_cnpj.message}</div>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="email"
                                   className={`border-b-2 focus:border-b-2 ${errors.email ? 'border-red-500' : ''}`}
                                   placeholder="Email"  {...register('email')} />
                            {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="text"
                                   className={`border-b-2 focus:border-b-2 ${errors.telefone ? 'border-red-500' : ''}`}
                                   placeholder="Telefone"  {...register('telefone')} />
                            {errors.telefone && <div className="text-red-500">{errors.telefone.message}</div>}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded"
                            type="submit">CADASTRAR CLIENTE
                        </button>
                    </div>
                </Card>
            </div>
        </form>
    );
}

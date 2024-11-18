import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { createNewCliente } from "@/lib/ClienteController";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { clientSchema } from "@/app/schemas/clientSchema";
import { insertMaskCpfCnpj, insertMaskTelefone } from "@/lib/MaskInput/MaskInput";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";

type LoginFormSchema = z.infer<typeof clientSchema>;

export default function CadastrarCliente() {
    const route = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [cpf_cnpj_input, setCpfCnpjInput] = useState("");
    const [telefone, setTelefoneContato] = useState("");
    const [nome, setNome] = useState("");
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginFormSchema>({
        resolver: zodResolver(clientSchema)
    });

    const handleTelefoneChange = (event: any) => {
        const { value } = event.target;
        const maskedValue = insertMaskTelefone(value);
        setValue('telefone', maskedValue);
    };

    
    const handleCpfCnpjChange = (event: any) => {
        const { value } = event.target;
        const maskedValue = insertMaskCpfCnpj(value);
        setValue('cpf_cnpj', maskedValue);
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!nome) newErrors.nome = "Obrigatório Nome";
        if (!cpf_cnpj_input) newErrors.cpf_cnpj_input = "CPF/CNPJ é obrigatório";
        if (!telefone) newErrors.telefone = "Telefone do contato é obrigatório";
        if (!email) newErrors.email = "Email do contato é obrigatório";

        if (Object.keys(newErrors).length > 0) {
            toast({
                title: "Erro de Validação",
                description: "Por favor, preencha todos os campos obrigatórios.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
            });
            return false;
        }

        return true;
    };

    const resetForm = () => {
        setNome("");
        setCpfCnpjInput("");
        setEmail("");
        setTelefoneContato("");
    };

    const handleFormSubmit = async (data: LoginFormSchema) => {
        const { nome, email, cpf_cnpj, telefone } = data;

        if (validateForm()) return;

        try {
            const response = await createNewCliente(nome, email, cpf_cnpj, telefone);

            if (response === 1) {
                toast({
                    title: "Sucesso",
                    description: "Cadastro realizado com sucesso!",
                    className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400",
                });

                resetForm();
                route.push("/routes/cadastros");
            } else {
                throw new Error("Erro ao cadastrar o cliente: resposta inválida");
            }
        } catch (error) {
            console.error("Erro ao cadastrar o cliente:", error);
            toast({
                title: "Erro",
                description: "Falha ao cadastrar o cliente. Por favor, tente novamente.",
                className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400",
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex justify-center items-center bg-gray-100">
                    <Card className="p-10 hover:shadow-xl rounded-lg border">
                        <div className="h-12 mb-5">
                            <h1 className="font-bold text-2xl">Cliente</h1>
                        </div>
                        <div className="flex justify-center items-center opacity-40 mb-10">
                            <img src="/icons/icon-empresa.png" className="w-28" alt="imagem" />
                        </div>

                        <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="text"
                                    className={`mt-auto md:col-span-4 focus:outline-none focus:border-blue-500 border-b-2 focus:border-b-2 ${errors.nome ? 'border-red-500' : ''}`}
                                    placeholder="Nome"
                                    {...register('nome')}
                                />
                                {errors.nome && <div className="text-red-500">{errors.nome.message}</div>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                            <input
                                type="text"
                                className={`mt-auto md:col-span-4 focus:outline-none focus:border-blue-500 border-b-2 focus:border-b-2 ${errors.cpf_cnpj ? 'border-red-500' : ''}`}
                                placeholder="CPF/CNPJ"
                                {...register('cpf_cnpj', {
                                    required: "CPF/CNPJ é obrigatório",
                                    minLength: {
                                        value: 11,
                                        message: "O CPF/CNPJ deve ter no mínimo 11 caracteres",
                                    },
                                    maxLength: {
                                        value: 14,
                                        message: "O CPF/CNPJ deve ter no máximo 14 caracteres",
                                    },
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "O CPF/CNPJ deve conter apenas números",
                                    },
                                })}
                                onChange={handleCpfCnpjChange}
                            />
                            {errors.cpf_cnpj && <div className="text-red-500">{errors.cpf_cnpj.message}</div>}
                        </div>


                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="email"
                                    className={`mt-auto md:col-span-4 focus:outline-none focus:border-blue-500 border-b-2 focus:border-b-2 ${errors.email ? 'border-red-500' : ''}`}
                                    placeholder="Email"
                                    {...register('email')}
                                />
                                {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <input
                                    type="text"
                                    className={`mt-auto md:col-span-4 focus:outline-none focus:border-blue-500 border-b-2 focus:border-b-2 ${errors.telefone ? 'border-red-500' : ''}`}
                                    placeholder="Telefone"
                                    {...register('telefone', {
                                        required: "Telefone é obrigatório",
                                        minLength: {
                                            value: 11,
                                            message: "O Telefone deve ter no mínimo 11 caracteres",
                                        },
                                        maxLength: {
                                            value: 14,
                                            message: "O Telefone deve ter no máximo 14 caracteres",
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "O Telefone deve conter apenas números",
                                        },
                                    })}  
                                    onChange={handleTelefoneChange}
                                />
                                {errors.telefone && <div className="text-red-500">{errors.telefone.message}</div>}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                CADASTRAR CLIENTE
                            </button>
                        </div>
                    </Card>
                </div>
            </form>
            <Toaster />
        </>
    );
}
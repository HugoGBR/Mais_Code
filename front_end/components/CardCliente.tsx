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

        if (!nome) newErrors.nome = "Campo obrigatório";
        if (!cpf_cnpj_input) newErrors.cpf_cnpj_input = "Campo obrigatório";
        if (!telefone) newErrors.telefone = "Campo obrigatório";
        if (!email) newErrors.email = "Campo obrigatório";

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
                <div className="flex w-full justify-center items-center sm:py-16">
                    <Card className="w-full max-w-4xl py-10 px-5 hover:shadow-xl rounded-lg borde">
                        {/* Título */}
                        <div className="mb-5 text-center">
                            <h1 className="font-bold text-2xl sm:text-3xl">Cliente</h1>
                        </div>
                        {/* Imagem */}
                        <div className="flex justify-center items-center opacity-40 mb-10">
                            <img src="/icons/icon-empresa.png" className="w-20 sm:w-28" alt="imagem" />
                        </div>
                        {/* Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Nome */}
                            <div className="flex flex-col space-y-2">
                                <input
                                    type="text"
                                    className={`focus:outline-none focus:border-blue-500 border-b-2 ${errors.nome ? 'border-red-500' : ''
                                        }`}
                                    placeholder="Nome"
                                    {...register('nome')}
                                />
                                {errors.nome && <div className="text-red-500 text-sm">{errors.nome.message}</div>}
                            </div>
                            {/* CPF/CNPJ */}
                            <div className="flex flex-col space-y-2">
                                <input
                                    type="text"
                                    className={`focus:outline-none focus:border-blue-500 border-b-2 ${errors.cpf_cnpj ? 'border-red-500' : ''
                                        }`}
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
                                {errors.cpf_cnpj && <div className="text-red-500 text-sm">{errors.cpf_cnpj.message}</div>}
                            </div>
                            {/* Email */}
                            <div className="flex flex-col space-y-2">
                                <input
                                    type="email"
                                    className={`focus:outline-none focus:border-blue-500 border-b-2 ${errors.email ? 'border-red-500' : ''
                                        }`}
                                    placeholder="Email"
                                    {...register('email')}
                                />
                                {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
                            </div>
                            {/* Telefone */}
                            <div className="flex flex-col space-y-2">
                                <input
                                    type="text"
                                    className={`focus:outline-none focus:border-blue-500 border-b-2 ${errors.telefone ? 'border-red-500' : ''
                                        }`}
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
                                {errors.telefone && <div className="text-red-500 text-sm">{errors.telefone.message}</div>}
                            </div>
                        </div>
                        {/* Botão */}
                        <div className="flex justify-center mt-10">
                            <button
                                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
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
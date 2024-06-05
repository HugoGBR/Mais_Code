import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/app/schemas/loginSchema";
import { validacaoLogin } from "@/lib/usuarioController";



type LoginFormSchema = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginSchema)
    });

    const handleFormSubmit = async (data: LoginFormSchema) => {
        const autenticado = await validacaoLogin(data.user,data.password)
        if (autenticado == 1){
            router.push('routes/home');
        }else{
            alert("Usuario não encontrado")
        }
    };

    const memoizedErrors = useMemo(() => ({
        user: errors.user && (<div className="text-red-500 text-sm">{errors.user.message}</div>),
        password: errors.password && (<div className="text-red-500 text-sm">{errors.password.message}</div>)
    }), [errors.user, errors.password]);

    return (
        <div className="bg-no-repeat bg-gradient-to-tr from-[#A9BFDD] to-[#122F54] h-screen flex items-center justify-center">
            <div className="h-screen flex items-center justify-center bg-cover w-full">
                <div className="sm:w-full md:w-2/3 lg:w-1/2 md:flex-row sm:flex-col sm:flex bg-cover bg-no-repeat bg-[url('/patern.png')]">
                    <div className="md:w-3/4 flex flex-col justify-center md:rounded-l-lg shadow-lg p-10 bg-[#122F54]">
                        <img src="/maiscodelogo.png" alt="" className="md:mt-24" />
                        <h1 className="text-white my-4 md:my-8 text-center text-2xl md:text-4xl font-semibold">Bem-vindo de volta!</h1>
                        <p className="text-white text-center md:mb-24">Desenvolvimento de produtos customizados para
                            Impulsionar sua empresa e melhorar seu posicionamento digital.</p>
                    </div>

                    <div className="md:w-2/4 bg-white w-full md:rounded-r-lg shadow-lg p-10">
                        <div className="w-full flex flex-col justify-center md:mb-16">
                            <h1 className="text-center md:mt-20 mb-8 text-3xl">FAÇA LOGIN</h1>
                            <form id="loginform" onSubmit={handleSubmit(handleFormSubmit)}>
                                <div className="flex flex-col">
                                    <input type="text" id="loginname" placeholder="Login" {...register("user")} className="border-b-2 h-10 focus:border-b-2
                            focus:outline-none focus:border-blue-500"/>
                                    {memoizedErrors.user}
                                    <input type="password" id="loginpassword" placeholder="Senha" {...register("password")}
                                        className="border-b-2 h-10 focus:border-b-2
                            focus:outline-none focus:border-blue-500"/>
                                    {memoizedErrors.password}
                                </div>
                                <label htmlFor="logincheck" className="text-sm block mb-7">
                                    <input type="checkbox" id="logincheck" name="logincheck" value="check"
                                        className="mr-2" />
                                    Lembrar-me
                                </label>
                                <button type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Entrar
                                </button>
                                <div className="flex justify-center mt-2">
                                    <a href="/esqueci-minha-senha" className="text-sm">
                                        Esqueci minha senha
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

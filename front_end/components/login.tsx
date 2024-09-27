import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/app/schemas/loginSchema";
import { validacaoLogin } from "@/lib/UsuarioController";



type LoginFormSchema = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginSchema)
    });

    const handleFormSubmit = async (data: LoginFormSchema) => {
        const autenticacao = await validacaoLogin(data.user, data.password);

        if (autenticacao.error) {
            alert(autenticacao.error);
        } else {
            router.push('routes/home');
        }
    };
    const [showPassword, setShowPassword] = useState(false);


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
                                <div className="flex flex-col gap-3">
                                    <input 
                                    type="text" 
                                    id="loginname" 
                                    placeholder="Login" {...register("user")} 
                                    className="ps-2 border-b-2 h-10 focus:border-b-2 focus:outline-none focus:border-blue-500"/>
                                    {memoizedErrors.user}

                                    <div className="max-w-sm">
                                        <div className="relative">
                                            <input
                                                id="hs-toggle-password"
                                                type={showPassword ? "text" : "password"}
                                                className="border-b-2 ps-2 focus:border-b-2 focus:outline-none focus:border-blue-500 h-10 w-full pr-10"  // pr-10 para evitar que o botão sobreponha o texto
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
                                    <a href="/redefinirSenha" className="text-sm">
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

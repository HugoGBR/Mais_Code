"use client"
import {useRouter} from "next/navigation";

const LoginPage = () => {
    const router = useRouter();

    return (
        <div
            className="bg-no-repeat bg-gradient-to-tr from-[#A9BFDD] to-[#122F54] h-screen flex items-center justify-center">
            <div className="h-screen flex items-center justify-center bg-cover w-full">
                <div
                    className="sm:w-full md:w-2/3 lg:w-1/2 md:flex-row sm:flex-col sm:flex bg-cover bg-no-repeat bg-[url('/patern.png')]">
                    <div className="md:w-3/4 flex flex-col justify-center md:rounded-l-lg shadow-lg p-10 bg-[#122F54]">
                        <img src="/maiscodelogo.png" alt="" className="md:mt-24"/>
                        <h1 className="text-white my-4 md:my-8 text-center text-2xl md:text-4xl font-semibold">Esqueceu
                            sua senha?</h1>
                        <p className="text-white text-center md:mb-24">Preencha os dados ao lado para solicitar a
                            recuperação de senha.</p>
                    </div>

                    <div className="md:w-2/4 bg-white w-full md:rounded-r-lg shadow-lg p-10">
                        <div className="w-full flex flex-col justify-center md:mb-16">
                            <h1 className="text-center md:mt-20 mb-8 text-3xl">REDEFINIR SENHA</h1>
                            <form id="loginform">
                                <div className="flex flex-col">
                                    <input type="email" id="email" placeholder="E-mail de acesso:"
                                           className="border-b-2 h-10 focus:border-b-2 focus:outline-none focus:border-blue-500"/>
                                </div>
                                <div className="mt-6 mb-7">
                                    <span className="text-sm text-gray-500">Você irá receber um e-mail no endereço 
                                    informado acima contendo o procedimento para criar uma nova senha para esse usuário.</span>
                                </div>
                                <button type="submit"
                                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

'use client'
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/navigation";

// Defina o componente do formulário de login
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const route = useRouter()
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError('');
  };

  const handleLogin = () => {
    if (!username || !password) {
      setError('Campos obrigatórios. Preencha todos os campos.');
    } else {
      // Lógica de autenticação aqui
      route.push('/Rotas/Home');

    }
  };

  return (
      <div className="flex justify-center items-center p-10">
        <div className=" max-w-md">
          <h1 className="text-center mt-20 mb-16 text-3xl">FAÇA LOGIN</h1>
          <form id="loginform" onSubmit={handleLogin}>
            <input type="text" id="loginname" name="name" placeholder="Login" value={username} onChange={handleUsernameChange} className="bg-transparent block w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-4" />
            <input type="password" id="loginpassword" name="password" placeholder="Senha" value={password} onChange={handlePasswordChange} className="bg-transparent block w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-1" />
            <label htmlFor="logincheck" className="text-sm block mb-7">
              <input type="checkbox" id="logincheck" name="logincheck" value="check" className="mr-2" />
              Lembrar-me
            </label>
              <button type="button" id="loginenter" className="text-white bg-blue-500 w-full py-1 rounded-md hover:bg-blue-600 cursor-pointer" onClick={handleLogin}>
               Entrar
              </button>

            {error && <p className="text-red-500 mt-4 text-sm/[12px]">{error}</p>}
            <div className="flex justify-center mt-2">
              <a href="/esqueci-minha-senha" className="text-sm">
                Esqueci minha senha
              </a>
            </div>
          </form>
        </div>
      </div>
  );


};

// página de login
const LoginPage = () => {
  return (
      <div className="bg-no-repeat bg-gradient-to-tr from-[#A9BFDD] to-[#122F54] ">
          <div className="min-h-screen flex items-center justify-center bg-cover bg-[url('/bglogin.png')]">
            <div className="w-full md:w-2/3 lg:w-1/2 flex">
              <div className="w-3/4 bg-cover bg-no-repeat rounded-l-3xl shadow-lg p-10 bg-[#122F54] bg-[url('/patern.png')]">
                <img src="/maiscodelogo.png" alt="" className="mt-24 mx-auto block" />
                <h1 className="text-white mt-9 mb-9 text-center text-4xl font-semibold">Bem-vindo de volta!</h1>
                <p className="text-white text-center mb-24">Desenvolvimento de produtos customizados para Impulsionar sua empresa e melhorar seu posicionamento digital.</p>
              </div>

                <div className="w-2/4 bg-white rounded-r-3xl shadow-lg">
                    <LoginForm/>
                </div>
            </div>
          </div>
      </div>
  );
};
// Exporte a página de login
export default LoginPage;
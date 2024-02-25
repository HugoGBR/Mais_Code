'use client'
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

// Defina o componente do formulário de login
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      setError('Campo obrigatório. Preencha todos os campos.');
    } else {
      // Lógica de autenticação aqui
      // Se a autenticação for bem-sucedida, redirecione ou execute outras ações necessárias
    }
  };

  return (
    <div className="bg-white">
      <h1>FAÇA LOGIN</h1>
      <form id="loginform" onSubmit={handleLogin}>
        <input type="text" id="loginname" name="name" placeholder="Login" value={username} onChange={handleUsernameChange} className="bg-transparent" />
        <br />
        <input type="password" id="loginpassword" name="password" placeholder="Senha" value={password} onChange={handlePasswordChange} className="text-white bg-transparent" />
        <br /><br />
        <input type="checkbox" id="logincheck" name="logincheck" value="check" className="text-white" />
        <label htmlFor="logincheck"> Lembrar-me</label>
        <br />
        <input type="submit" value="Entrar" id="loginenter" className="text-white bg-blue-500" />
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </form>
    </div>
  );
};

// página de login
const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/bglogin.jpg')" }}>
      <div className="w-full md:w-2/3 lg:w-1/2 flex">
        <div className="w-2/3 bg-cover bg-no-repeat rounded-l-3xl shadow-md bg-blue-200">
        <img src="/maiscodelogo.png" alt="" className="mt-20 mx-auto block h-1/12" />
          <h1 className="text-white mt-7 mb-7">Bem-vindo de volta!</h1>
          <p className="text-white">Desenvolvimento de produtos customizados para</p>
          <p className="text-white">Impulsionar sua empresa e melhorar seu posicionamento</p>
          <p className="text-white">digital.</p>
        </div>
        <div className="w-1/3">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
// Exporte a página de login
export default LoginPage;

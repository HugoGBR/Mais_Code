import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card } from "@/components/ui/card";
import FileAvatar from "@/components/FileAvatar";
import React, { useState, useEffect } from "react";
import { atualizarDadosUsuario } from '@/lib/UsuarioController';
import { criarCookie, getCookie } from '@/lib/coockie';

const formulario = z.object({
    nome: z.string().min(10, 'Digite no mínimo 10 caracteres.').max(60, 'Digite o nome completo, máximo de 60 caracteres.'),
    cargo: z.string().min(11, 'O cargo deve conter 11 caracteres.').max(11, 'O cargo deve conter 11 caracteres.'),
    email: z.string().email("Email inválido."),
    senha: z.string().min(5, 'Número mínimo de caracteres é 5.').max(10, "Atingiu o limite de caracteres.")
});

export type formulario = z.infer<typeof formulario>;

export default function Perfil() {
    const { register, handleSubmit, formState: { errors } } = useForm<formulario>({
        resolver: zodResolver(formulario)
    });
    const [inputsHabilitados, setInputHabilitados] = useState(false);
    const [valorInputNome, setValorInputNome] = useState('');
    const [valorInputcargo, setValorInputcargo] = useState('');
    const [valorInputEmail, setValorInputEmail] = useState('');
    const [valorInputSenha, setValorInputSenha] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        async function fetchData() {
            const userId = await getCookie('CookiCriado');
            const userName = await getCookie('UserName');
            const userCargo = await getCookie('UserCargo'); 
            const userEmail = await getCookie('UserEmail');
            const userSenha = await getCookie('UserSenha');

            if (userId) setUserId(userId);
            if (userName) setValorInputNome(userName);
            if (userCargo) setValorInputcargo(userCargo);
            if (userEmail) setValorInputEmail(userEmail);
            if (userSenha) setValorInputSenha(userSenha);
        }
        fetchData();
    }, []);

    const HabilitarEventos = () => {
        setInputHabilitados(true);
    };

    async function handleForm(dados: formulario) {
        const updatedUser = {
            nome: dados.nome,
            cargo: dados.cargo,
            email: dados.email,
            senha: dados.senha
        };

        const response = await atualizarDadosUsuario(userId, updatedUser);

        if (response.success) { 
            await criarCookie('UserName', dados.nome);
            await criarCookie('UserCargo', dados.cargo);
            await criarCookie('UserEmail', dados.email);
            await criarCookie('UserSenha', dados.senha);
            setInputHabilitados(false);
        } else {
            console.error('Erro ao atualizar o usuário:', response.message);
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className='p-6 drop-shadow-xl rounded-xl'>
                <form onSubmit={handleSubmit(handleForm)}>
                    <div>
                        <h1 className='font-bold pb-5 text-2xl'>Usuário</h1>
                    </div>

                    <div className="mb-6">
                        <FileAvatar />
                    </div>

                    <div className='pb-16 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className=''>
                            <input
                                type="text"
                                placeholder='João da Silva'
                                {...register('nome')}
                                className='border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500'
                                onChange={(e) => setValorInputNome(e.target.value)}
                                value={valorInputNome}
                                disabled={!inputsHabilitados}
                            />
                        </div>

                        <div>
                            <input
                                type='text'
                                maxLength={14}
                                placeholder='cargo'
                                {...register('cargo')}
                                onChange={(e) => setValorInputcargo(e.target.value)}
                                value={valorInputcargo}
                                disabled={!inputsHabilitados}
                                className='border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500'
                            />
                        </div>

                        <div>
                            <input
                                type='email'
                                placeholder='joão@gmail.com'
                                {...register('email')}
                                onChange={(e) => setValorInputEmail(e.target.value)}
                                value={valorInputEmail}
                                disabled={!inputsHabilitados}
                                className='border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500'
                            />
                        </div>

                        <div>
                            <input
                                type='password'
                                placeholder='************'
                                {...register('senha')}
                                onChange={(e) => setValorInputSenha(e.target.value)}
                                value={valorInputSenha}
                                disabled={!inputsHabilitados}
                                className='border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500'
                            />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        {inputsHabilitados ? (
                            <button type='submit' className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Alterar
                            </button>
                        ) : (
                            <button type='button' onClick={HabilitarEventos} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Editar
                            </button>
                        )}
                    </div>
                </form>
            </Card>
        </div>
    );
}

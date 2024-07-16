import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { editarUsuarioLogado, getAllCargo } from '@/lib/UsuarioController';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DadosCargos } from '@/lib/interfaces/dadosUsuarios';
import { criarCookie, getCookie } from '@/lib/coockie';

const schema = z.object({
    nome: z.string().min(1, 'Digite no mínimo 10 caracteres.').max(60, 'Digite o nome completo, máximo de 60 caracteres.'),
    cargo: z.string().min(1, 'O cargo deve conter no mínimo 1 caractere.').max(11, 'O cargo deve conter no máximo 11 caracteres.'),
    email: z.string().email("Email inválido."),
    senha: z.string().min(1, 'Número mínimo de caracteres é 5.').max(15, "Atingiu o limite de caracteres.")
});

export type Formulario = z.infer<typeof schema>;

export default function Perfil() {
    const { register, handleSubmit, formState: { errors } } = useForm<Formulario>({
        resolver: zodResolver(schema)
    });

    const [listaCargo, setListaCargo] = useState<DadosCargos[]>([]);
    const [inputsHabilitados, setInputHabilitados] = useState(false);
    const [valorInputNome, setValorInputNome] = useState('');
    const [valorInputCargo, setValorInputCargo] = useState('');
    const [valorInputEmail, setValorInputEmail] = useState('');
    const [valorInputSenha, setValorInputSenha] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const cargos = await getAllCargo();
            setListaCargo(cargos);

            const userIdFromCookie = await getCookie('CookiCriado');
            const userName = await getCookie('UserName');
            const userCargo = await getCookie('UserCargo');
            const userEmail = await getCookie('UserEmail');
            const userSenha = await getCookie('UserSenha');

            if (userIdFromCookie) setUserId(userIdFromCookie);
            if (userName) setValorInputNome(userName);
            if (userCargo) setValorInputCargo(userCargo);
            if (userEmail) setValorInputEmail(userEmail);
            if (userSenha) setValorInputSenha(userSenha);
        };

        fetchData();
    }, []);

    const handleButtonClick = async () => {
        if (inputsHabilitados) {
            await handleSubmit(handleForm)();
        } else {
            setInputHabilitados(true);
        }
    };

    async function handleForm(dados: Formulario) {
        const response = await editarUsuarioLogado(
            dados.nome,
            dados.email,
            dados.senha,
            dados.cargo
        );
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
        <div className='flex justify-center items-center'>
            <Card className='p-6 drop-shadow-xl rounded-xl'>
                <form onSubmit={handleSubmit(handleForm)}>
                    <div>
                        <h1 className='font-bold pb-5 text-2xl'>Usuário</h1>
                    </div>

                    <div className="mb-6 flex justify-center items-center opacity-100">
                        <img src="/icons/icon-perfil-preto.png" className="w-28" alt="imagem" />
                    </div>

                    <div className='pb-16 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <input
                                type="text"
                                placeholder='João da Silva'
                                {...register('nome')}
                                className={`border-b-2 focus:border-b-2 focus:outline-none ${errors.nome ? 'border-red-500' : 'focus:border-blue-500'}`}
                                onChange={(e) => setValorInputNome(e.target.value)}
                                value={valorInputNome}
                                disabled={!inputsHabilitados}
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
                                className={`border-b-2 focus:border-b-2 focus:outline-none ${errors.senha ? 'border-red-500' : 'focus:border-blue-500'}`}
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
                                className={`border-b-2 focus:border-b-2 focus:outline-none ${errors.email ? 'border-red-500' : 'focus:border-blue-500'}`}
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Select
                                value={valorInputCargo.toString()}
                                disabled={!inputsHabilitados || true}
                                onValueChange={(value) => setValorInputCargo(value)}>
                                <SelectTrigger className="w-[220px]">
                                    <SelectValue placeholder="Cargos..." />
                                </SelectTrigger>
                                <SelectContent id="cargo">
                                    <SelectGroup>
                                        {listaCargo.map((cargo) => (
                                            <SelectItem key={cargo.id} value={cargo.id.toString()}>{cargo.nome}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit' onClick={handleButtonClick}
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {inputsHabilitados ? "Salvar" : "Editar"}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

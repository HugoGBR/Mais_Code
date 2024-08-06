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
    nome: z.string(),
    cargo: z.string(),
    email: z.string(),
    senha: z.string()
});

export type Formulario = z.infer<typeof schema>;

export default function Perfil() {
    const { register, handleSubmit} = useForm<Formulario>({
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

            const userId = await getCookie('CookiCriado');
            const userName = await getCookie('UserName');
            const userCargo = await getCookie('UserCargo');
            const userEmail = await getCookie('UserEmail');
            const userSenha = await getCookie('UserSenha');

            if (userId) setUserId(userId);
            if (userName) setValorInputNome(userName);
            if (userCargo) setValorInputCargo(userCargo);
            if (userEmail) setValorInputEmail(userEmail);
            if (userSenha) setValorInputSenha(userSenha);
        };

        fetchData();
    }, []);


    async function handleForm(dados: Formulario) {
        console.log(dados)
        const response = await editarUsuarioLogado(
            dados.nome,
            dados.email,
            dados.senha,
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

    const HabilitarEventos = () => {
        setInputHabilitados(true);
    }

    const handleButtonClick = async () => {
        if (inputsHabilitados) {
            console.log(valorInputNome)
        } else {
            HabilitarEventos();
        }
    };


    return (
        <div>
            <form>
                <div className="flex justify-center items-center bg-gray-100 mt-10">
                    <Card className="p-10 drop-shadow-xl rounded-xl">
                        <div className="h-12 mb-5">
                            <h1 className="font-bold text-2xl">Usuário</h1>
                        </div>
                        <div className="flex justify-center items-center opacity-40 mb-10">
                            <img src="/icons/icon-perfil-preto.png" className="w-28" alt="imagem" />
                        </div>

                        <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="flex flex-col space-y-1.5">
                                <input type="text"
                                    value={valorInputNome}
                                    onChange={(e) => setValorInputNome(e.target.value )}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="nome" placeholder="Nome"
                                    disabled={!inputsHabilitados}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input type="email"
                                    value={valorInputEmail}
                                    onChange={(e) => setValorInputEmail(e.target.value )}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="email" placeholder="Email"
                                    disabled={!inputsHabilitados} 
                                    />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <input type="password"
                                    value={valorInputSenha}
                                    onChange={(e) => setValorInputSenha(e.target.value )}
                                    className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                                    id="senha" placeholder="Senha"
                                    disabled={!inputsHabilitados} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Select 
                                    value={valorInputCargo} 
                                    disabled={!inputsHabilitados || true}
                                    onValueChange={(value) => setValorInputCargo(value)}>
                                    <SelectTrigger className="w-[220px]">
                                        <SelectValue placeholder="Cargos..." />
                                    </SelectTrigger>
                                    <SelectContent id="cargo_id">
                                        <SelectGroup>
                                            {listaCargo.map((Lcargo) => (
                                                <SelectItem key={Lcargo.id} value={Lcargo.id.toString()}>{Lcargo.nome}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button type='button' onClick={handleButtonClick}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                {inputsHabilitados ? "Alterar" : "Editar"}
                            </button>
                        </div>
                    </Card>
                </div>
            </form>
        </div>
    );
}

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {Card} from "@/components/ui/card"
import FileAvatar from "@/components/FileAvatar"
import React, {useState} from "react";
import ValidarTela from '@/components/ValidarTela'

const formulario = z.object({
    //Números de restrição apenas para teste
    nome: z.string().min(10, 'Digite no mínimo 10 caracteres.').max(60, 'Digite o nome completo, máximo de 60 caracteres.'),
    cpf: z.string().min(11, 'O CPF deve conter 11 caracteres.').max(11, 'O CPF deve conter 11 caracteres.'),
    email: z.string().email("Email inválido."),
    senha: z.string().min(5, 'Número mínimo de caracteres é 5.').max(10, "Atingiu o limite de caracteres.")
})

type formulario = z.infer<typeof formulario>


export default function Perfil() {
    const {register, handleSubmit, formState: {errors}} = useForm<formulario>({
        resolver: zodResolver(formulario)
    })
    const [isOpen, setIsOpen] = useState(false)

    function handleForm(dados: formulario) {
        setIsOpen(true)
        console.log(dados)
    }

    const [inputsHabilitados, setInputHabilitados] = useState(false);
    const HabilitarEventos = () => {
        setInputHabilitados(true);
    }

    const [valorInputNome, setValorInputNome] = useState('João da Silva')
    const [valorInputCPF, setValorInputCPF] = useState('999.999.999-99')
    const [valorInputEmail, setValorInputEmail] = useState('João@gmail.com')
    const [valorInputSenha, setValorInputSenha] = useState('*************')

    return (
      
          <div className='flex justify-center items-center h-screen'>
            <Card className='p-6 drop-shadow-xl rounded-xl'>
                <form onSubmit={handleSubmit(handleForm)}>
                    <div>
                        <h1 className='font-bold pb-5 text-2xl'>Usuário</h1>
                    </div>

                    <div className="mb-6">
                        <FileAvatar/>
                    </div>

                    <div className='pb-16 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className=''>
                            <input type="text" placeholder='João da Silva' {...register('nome')}
                                   className='border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500'
                                   onChange={(e) => setValorInputNome(e.target.value)} value={valorInputNome}
                                   disabled={!inputsHabilitados}/>
                            {errors.nome && (<div className='text-red-500'>{errors.nome.message}</div>)}
                        </div>

                        <div>
                            <input
                                type='text'
                                maxLength={14}
                                placeholder='999.999.999-99'
                                {...register('cpf')}
                                onChange={(e) => setValorInputCPF(e.target.value)}
                                value={valorInputCPF}
                                disabled={!inputsHabilitados}
                                className='border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500'
                            />
                            {errors.cpf && (<div className='text-red-500'>{errors.cpf.message}</div>)}
                        </div>

                        <div>
                            <input type='email' placeholder='joão@gmail.com' {...register('email')}
                                   onChange={(e) => setValorInputEmail(e.target.value)} value={valorInputEmail}
                                   disabled={!inputsHabilitados}
                                   className='border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500'/>
                            {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
                        </div>

                        <div>
                            <input type='password' placeholder='************' {...register('senha')}
                                   onChange={(e) => setValorInputSenha(e.target.value)} value={valorInputSenha}
                                   disabled={!inputsHabilitados}
                                   className='border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500'/>
                            {errors.senha && (<div className='text-red-500 '>{errors.senha.message}</div>)}
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        {inputsHabilitados ? (
                            <button onClick={() => setIsOpen(true)} type='button'
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Alterar</button>
                        ) : (
                            <button type='button' onClick={() => HabilitarEventos()}
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
                        )}
                    </div>
                </form>
            </Card>
        </div>
      
    )
}
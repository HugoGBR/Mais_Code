"use client"

import { Card } from "@/components/ui/card";
import {useRouter} from "next/navigation";
import Link from "next/link";
import { z } from 'zod'
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const formulario = z.object({
    nome: z.string().min(1, 'Campo Obrigatorio'),
    cpf: z.string().min(1, 'Campo Obrigatorio'),
    email: z.string().email("Campo Obrigatorio."),
    address: z.string().min(1, 'Campo Obrigatorio')
})

type formulario = z.infer<typeof formulario>



export default function CardWithForm() {

    const {register, handleSubmit, formState: {errors}} = useForm<formulario>({
        resolver: zodResolver(formulario)
    })

    function handleForm(dados: formulario) {
        route.push('https://en.wikipedia.org/wiki/Monkey')
        console.log(dados)
    }
    const route = useRouter()
    const RotaContrato = () => {
        route.push('/Rotas/Cadastros');
    }
    return (

        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <div>
                    <Link href="/Rotas/Cadastros"
                          className="focus:font-bold focus:text-blue-700 focus:border-b-2 focus:outline-none focus:border-blue-500">Contrato</Link>
                </div>
                <div>
                    <Link href="/Rotas/Cadastros/Cliente"
                          className="focus:font-bold focus:text-blue-700 focus:border-b-2 focus:outline-none focus:border-blue-500">Cliente</Link>
                </div>
            </div>
            <div className="w-auto justify-center md:gap-3 md:flex md:w-7/8">
                <div className="w-full">
                    <Card className='p-10 drop-shadow-xl rounded-xl'>
                        <form onSubmit={handleSubmit(handleForm)}>
                            <div>
                                <h1 className='font-bold pb-5 text-2xl'>Cliente</h1>
                            </div>

                            <div className="flex justify-center mb-5">
                                <img src="/icons/icon-empresa.png" alt="icone"/>
                            </div>

                            <div className='pb-16 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div>
                                    <input type="text" placeholder='João da Silva'{...register('nome')}
                                           className='border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500'/>
                                    {errors.nome && (<div className='text-red-500 text-sm'>{errors.nome.message}</div>)}
                                </div>

                                <div>
                                    <input type='text' placeholder='CPF/CNPJ'{...register('cpf')}
                                           className='border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500'/>
                                    {errors.cpf && (<div className='text-red-500 text-sm'>{errors.cpf.message}</div>)}
                                </div>

                                <div>
                                    <input type='email' placeholder='joão@gmail.com' {...register('email')}
                                           className='border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500'/>
                                    {errors.email && (<div className='text-red-500 text-sm'>{errors.email.message}</div>)}
                                </div>

                                <div>
                                    <input type='text' placeholder="Endereço" {...register('address')}
                                           className='border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500'/>
                                    {errors.address && (<div className='text-red-500 text-sm'>{errors.address.message}</div>)}
                                </div>
                            </div>

                        </form>
                        <div className="text-center">
                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                CADASTRAR
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
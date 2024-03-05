"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card"
import FileAvatar from "@/components/FileAvatar"
import React from "react";

const formulario = z.object({
    nome: z.string().min(10, 'Digite no mínimo 10 caracteres.').max(60, 'Digite o nome completo, máximo de 60 caracteres.'),
    cpf: z.string().min(14, 'O CPF deve conter 14 caracteres.'),
    email: z.string().email("Email inválido."),
    senha: z.string().min(5, 'Número mínimo de caracteres é 5.').max(10, "Atingiu o limite de caracteres.")
})

type formulario = z.infer<typeof formulario>


export default function Home() {
    const {register, handleSubmit, formState: {errors}} = useForm<formulario>({
        resolver: zodResolver(formulario)
    })

    function handleForm(dados: formulario) {
        route.push('https://en.wikipedia.org/wiki/Monkey')
        console.log(dados)
    }

    const route = useRouter();

    return (

      <div  className=''>
          <Card className='p-6 drop-shadow-xl rounded-xl'>
              <form onSubmit={handleSubmit(handleForm)}>
                  <div>
                      <h1 className='font-bold pb-5 text-2xl'>Usuário</h1>
                  </div>

                  <div>
                      <FileAvatar/>
                  </div>

                  <div className='pb-16 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div className=''>
                          <input type="text" placeholder='João da Silva'{...register('nome')}
                                 className='border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500'/>
                          {errors.nome && (<div className='text-red-500 text-sm'>{errors.nome.message}</div>)}
                      </div>

                      <div>
                          <input type='text' placeholder='999.999.999-99'{...register('cpf')}
                                 className='border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500'/>
                          {errors.cpf && (<div className='text-red-500 text-sm'>{errors.cpf.message}</div>)}
                      </div>

                      <div>
                          <input type='email' placeholder='joão@gmail.com' {...register('email')}
                                 className='border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500'/>
                          {errors.email && (<div className='text-red-500 text-sm'>{errors.email.message}</div>)}
                      </div>

                      <div>
                          <input type='password' placeholder='************' {...register('senha')}
                                 className='border-b-2 mt-1 p-2 block w-full focus:outline-none focus:border-blue-500'/>
                          {errors.senha && (<div className='text-red-500 text-sm'>{errors.senha.message}</div>)}
                      </div>
                  </div>

              </form>
              <div className="text-center">
                  <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      EDITAR
                  </button>
              </div>
          </Card>
      </div>
    )
}
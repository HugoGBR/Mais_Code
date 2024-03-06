"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card"
import FileAvatar from "@/components/FileAvatar"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'

//pequisar rejex


const formulario = z.object({
  //Números de restrição apenas para teste
  nome: z.string().min(10, 'Digite no mínimo 10 caracteres.').max(60, 'Digite o nome completo, máximo de 60 caracteres.'),
  cpf: z.string().min(11, 'O CPF deve conter 11 caracteres.').max(11,'O CPF deve conter 11 caracteres.'),
  email: z.string().email("Email inválido."),
  senha: z.string().min(5, 'Número mínimo de caracteres é 5.').max(10, "Atingiu o limite de caracteres.")
})

type formulario = z.infer<typeof formulario>



export default function Perfil() {
  const { register, handleSubmit, formState: { errors } } = useForm<formulario>({
    resolver: zodResolver(formulario)
  })
  const [isOpen, setIsOpen] = useState(false)
function handleForm(dados: formulario) {
  setIsOpen(true)
  // route.push('')
    console.log(dados)
  }
  
  
  const route = useRouter();

    return (

      <div className='flex justify-center items-center h-screen bg-gray-100'>
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

            <div className='pb-16 grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className=''>
                <input type="text" placeholder='João da Silva' {...register('nome')} 
                className='focus:outline-none border border-t-0 border-l-0 border-r-0 border-b-gray-600 p-2 mt-1'/>
                {errors.nome && (<div className='text-red-500'>{errors.nome.message}</div>)}
              </div>

              <div>
                <input type='text' placeholder='999.999.999-99'{...register('cpf')} 
                className='focus:outline-none border border-t-0 border-l-0 border-r-0 border-b-gray-600  p-2 mt-1' />
                {errors.cpf && (<div className='text-red-500'>{errors.cpf.message}</div>)}
              </div>

              <div>
                <input type='email' placeholder='joão@gmail.com' {...register('email')} 
                className='focus:outline-none border border-t-0 border-l-0 border-r-0 border-b-gray-600  p-2 mt-1' />
                {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
              </div>

              <div>
                <input type='password' placeholder='************' {...register('senha')} 
                className='focus:outline-none border border-t-0 border-l-0 border-r-0 border-b-gray-600  p-2 mt-1'  />
                {errors.senha && (<div className='text-red-500 '>{errors.senha.message}</div>)}
              </div>
            </div>
            <div className='flex justify-center'>
                <Button variant="outline"className="transition duration-300 ease-in-out bg-blue-800 hover:bg-blue-400 text-white rounded-xl  md:w-56 shadow-xl ">Editar</Button>
            </div>
            </form>
            <CardFooter className="flex justify-center items-center">
              <Dialog open = {isOpen}>
                <DialogTrigger asChild>
                </DialogTrigger>
                <DialogContent className="w-auto rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="mt-3 mb-4 text-center text-2xl">Confirmar alteração?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="flex justify-center items-center">
                    <div className="space-x-7">
                      <Button className="w-32 border  border-green-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-green-500 hover:text-white" type="button">Confirmar </Button>
                      <Button className="w-32 border border-red-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-red-500 hover:text-white" onClick={()=>setIsOpen(false)}  type="button"> Cancelar</Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
        </Card>
      </div>
    )
}
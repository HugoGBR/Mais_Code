"use client"
import Image from 'next/image'
import loginWallpaper from "@/public/icons/icon_perfil_preto.png"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const formulario = z.object({
  nome: z.string().min(10, 'Digite no mínimo 10 caracteres.').max(60, 'Digite o nome completo, máximo de 60 caracteres.'),
  cpf: z.string().min(14, 'O CPF deve conter 14 caracteres.'),
  email: z.string().email("Email inválido."),
  senha: z.string().min(5, 'Número mínimo de caracteres é 5.').max(10, "Atingiu o limite de caracteres.")
})

type formulario = z.infer<typeof formulario>



export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<formulario>({
    resolver: zodResolver(formulario)
  })

  function handleForm(dados: formulario) {
    route.push('https://en.wikipedia.org/wiki/Monkey')
    console.log(dados)
  }

  const route = useRouter();

  return (

      <div  className='flex justify-center items-center h-screen bg-gray-100'>
        <Card className='p-6 drop-shadow-xl rounded-xl'>
            <form onSubmit={handleSubmit(handleForm)}>
            <div>
              <h1 className='font-bold pb-5'>Usuário</h1>
            </div>
            <div className='rounded-2x1 flex justify-center'>
              <Image
              src = {loginWallpaper}
              alt = 'image'
              sizes = '40vw'
              style={
                {
                  width: '15%',
                  height: '15%'
                }
              }
              />
          </div>
              <div className='flex justify-center mb-10'>
                <p>Editar foto</p>
              </div>

            <div className='pb-16 grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className=''>
                <input type="text" placeholder='João da Silva'{...register('nome')} 
                className='focus:outline-none border border-t-0 border-l-0 border-r-0 border-b-gray-600 p-2 mt-1'/>
                {errors.nome && (<div className='text-red-500 font-semibold'>{errors.nome.message}</div>)}
              </div>

              <div>
                <input type='text' placeholder='999.999.999-99'{...register('cpf')} 
                className='focus:outline-none border border-t-0 border-l-0 border-r-0 border-b-gray-600  p-2 mt-1' />
                {errors.cpf && (<div className='text-red-500 font-semibold'>{errors.cpf.message}</div>)}
              </div>

              <div>
                <input type='email' placeholder='joão@gmail.com' {...register('email')} 
                className='focus:outline-none border border-t-0 border-l-0 border-r-0 border-b-gray-600  p-2 mt-1' />
                {errors.email && (<div className='text-red-500 font-semibold'>{errors.email.message}</div>)}
              </div>

              <div>
                <input type='password' placeholder='************' {...register('senha')} 
                className='focus:outline-none border border-t-0 border-l-0 border-r-0 border-b-gray-600  p-2 mt-1'  />
                {errors.senha && (<div className='text-red-500 font-semibold'>{errors.senha.message}</div>)}
              </div>
            </div>

            </form>
            <CardFooter className="flex justify-center items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline"className=" transition duration-300 ease-in-out bg-blue-800 hover:bg-blue-400 text-white rounded-xl  md:w-56 shadow-xl ">Editar</Button>
                </DialogTrigger>
                <DialogContent className="w-auto rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="mt-3 mb-4 text-center text-2xl">Confirmar alteração?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="flex justify-center items-center">
                    <div className="space-x-7">
                      <Button className="w-32 border  border-green-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-green-500 hover:text-white" type="button">Confirmar </Button>
                      <Button className="w-32 border border-red-500 text-black font-semibold bg-white transition duration-500 ease-in-out hover:bg-red-500 hover:text-white" type="button"> Cancelar</Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
        </Card>
      </div>
  )
}
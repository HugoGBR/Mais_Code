"use client";

import React, {useState, useEffect} from 'react';
import {Tabs, TabsContent, TabsList} from '@/components/ui/tabs';
import CardUsuario from '@/components/CardUsuario';
import {dadosUsuario} from "@/lib/interfaces/dadosUsuarios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { getAllUsers } from '@/lib/usuarioController';
import { getAllFinan } from '@/lib/Financeirocontroler';


export default function Gestao() {
    const [listaUsuarios, setListaUsuarios] = useState<dadosUsuario[]>([]);
    const [carregando, setCarregando] = useState(true);
    const router = useRouter();

    const rotaNewUser = () => {
        router.push('/routes/gestao/Usuario');
    }

    async function carregarUfinan() { 
        const usuario = await getAllFinan()     
        console.log(usuario)
        setListaUsuarios(usuario)
    }

    useEffect(() => {
        carregarUfinan();
    }, []);
    
    

    return (
        <div className="items-center py-10">
            {listaUsuarios
                    .map(item => (
                        <Link href={`/routes/gestao/users/${item.id}`} key={item.id}>
                            <div key={item.id} className='bg-gray-300 mb-4 rounded-lg'>
                                <a className="block">
                                    <CardUsuario dados={item}/>
                                </a>
                            </div>
                        </Link>
                    ))
                }
        </div>
    )
}

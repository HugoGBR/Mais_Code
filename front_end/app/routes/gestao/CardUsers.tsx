import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

// export default function CardUsers() {
//     const [user, setUser] = useState({
//         id: 0,
//         cargo_id: 0,
//         nome: "",
//         senha: "",
//         email: "",
//     });
//     const route = useRouter();

//     async function handleSubmit = async () => {
//         const response = await fetch("/api/users", {
//             method: "POST",
//             body: JSON.stringify(user)
//         });
//         const resultado = await response.json();
//         console.log(resultado);
//         route.replace("/routes/gestao");
//     };

<<<<<<< HEAD
export default function CadastrarUsuarioGestao() {
    const route = useRouter();
    const [camposPreenchidos, setCamposPreenchidos] = useState(false);


    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
        resolver: zodResolver(userSchema)
=======
// }
    
export default function cadastrarUsuarioGestao() {
    const [user, setUser] = useState({
         id: 0,
         cargo_id: 0,
         nome: "",
         senha: "",
         email: "",
>>>>>>> parent of 695c9b2 (Merge branch 'Produção')
    });

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const route = useRouter();
    
    async function handleSubmit() {
        await createNewUserGestao(nome,email,senha);
        route.push("/users")
    }


    return (
        <form onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
            <div className="flex justify-center items-center bg-gray-100">
            <Card className="p-10 drop-shadow-xl rounded-xl">
                <div className="h-12 mb-5">
                    <h1 className="font-bold text-2xl">Usuário</h1>
                </div>
                <div className="flex justify-center items-center opacity-40 mb-10">
                    <img src="/icons/icon-perfil-preto.png" className="w-28" alt="imagem" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="pb-16 grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="flex flex-col space-y-1.5">
                            <input type="text" className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500" id="nome" placeholder="Nome"
                            value={user.nome} onChange={(event) => setNome(event.target.value)}  />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="email"
                                className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500"
                                id="email" placeholder="Email" value={user.email} onChange={(event) => setEmail(event.target.value)} />
                                
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <input type="password"
                                className="border-b-2 focus:border-b-2
                            focus:outline-none focus:border-blue-500"
                                id="senha" placeholder="Senha" value={user.senha} onChange={(event) => setSenha(event.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5 w-full">
                            <Select>
                                <SelectTrigger className="h-7 mt-1 rounded-lg">
                                    <SelectValue placeholder="Selecione um Cargo"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={'0'}>Vendedor</SelectItem>
                                    <SelectItem value={'1'}>Financeiro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white hover:text-white font-bold py-2 px-4 rounded"
                            type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    </form>
        
    );
}

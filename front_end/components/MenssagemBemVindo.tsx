import { getCookie } from "@/lib/coockie";
import { useEffect, useState } from "react";


export default function MenssagemBemVindo() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        async function fetchUsername() {
            const user = await getCookie("UserName");
            setUsername(user || "Usuário");
        }
        fetchUsername();
    }, []);

    return (
        <div>
            <h1 className='text-2xl font-semibold lg:inline-block'>
                Bem Vindo, {username}
            </h1>
            <p className='min-[320px]:hidden max-[600px]:hidden lg:block'>
                Ficamos felizes em vê-lo novamente
            </p>
        </div>
    );
}

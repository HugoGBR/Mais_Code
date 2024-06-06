import {z} from "zod";

export const loginSchema = z.object({
    user: z.string().min(1, "Campo Obrigatório"),
    password: z.string().min(1, "Campo Obrigatório"),
    nome: z.string().min(1, "Campo Obrigatório"),
    email: z.string().min(1, "Campo Obrigatório"),
    cargo: z.string().min(1, "Campo Obrigatório")
});
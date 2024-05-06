import {z} from "zod";

export const loginSchema = z.object({
    user: z.string().min(1, "Campo Obrigatório"),
    password: z.string().min(1, "Campo Obrigatório")
});
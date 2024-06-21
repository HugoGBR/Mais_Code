import { z } from "zod";

export const clientSchema = z.object({
    telefone: z.string().min(1, "Campo Obrigatório"),
    nome: z.string().min(1, "Campo Obrigatório"),
    email: z.string().min(1, "Campo Obrigatório"),
    cpf_cnpj: z.string().min(1, "Campo Obrigatório")
});

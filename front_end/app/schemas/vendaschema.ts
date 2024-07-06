import { z } from "zod";

export const vendaSchema = z.object({
    new_cliente_id: z.string().min(1, "Campo Obrigatório"),
    new_tipo_contrato_id: z.string().min(1, "Campo Obrigatório"),
    new_produto_id: z.string().min(1, "Campo Obrigatório"),
    new_usuario_id: z.string().min(1, "Campo Obrigatório"),
    statusClienteValor: z.string().min(1, "Campo Obrigatório"),
    datadofim: z.string().min(1, "Campo Obrigatório"),
    valor_entrada: z.string().min(1, "Campo Obrigatório"),
    valor_total: z.string().min(1, "Campo Obrigatório"),
    datadoinicio: z.string().min(1, "Campo Obrigatório"),
    metodo_pagamento: z.string().min(1, "Campo Obrigatório"),
    email: z.string().min(1, "Campo Obrigatório"),
    telefone: z.string().min(1, "Campo Obrigatório"),
    nome_contato: z.string().min(1, "Campo Obrigatório"),
    numero_parcelo: z.string().min(1, "Campo Obrigatório"),
    status_venda: z.string().min(1, "Campo Obrigatório"),
});

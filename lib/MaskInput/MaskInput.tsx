export const insertMaskCpf = (cpf: string) => {
    // Remove caracteres não numéricos
    const numericCpf = cpf.replace(/\D/g, '');

    // Aplica a máscara de CPF
    const maskedCpf = numericCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return maskedCpf;
};

export const insertMaskTelefone = (telefone: string) => {
    // Remove caracteres não numéricos
    const numericTelefone = telefone.replace(/\D/g, '');

    // Aplica a máscara de telefone
    const maskedTelefone = numericTelefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return maskedTelefone;
};

export const insertMaskValorMonetario = (valor: string) => {
    // Remove caracteres não numéricos
    const numericValor = valor.replace(/\D/g, '');

    // Formata o valor monetário
    const formattedValor = Number(numericValor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });

    return formattedValor;
};

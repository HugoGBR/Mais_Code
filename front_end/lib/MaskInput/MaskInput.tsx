export const insertMaskCpfCnpj = (value: string) => {
    let numericValue = value.replace(/\D/g, '');


    numericValue = numericValue.slice(0, 14);

    if (numericValue.length <= 11) {
        // Aplica a máscara de CPF (11 dígitos)
        return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
        // Aplica a máscara de CNPJ (12 a 14 dígitos)
        return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
};

export const insertMaskTelefone = (telefone: string) => {
    // Remove caracteres não numéricos e limita a 11 dígitos
    let numericTelefone = telefone.replace(/\D/g, '').slice(0, 11);

    // Aplica a máscara de telefone
    const maskedTelefone = numericTelefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return maskedTelefone;
};
export const insertMaskValorMonetario = (valor: string) => {
    // Remove todos os caracteres que não são números
    let numericValor = valor.replace(/\D/g, '');

    // Adiciona as casas decimais (mantendo 2 casas decimais)
    numericValor = (parseInt(numericValor) / 100).toFixed(2);

    // Substitui o ponto por vírgula para o formato brasileiro
    numericValor = numericValor.replace('.', ',');

    // Formata o valor como moeda BRL
    const formattedValor = numericValor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${formattedValor}`;
};
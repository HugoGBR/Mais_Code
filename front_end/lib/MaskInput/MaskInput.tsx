export const insertMaskCpfCnpj = (value: string) => {
    let numericValue = value.replace(/\D/g, '');


    numericValue = numericValue.slice(0, 14);

    if (numericValue.length <= 11) {
        return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
        return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
};

export const insertMaskTelefone = (telefone: string) => {
    let numericTelefone = telefone.replace(/\D/g, '').slice(0, 11);

    const maskedTelefone = numericTelefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return maskedTelefone;
};
export const insertMaskValorMonetarioSemVirgula = (valor: string) => {
    // Remove caracteres não numéricos
    let numericValor = valor.replace(/\D/g, '').slice(0, 15);

    // Se a entrada estiver vazia, retorne uma string vazia
    if (numericValor === '') {
        return '';
    }

    // Garante que o valor tenha pelo menos dois dígitos para os centavos
    let valorComCentavos = numericValor.padStart(3, '0');
    
    // Divide o valor em reais e centavos
    const reais = valorComCentavos.slice(0, -2);
    const centavos = valorComCentavos.slice(-2);

    // Formata o valor com separador de milhar
    const formattedReais = Number(reais).toLocaleString('pt-BR');

    // Combina os reais com os centavos
    return `${formattedReais}.${centavos}`;
};

export const removerMascaraValorMonetario = (valor: string) => {
    // Remove caracteres não numéricos e o ponto decimal
    let numericValor = valor.replace(/[^\d]/g, '');

    // Se a entrada estiver vazia, retorne 0
    if (numericValor === '') {
        return 0;
    }

    // Converte o valor numérico em string para um número
    const valorNumerico = parseFloat(numericValor.slice(0, -2) + '.' + numericValor.slice(-2));

    return valorNumerico || 0; // Retorna 0 se não for um número válido
};





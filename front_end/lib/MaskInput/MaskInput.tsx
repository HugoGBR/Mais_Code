export const insertMaskCpfCnpj = (value: string) => {
    let numericValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Limitar o número de caracteres a 14 (tamanho máximo de um CNPJ)
    numericValue = numericValue.slice(0, 14);

    // Se tiver 11 ou menos caracteres, formata como CPF
    if (numericValue.length <= 11) {
        // Aplica a máscara CPF somente quando houver 11 caracteres
        if (numericValue.length <= 3) {
            return numericValue; // Sem máscara até 3 caracteres
        } else if (numericValue.length <= 6) {
            return numericValue.replace(/(\d{3})(\d{1,3})/, '$1.$2'); // 3 primeiros + 3 caracteres
        } else if (numericValue.length <= 9) {
            return numericValue.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3'); // 3 + 3 + 3
        } else {
            return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // CPF completo
        }
    } else {
        // Se tiver mais de 11 caracteres, formata como CNPJ
        // Aplica a máscara CNPJ somente quando houver mais de 11 caracteres
        if (numericValue.length <= 4) {
            return numericValue; // Sem máscara até 4 caracteres
        } else if (numericValue.length <= 7) {
            return numericValue.replace(/(\d{2})(\d{1,3})/, '$1.$2'); // 2 primeiros + 3 caracteres
        } else if (numericValue.length <= 11) {
            return numericValue.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3'); // 2 + 3 + 3
        } else if (numericValue.length <= 12) {
            return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3/$4'); // 2 + 3 + 3 + 1
        } else {
            return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'); // CNPJ completo
        }
    }
};


export const insertMaskTelefone = (telefone: string) => {
    let numericTelefone = telefone.replace(/\D/g, '').slice(0, 11);

    const maskedTelefone = numericTelefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return maskedTelefone;
};
export const insertMaskValorMonetarioSemVirgula = (valor: string) => {

    let numericValor = valor.replace(/\D/g, '').slice(0, 15);


    if (numericValor === '') {
        return '';
    }


    let valorComCentavos = numericValor.padStart(3, '0');
    
    const reais = valorComCentavos.slice(0, -2);
    const centavos = valorComCentavos.slice(-2);


    const formattedReais = Number(reais).toLocaleString('pt-BR');


    return `${formattedReais}.${centavos}`;
};

export const removerMascaraValorMonetario = (valor: string) => {

    let numericValor = valor.replace(/[^\d]/g, '');


    if (numericValor === '') {
        return 0;
    }


    const valorNumerico = parseFloat(numericValor.slice(0, -2) + '.' + numericValor.slice(-2));

    return valorNumerico || 0;
};





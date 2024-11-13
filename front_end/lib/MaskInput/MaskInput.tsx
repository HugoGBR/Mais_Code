export const insertMaskCpfCnpj = (value: string) => {
    let numericValue = value.replace(/\D/g, '');
    numericValue = numericValue.slice(0, 14);

    if (numericValue.length <= 11) {
        if (numericValue.length <= 3) {
            return numericValue; 
        } else if (numericValue.length <= 6) {
            return numericValue.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        } else if (numericValue.length <= 9) {
            return numericValue.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        } else {
            return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
    } else {
        if (numericValue.length <= 4) {
            return numericValue;
        } else if (numericValue.length <= 7) {
            return numericValue.replace(/(\d{2})(\d{1,3})/, '$1.$2');
        } else if (numericValue.length <= 11) {
            return numericValue.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
        } else if (numericValue.length <= 12) {
            return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3/$4');
        } else {
            return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
    }
};

export const insertMaskTelefone = (telefone: string) => {
    let numericTelefone = telefone.replace(/\D/g, '').slice(0, 11);
    const maskedTelefone = numericTelefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return maskedTelefone;
};

export const moneyMask = (valor: string) => {
    valor = valor.replace('.', '').replace(',', '').replace(/\D/g, '')

    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(
        parseFloat(valor) / 100
    )

    return result;
}

export const removerMascaraValorMonetario = (valor: string) => {
    let numericValor = valor.replace(/[^\d]/g, '');

    if (numericValor === '') {
        return 0;
    }
    const valorNumerico = parseFloat(numericValor.slice(0, -2) + '.' + numericValor.slice(-2));

    return valorNumerico || 0;
};





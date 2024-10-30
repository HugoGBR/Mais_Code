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





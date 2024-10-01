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
export const insertMaskValorMonetario = (valor: string) => {
    let numericValor = valor.replace(/\D/g, '');

    numericValor = (parseInt(numericValor) / 100).toFixed(2);

    numericValor = numericValor.replace('.', ',');

    const formattedValor = numericValor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${formattedValor}`;
};
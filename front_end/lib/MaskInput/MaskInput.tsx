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
    let numericValor = valor.replace(/\D/g, '');

    // Se a entrada estiver vazia, retorne uma string vazia
    if (numericValor === '') {
        return '';
    }

    // Converte para um número e divide por 100 para formatar como decimal
    const valorNumerico = parseFloat(numericValor) / 100;

    // Verifica se o valor é maior que um determinado limite, se necessário
    if (valorNumerico > 1000000) { // exemplo de limite, ajuste conforme necessário
        return 'Valor muito alto';
    }

    // Formata o número para adicionar separador de milhar
    const formattedValor = valorNumerico.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).replace(',', '.');

    return `${formattedValor}`;
};



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
    if (!valor) return "0,00";

    valor = valor.replace(/\D/g, "");

    while (valor.length < 3) {
        valor = "0" + valor;
    }

    const parteInteira = valor.slice(0, -2);
    const parteDecimal = valor.slice(-2);
    return `${parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${parteDecimal}`;
}

export const entradaMask = (valor: string): string => {
    if (!valor) return "0,00";

    let valorNumerico = valor.replace(/\D/g, "");

    valorNumerico = valorNumerico.replace(/^0+/, "") || "0";

    valorNumerico = valorNumerico.padStart(3, "0");

    const parteInteira = valorNumerico.slice(0, -2);
    const parteDecimal = valorNumerico.slice(-2);

    const parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${parteInteiraFormatada},${parteDecimal}`;
};




export const percentageMask = (valor: string): string => {
    if (!valor) return "0,00";

    let valorNumerico = valor.replace(/\D/g, "");

    valorNumerico = valorNumerico.replace(/^0+/, "") || "0";

    valorNumerico = valorNumerico.padStart(3, "0");

    const parteInteira = valorNumerico.slice(0, -2);
    const parteDecimal = valorNumerico.slice(-2);

    const parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${parteInteiraFormatada},${parteDecimal}%`;
};



export const removerMascaraValorMonetario = (valor: string) => {
    let numericValor = valor.replace(/[^\d]/g, '');
    if (numericValor === '') {
        return 0;
    }
    const valorNumerico = parseFloat(numericValor.slice(0, -2) + '.' + numericValor.slice(-2));

    return valorNumerico || 0;
};

export const removerMascaraPorcentagem = (valor: string): number => {
    if (!valor) return 0;

    const numericValor = valor.replace(/[^\d]/g, '');

    if (!numericValor) return 0;

    const valorNumerico = Number(numericValor.slice(0, -2) + '.' + numericValor.slice(-2));
    return valorNumerico;
};





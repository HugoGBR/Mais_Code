import React, { useState } from 'react';

const descricaoLimiteCaracteres = 255;

const LimitadordeCaracteres = (event) => {
    const descricao = event.target.value;
    // Verifica se a descrição excede o limite de caracteres
    if (descricao.length <= descricaoLimiteCaracteres) {
        setDescricaoProduto(descricao);
    }
};

const CaracterLimit = () => {
    const [descricaoProduto, setDescricaoProduto] = useState('');

    return (
        <div>
            <textarea
                className="justify-end border border-gray-300 p-2"
                value={descricaoProduto}
                onChange={(event) => LimitadordeCaracteres(event)}
                placeholder={`Limite de ${descricaoLimiteCaracteres} caracteres`}
                rows={4}
            />
            <p>Caracteres restantes: {descricaoLimiteCaracteres - descricaoProduto.length}</p>
        </div>
    );
};

export default CaracterLimit;

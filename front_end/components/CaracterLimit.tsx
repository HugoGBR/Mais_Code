import { useState } from 'react';

const descricaoLimiteCaracteres = 255;

const CaracterLimit = () => {
    const [descricaoProduto, setDescricaoProduto] = useState<string>('');

    const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const descricao = event.target.value;
        if (descricao.length <= descricaoLimiteCaracteres) {
            setDescricaoProduto(descricao);
        }
    };

    return (
        <div>
            <textarea
                id="descricaoProduto"
                name="descricaoProduto"
                value={descricaoProduto}
                onChange={handleDescricaoChange}
                placeholder="Descrição do Produto"
                rows={4}
                maxLength={descricaoLimiteCaracteres}
                className="shadow-inner-2 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
            <div className="flex justify-end">
                <p className="text-sm text-gray-500">{descricaoProduto.length}/{descricaoLimiteCaracteres}</p>
            </div>
        </div>
    );
};

export default CaracterLimit;

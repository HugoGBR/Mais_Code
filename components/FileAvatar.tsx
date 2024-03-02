import {Component} from "react";
import React from "react";

class Button extends Component<{ onClick: any, children: any }> {
    render() {
        let {onClick, children} = this.props;
        return (
            <button onClick={onClick}>
                {children}
            </button>
        );
    }
}

export default function FileAvatar() {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Aqui você pode fazer algo com o arquivo selecionado
            console.log('Arquivo selecionado:', file.name);
        } else {
            console.log('Nenhum arquivo selecionado.');
        }
    };

    const handleButtonClick = () => {
        // Aciona o clique no input file
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <div className='flex flex-col items-center opacity-80'>
            <Button onClick={handleButtonClick}>
                <img src={'/icons/icon-perfil-preto.png'} className="w-20 mb-2" alt="Avatar"/>
                <input className="hidden" id="fileInput" type="file" onChange={handleFileChange}/>
            </Button>
        </div>
    );
}

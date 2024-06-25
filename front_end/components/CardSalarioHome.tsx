import React from "react";

export default function CardSalarioHome() {


    return(
        <div>
            <div className=''>
                <h1 className='text-2xl font-semibold min-[320px]:hidden max-[600px]:hidden lg:inline-block'>Bem
                    Vindo, Calebe</h1>
                <p className='min-[320px]:hidden max-[600px]:hidden lg:block'>Ficamos felizes em vê-lo novamente</p>
            </div>

            <div className='rounded-xl bg-white drop-shadow-xl p-2 col-span-2'>
                <h3 className='text-center text-lg'>Remuneraçao</h3>
                <h1 className='text-4xl text-center font-bold  '>R$5000,00</h1>
            </div>
        </div>
    )
}
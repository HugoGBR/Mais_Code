import React from 'react';
import CadastroLink from './CompCadastro';
import RelatorioHome from '@/components/relatorioHome';

const HomePage = () => {
    return (
        <div className="bg-gray-100  w-11/12 -mt-5">
            <div className='h-48 w-auto -mb-3'>
                <h1 className='text-2xl font-semibold min-[320px]:hidden max-[600px]:hidden lg:inline-block'>Bem Vindo, Calebe</h1>
                <p className='min-[320px]:hidden max-[600px]:hidden lg:block'>Ficamos felizes em vê-lo novamente</p>
                <div className='rounded-xl float-right bg-white drop-shadow-xl h-24 justify-center items-center'>
                    <h3 className='mt-3 ml-10 mr-10 text-lg'>Remuneraçao</h3>
                    <h1 className='text-4xl font-bold ml-10 mr-10 '>R$5000,00</h1>
                </div>
            </div>

            <div className='h-auto gap-2 w-full flex flex-col lg:flex lg:flex-row'>
                <div className='h-auto w-full md:w-2/5 bg-white drop-shadow-xl grid grid-cols-1 items-center rounded-xl'>
                    <div className=''>
                        <p className='underline text-lg lg:text-6xl ml-20 font-bold text-yellow-500'>#1 Gustavo</p>
                    </div>
                    <div className=''>
                        <h2 className='underline ml-20 text-lg lg:text-5xl font-bold text-gray-400'>#2 João</h2>
                    </div>
                    <div className=''>
                        <h3 className='underline ml-20 text-lg lg:text-4xl font-bold text-amber-700'>#3 Hugo</h3>
                    </div>
                </div>
                                                
                <div className='bg-white drop-shadow-xl text-center w-full overflow-y-auto md:w-3/5 pt-5 h-auto rounded-xl'>
                    <h1 className='flex justify-center'>Últimas Vendas</h1>
                        <div className='max-h-72'>
                        <RelatorioHome/> 
                        </div>                    
                     
                </div>
            </div>

            <div className='min-[320px]:hidden max-[600px]:hidden lg:inline-block'>
                <CadastroLink/>   
            </div>
            

        </div>
    );
};

export default HomePage;
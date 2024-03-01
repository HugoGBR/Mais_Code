// Adicione esta diretiva no topo para sinalizar que este é um componente do cliente
"use client";

import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card'; // Ajuste os imports conforme sua estrutura de projeto
import { Label } from '@/components/ui/label'; // Ajuste os imports conforme sua estrutura de projeto
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';

export default function Gestao(){
  const Lista = [{

    nome: "Maria",
    telefone: "6799999999",
    tipo_Pessoa:"Pessoa Fisica",
    tipo_Cadastro: 1
  },
  
  {
    nome: "Gustavo",
    telefone: "67888888888",
    tipo_Pessoa: "Pessoa Juridica",
    tipo_Cadastro: 2 
  },

  {
    nome: "Calebe",
    telefone: "67777777777",
    tipo_Pessoa: "Pessoa Fisica",
    tipo_Cadastro: 3 
  }, 

  {
    nome: "Rosa",
    telefone: "674444444444",
    tipo_Pessoa: "Pessoa Juridica",
    tipo_Cadastro: 2 
  }, 

  {
    nome: "Emilly",
    telefone: "67555555555",
    tipo_Pessoa: "Pessoa Fisica",
    tipo_Cadastro: 1 
  },

  {
    nome: "Julia",
    telefone: "67333333333333",
    tipo_Pessoa: "Pessoa Juridica",
    tipo_Cadastro: 2 
  },

  {
    nome: "Cris",
    telefone: "67111111111111",
    tipo_Pessoa: "Pessoa Fisica",
    tipo_Cadastro: 3
  },

  {
    nome: "Rafa",
    telefone: "679999999",
    tipo_Pessoa: "Pessoa Juridica",
    tipo_Cadastro: 3
  }
  ];

  return(
    <div className="items-center py-10">
    <Tabs defaultValue='Cliente'>
    <TabsList className='gap-5 w-full'>
      <TabsTrigger value="Cliente">Cliente</TabsTrigger>
      <TabsTrigger value="Vendedor">Vendedor</TabsTrigger>
      <TabsTrigger value="Financeiro">Financeiro</TabsTrigger>
    </TabsList>

      <TabsContent value='Cliente' className='grid grid-cols-2 gap-5'>
      {Lista.map((item) => (
        <button className=''>  
          <Card className="w-[250px]">
              <CardContent>
                <div className="flex items-center">
                  <img src="/icons/icon_perfil_preto.png" alt="Perfil" className="w-12 h-12 rounded-2xl" />
                  {/* onClick */}
                  <div  className="ml-4">
                  <Label htmlFor="nome">{item.nome}</Label>
                  <Label htmlFor="e-mail" className="block">{item.telefone}</Label>
                  <Label htmlFor="tipo de cadastro" className="text-sky-800 text-xs">{item.tipo_Pessoa}</Label>
                </div>
                  
                </div>
              </CardContent>
            </Card>
        </button>
        
          ))} 


      </TabsContent>
    <TabsContent value='Vendedor'>Vendedor</TabsContent>
    <TabsContent value='Financeiro'>Financeiro</TabsContent>
      
    </Tabs>
    
  </div>
  )
}







// interface TabProps {
//   label: string;
//   children: ReactNode;
// }

// interface TabsProps {
//   children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
// }

// const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>;

// const Tabs: React.FC<TabsProps> = ({ children }) => {
//   const childrenArray = React.Children.toArray(children) as React.ReactElement<TabProps>[];
//   const [activeTab, setActiveTab] = React.useState(childrenArray[0].props.label);

 

//   return (
//     <>
//       <div className="tabs-container flex justify-center mt-4">
//         <ul className="flex gap-4">
//           {childrenArray.map((tab, index) => (
//             <li
//               key={index}
//               className={`cursor-pointer ${activeTab === tab.props.label ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
//               onClick={() => setActiveTab(tab.props.label)}
//             >
//               {tab.props.label}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="tab-content mt-4">
//         {childrenArray.map((child) => child.props.label === activeTab ? child : null)}
//       </div>
//     </>
//   );
// };



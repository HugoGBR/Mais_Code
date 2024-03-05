import * as React from "react";
import Image from "next/image";

import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";


export default function CardWithForm() {

  return (
  <div className="flex justify-center items-center h-screen">
    <button>
    <div className="grid grid-cols-2 w-[220px] h-[75px] border rounded-lg">
      <div className="flex ml-5 items-center">
        <img src="/icons/icon_perfil_preto.png" alt="" className="w-12"/>
      </div>

      <div className="grid grid-rows-3 ">
        <div>
          <span className="font-semibold">Gustavo</span>
        </div>
        <div>
          <span className="text-xs">Calebe@gmail.com</span>
        </div>
        <div>
          <span className="text-blue-700 font-semibold">Admnistrador</span>
        </div>
      </div>
    </div>
    </button>
    </div>
    // <div className="flex justify-center items-center h-screen">
    // <button>
    //   <Card className="flex w-[230px] h-[75px] p-1 mr-[-2px]">
    //     <CardContent>
    //       <div className="flex items-center">
    //         <div>
    //           <Image
    //             src="/icons/icon_perfil_preto.png"
    //             alt="Imagem"
    //             width={70}
    //             height={70} 
    //             className="rounded-2xl ml-[-19px]"
    //           />
    //         </div>
    //         <div>
    //             <Label htmlFor="nome" className="flex  ml-[-3px]">
    //              <p>GUSTAVO</p> 
    //             </Label>
    //             <Label htmlFor="e-mail" className=" block text-xs ml-[-1px]  ">
    //              <p> teste@gmail.com</p> 
    //             </Label>
    //             <Label
    //               htmlFor="tipo-de-cadastro"
    //               className=" flex text-xs text-sky-800 ml-[-4,5px] "
    //             >
    //               <p>VENDEDOR</p>
    //             </Label>
    //           </div>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </button>
    // </div>
  );
}
// 'use client'
// import { ScrollArea } from "@/components/ui/scroll-area"
// import Link from "next/link";
// import * as React from "react";
// import {RiCloseCircleLine} from "react-icons/ri";
// import {PiPlusCircleBold} from "react-icons/pi";


// export default function ListaTipoContrato() {
//     const invoices = [
//         {
//             name: "INV001",
//         },
//         {
//             name: "INV002",
//         },
//         {
//             name: "INV003",
//         },
//         {
//             name: "INV004",
//         },
//         {
//             name: "INV005",
//         },
//         {
//             name: "INV006",
//         },
//         {
//             name: "INV007",
//         },
//     ]
//     return (
//         <div className="flex w-full shadow-lg bg-white rounded-xl p-5">
//             <div className="w-full space-y-4">
//                 <div className="flex justify-between items-center h-auto">
//                     <h1 className="font-bold">Contratos</h1>
//                     <div className="flex space-x-2">
//                         <Link href="">
//                             <RiCloseCircleLine size={25} color="red"/>
//                         </Link>
//                         <Link href={'/routes/ajustes/Produtos'}>
//                             <PiPlusCircleBold size={25} color="#0762C8"/>
//                         </Link>
//                     </div>
//                 </div>

//                 <div>
//                     <div>
//                         <h1 className="text-center font-semibold">Modelo de Contrato</h1>
//                     </div>
//                     <table className="w-full">
//                         <ScrollArea className="h-[150px] w-auto rounded-xl border-b-2">
//                             <tbody className="font-medium [&>tr]:last:border-b-0">
//                             {invoices.map((item) =>
//                                 <tr key={item.name}>
//                                     <Link
//                                         className="flex border bg-muted/50 hover:bg-[#0762C8] hover:text-white rounded-xl"
//                                         href={'/routes/ajustes/Produtos'}>
//                                         <td className="w-full p-1.5 text-center rounded-lg">{item.name}</td>
//                                     </Link>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </ScrollArea>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client";
import iam from "../public/icons"
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Home() {
  const Route = useRouter();

  return (
    <>
    
        <div className="bg-gray-400 rounded-full p-10 md:w-3 lg:w-2 xl:w-1/3">
         
  </div>


       
    <div className="mb:flex md:w-1/2 block ">
        <Image
              className="rounded-2xl "
              src={iam}
              alt="Imagem"
              sizes="60vw"
              style={
                {
                  width: "100%",
                  height: "100%"
                }
              }
            />
          </div>

      
    </>
  );
}
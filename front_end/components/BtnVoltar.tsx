"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";


export default function BtnVoltar() {
    const router = useRouter()

    const handlevoltarClick = () =>
    {
        router.back();
    };

    return (
        <div className="">
            <button onClick={handlevoltarClick} className="flex items-center space-x-2">
                <IoArrowBackCircleOutline size={36} color="blue" />
                <h1 className="font-semibold text-2xl">Voltar</h1>
            </button>
        </div>
    );
}

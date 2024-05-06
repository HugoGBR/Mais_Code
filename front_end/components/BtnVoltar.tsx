import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Link from "next/link";

export default function BtnVoltar() {
    const handleVoltar = () => {
        window.history.back();
    };

    return (
        <div className="">
            <Link href="" className="flex items-center space-x-2">
                <IoArrowBackCircleOutline size={36} color="blue" />
                <h1 className="font-semibold text-2xl">Voltar</h1>
            </Link>
        </div>
    );
}

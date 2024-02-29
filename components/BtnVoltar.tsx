import {IoArrowBackCircleOutline} from "react-icons/io5";
import * as React from "react";
import {Button} from "@/components/ui/button";


export default function BtnVoltar() {

    return (
        <>
            <div>
                <Button onClick={() => window.history.back()} className="flex items-center space-x-2">
                    <IoArrowBackCircleOutline size={36} color="blue"/>
                    <h1 className="font-semibold text-2xl">Voltar</h1>
                </Button>
            </div>

        </>
    )
}

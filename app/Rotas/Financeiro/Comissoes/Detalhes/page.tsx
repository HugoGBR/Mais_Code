'use client'
import { Grid } from "lucide-react"
import React from "react"

export default function Detalhescomissao(){
    return(
        <div className="grid grid-cols-2">
            <h1>
                Detalhes contrato
            </h1> 
                
            <div>
                teste
            </div>
            <div className="grid grid-cols-3">
                <div>
                    <h1>01</h1>
                    <input className="border-b-4 " type="text" />
                </div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            
        </div>
        )
}
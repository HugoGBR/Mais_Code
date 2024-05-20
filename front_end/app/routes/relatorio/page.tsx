"use client"
import {RelatorioComissaoController} from "@/lib/relatorioComissaoController";
// import * as React from "react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {Payment, columns} from "./Table/columns";
import {DataTable} from "./Table/data-table";


async function getData(): Promise<Payment[]> {
    const response = await fetch('http://localhost/Mais_Code/Backend/api/service/relatorioComissao.php?acao=gerarRelatorioComissao');
    const data = await response.json();
    return data.map((item: any) => ({
        id: item.tipo_contrato_id.toString(),
        contrato: item.tipo_contrato_id,
        data: item.inicio_contrato,
        cliente: item.nome_cliente,
        tipo: item.status,
        parcelas: item.parcela_id,
        valor: item.valor_total,
        comissao: item.porcentagem,
    }));
}

export default function Relatorio() {
    
    const [data, setData] = useState<Payment[]>([]);
    const rota = useRouter();

    const fetchData = async () => {
    const result = await getData();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-5">
        {data.map((item, index) => (
          <div className="flex gap-5 space-y-2" key={index}>
            <h2>Contrato: {item.contrato}</h2>
            <p>Data: {item.data}</p>
            <p>Cliente: {item.cliente}</p>
            <p>Tipo: {item.tipo}</p>
            <p>Parcelas: {item.parcelas}</p>
            <p>Valor: {item.valor}</p>
            <p>Comissão: {item.comissao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
  
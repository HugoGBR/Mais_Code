"use client";
import * as React from "react";
import { Payment, columns } from "./Table/columns";
import { DataTable } from "./Table/data-table";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/RelatorioController";
import AuthGuard from "@/components/ValidarTela";

export default function Relatorio() {
  const [data, setData] = useState<Payment[]>([]);

  const getDados = async () => {
    const Dados = await fetchData();
    setData(Dados);
  };
  useEffect(() => {
    getDados();
  }, []);

  return (
    <AuthGuard>
      
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </AuthGuard>
  );
}

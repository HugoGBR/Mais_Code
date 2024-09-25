"use client";
import React from "react";
import CadastroProduto from "@/components/Produtos";
import AuthGuard from "@/components/ValidarTela";

export default function Cadastro_Produto() {
  return (
    <AuthGuard>
      <CadastroProduto />
    </AuthGuard>
  );
}

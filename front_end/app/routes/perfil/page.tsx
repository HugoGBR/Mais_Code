"use client";
import React from "react";
import Perfil from "@/app/routes/perfil/EditPerfil";
import AuthGuard from "@/components/ValidarTela";

export default function Editar() {
  return (
    <div>
      <AuthGuard>
        <Perfil />
      </AuthGuard>
    </div>
  );
}

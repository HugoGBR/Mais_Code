"use client";

import CardUsers from "@/app/routes/gestao/CardUsers";
import AuthGuard from "@/components/ValidarTela";

export default function Users() {
  return (
    <div>
      <AuthGuard>
        <CardUsers />
      </AuthGuard>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import loginWallpaper from "@/public/download.png"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



interface DataItem {
  id: number;
  date: string;
  salesmanType: string;
  salesman: string;
  customer: string;
  value: number;
  status: string;
}

const data: DataItem[] = [
  // Seus dados reais aqui
  {
    id: 1,
    date: "13/08/2023",
    salesmanType: "Novo",
    salesman: "Vendedor 1",
    customer: "Gustavo",
    value: 100000.0,
    status: "Inativo",
  },
  {
    id: 2,
    date: "13/08/2023",
    salesmanType: "Novo",
    salesman: "Vendedor 1",
    customer: "Gustavo",
    value: 100000.0,
    status: "Inativo",
  },

  {
    id: 3,
    date: "13/08/2023",
    salesmanType: "Novo",
    salesman: "Vendedor 1",
    customer: "Gustavo",
    value: 100000.0,
    status: "Concluido",
  },

  {
    id: 4,
    date: "13/08/2023",
    salesmanType: "Novo",
    salesman: "Vendedor 1",
    customer: "Gustavo",
    value: 100000.0,
    status: "Inativo",
  },

  {
    id: 5,
    date: "13/08/2023",
    salesmanType: "Novo",
    salesman: "Vendedor 1",
    customer: "Gustavo",
    value: 100000.0,
    status: "Inativo",
  },

  {
    id: 6,
    date: "13/08/2023",
    salesmanType: "Novo",
    salesman: "Vendedor 1",
    customer: "Gustavo",
    value: 100000.0,
    status: "Ativo",
  },
  // ... Mais dados
];



const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Inativo":
      return "bg-red-500";
      case "Ativo":
        return "bg-green-500";
      case "Concluido":
        return "bg-purple-500";   
    
    
  }
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded-lg text-white text-sm font-semibold ${getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

const TableRow: React.FC<{ row: DataItem }> = ({ row }) => {
  return (
    <tr>
      <td className="border px-4 py-2">{row.id}</td>
      <td className="border px-4 py-2">{row.date}</td>
      <td className="border px-4 py-2">{row.salesmanType}</td>
      <td className="border px-4 py-2">{row.salesman}</td>
      <td className="border px-4 py-2">{row.customer}</td>
      <td className="border px-4 py-2">{formatCurrency(row.value)}</td>
      <td className="border px-4 py-2">
        <StatusBadge status={row.status} />
      </td>
    </tr>
  );
};

const HomePage: React.FC = () => {
  return (


    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >

      <Card className=" shadow-2xl">
        <CardHeader>
          <CardTitle></CardTitle>

          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-center items-center ">
            <Image
              className="opacity-100"
              src={loginWallpaper}
              alt="Imagem"
              sizes="10vw"
              style={
                {
                  width: "3%",
                  height: "30%",
                  right: "50px"
                }
              }
            />
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">N. Contrato</th>
                <th className="px-4 py-2">Data</th>
                <th className="px-4 py-2">Cliente</th>
                <th className="px-4 py-2">Novo/Antigo</th>
                <th className="px-4 py-2">Vendedor</th>
                <th className="px-4 py-2">Valor</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <TableRow key={row.id} row={row} />
              ))}
            </tbody>
          </table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>


  );
};

export default HomePage;

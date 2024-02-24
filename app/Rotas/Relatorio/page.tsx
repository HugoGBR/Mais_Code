import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

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
    status: "Inativo",
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
    status: "Inativo",
  },
  // ... Mais dados
];

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Inativo":
    case "Condu":
    case "Conchada":
      return "bg-red-500";
    case "REVE":
    case "Alive":
    case "kativa":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
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
      <h1 style={{height: 500, position: "absolute", top: "100", left: "0", margin: "40px" }}>
        Relatório
      </h1>
      <Card style={{ margin: "0 auto" }}>
        <CardHeader>
          <CardTitle></CardTitle>

          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
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

import { FC } from "react";

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface DailyExpensesTableProps {
  dailyExpenses: Expense[];
}

export const DailyExpensesTable: FC<DailyExpensesTableProps> = ({ dailyExpenses }) => {
  // Función para formatear el monto en pesos argentinos
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Descripción</th>
          <th className="py-2 px-4 border-b">Categoría</th>
          <th className="py-2 px-4 border-b">Monto</th>
          <th className="py-2 px-4 border-b">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {dailyExpenses.map((expense) => (
          <tr key={expense.id}>
            <td className="py-2 px-4 border-b">{expense.description}</td>
            <td className="py-2 px-4 border-b">{expense.category}</td>
            <td className="py-2 px-4 border-b">{formatCurrency(expense.amount)}</td>
            <td className="py-2 px-4 border-b">{expense.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

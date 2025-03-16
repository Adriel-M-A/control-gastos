import { FC } from "react";
import { formatCurrency } from "../utils/formatCurrency";

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
  return (
    <table className="min-w-full rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">DESCRIPCIÓN</th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">CATEGORÍA</th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">MONTO</th>
          <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500">FECHA</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {dailyExpenses.map((expense) => (
          <tr key={expense.id} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm">{expense.description}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{expense.category}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{formatCurrency(expense.amount)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{expense.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

import { FC } from "react";

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  isChecked?: boolean;
}

interface MonthlyExpensesTableProps {
  monthlyExpenses: Expense[];
  onToggleExpense: (expense: Expense, checked: boolean) => void;
}

export const MonthlyExpensesTable: FC<MonthlyExpensesTableProps> = ({ monthlyExpenses, onToggleExpense }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Check</th>
          <th className="py-2 px-4 border-b">Descripción</th>
          <th className="py-2 px-4 border-b">Categoría</th>
          <th className="py-2 px-4 border-b">Monto</th>
          <th className="py-2 px-4 border-b">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {monthlyExpenses.map((expense) => (
          <tr key={expense.id}>
            <td className="py-2 px-4 border-b text-center">
              <input
                type="checkbox"
                checked={expense.isChecked || false}
                onChange={(e) => onToggleExpense(expense, e.target.checked)}
              />
            </td>
            <td className="py-2 px-4 border-b">{expense.description}</td>
            <td className="py-2 px-4 border-b">{expense.category}</td>
            <td className="py-2 px-4 border-b">${expense.amount}</td>
            <td className="py-2 px-4 border-b">{expense.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

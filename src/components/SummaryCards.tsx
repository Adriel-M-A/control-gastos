import { FC } from "react";
import { formatCurrency } from "../utils/formatCurrency";

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  isChecked?: boolean;
}

interface SummaryCardsProps {
  dailyExpenses: Expense[];
  monthlyExpenses: Expense[];
}

export const SummaryCards: FC<SummaryCardsProps> = ({ dailyExpenses, monthlyExpenses }) => {
  // Calcular el total gastado y el número de gastos diarios
  const totalGastado = dailyExpenses.reduce((total, expense) => total + expense.amount, 0);
  const totalGastosDiarios = dailyExpenses.length;

  // Calcular la suma y el número de gastos mensuales pendientes (no aplicados)
  const gastosMensualesPendientes = monthlyExpenses.reduce((total, expense) => {
    return expense.isChecked ? total : total + expense.amount;
  }, 0);
  const totalGastosMensualesPendientes = monthlyExpenses.filter((expense) => !expense.isChecked).length;

  // Calcular la categoría con mayor gasto
  const categoriaMayorGasto = dailyExpenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const [categoriaMayor, montoMayor] = Object.entries(categoriaMayorGasto).reduce(
    (acc, [categoria, monto]) => (monto > acc[1] ? [categoria, monto] : acc),
    ["", 0]
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Tarjeta Total Gastado */}
      <div className="flex-1 p-4 bg-white border rounded shadow">
        <h3 className="text-lg font-bold mb-2">Total Gastado</h3>
        <p className="text-2xl">{formatCurrency(totalGastado)}</p>
        <p className="text-sm text-gray-500">Gastos diarios registrados: {totalGastosDiarios}</p>
      </div>

      {/* Tarjeta Gastos Mensuales Pendientes */}
      <div className="flex-1 p-4 bg-white border rounded shadow">
        <h3 className="text-lg font-bold mb-2">Gastos Mensuales Pendientes</h3>
        <p className="text-2xl">{formatCurrency(gastosMensualesPendientes)}</p>
        <p className="text-sm text-gray-500">Gastos mensuales no aplicados: {totalGastosMensualesPendientes}</p>
      </div>

      {/* Tarjeta Categoría de Mayor Gasto */}
      <div className="flex-1 p-4 bg-white border rounded shadow">
        <h3 className="text-lg font-bold mb-2">Categoría de Mayor Gasto</h3>
        <p className="text-2xl">{formatCurrency(montoMayor)}</p>
        <p className="text-sm text-gray-500">Categoría: {categoriaMayor || "N/A"}</p>
      </div>
    </div>
  );
};

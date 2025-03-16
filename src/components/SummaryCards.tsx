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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Tarjeta Total Gastado */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900">Total Gastado</h3>
        <p className="text-3xl font-bold text-green-500">{formatCurrency(totalGastado)}</p>
        <p className="text-sm text-gray-500 mt-1">Gastos diarios registrados: {totalGastosDiarios}</p>
      </div>

      {/* Tarjeta Gastos Mensuales Pendientes */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900">Gastos Mensuales Pendientes</h3>
        <p className="text-3xl font-bold text-orange-500">{formatCurrency(gastosMensualesPendientes)}</p>
        <p className="text-sm text-gray-500 mt-1">Gastos mensuales no aplicados: {totalGastosMensualesPendientes}</p>
      </div>

      {/* Tarjeta Categoría de Mayor Gasto */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900">Categoría de Mayor Gasto</h3>
        <p className="text-3xl font-bold text-orange-600">{formatCurrency(montoMayor)}</p>
        <p className="text-sm text-gray-500 mt-1">Categoría: {categoriaMayor || "N/A"}</p>
      </div>
    </div>
  );
};

// Archivo: src/App.tsx
import { useState } from "react";
import { ExpenseForm } from "./components/ExpenseForm";
import { DailyExpensesTable } from "./components/DailyExpensesTable";
import { MonthlyExpensesTable } from "./components/MonthlyExpensesTable";
import { SummaryCards } from "./components/SummaryCards";

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  isChecked?: boolean; // Para gastos mensuales
}

const App = () => {
  // Estado para los gastos diarios
  const [dailyExpenses, setDailyExpenses] = useState<Expense[]>([
    { id: 100, description: "Almuerzo", category: "Comida", amount: 10, date: "2025-03-15" },
    { id: 101, description: "Café", category: "Bebidas", amount: 3, date: "2025-03-15" },
  ]);

  // Estado para los gastos mensuales
  const [monthlyExpenses, setMonthlyExpenses] = useState<Expense[]>([
    { id: 1, description: "Renta", category: "Vivienda", amount: 500, date: "2025-03-01", isChecked: false },
    {
      id: 2,
      description: "Suscripción a Netflix",
      category: "Entretenimiento",
      amount: 15,
      date: "2025-03-01",
      isChecked: false,
    },
  ]);

  // Función para agregar un gasto ingresado desde el formulario (al final de la lista)
  const addExpense = (expense: Expense) => {
    setDailyExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  // Maneja el cambio de estado (check/uncheck) de un gasto mensual
  const handleToggleMonthlyExpense = (expense: Expense, checked: boolean) => {
    // Actualizar el estado de gastos mensuales
    setMonthlyExpenses((prevExpenses) =>
      prevExpenses.map((exp) => (exp.id === expense.id ? { ...exp, isChecked: checked } : exp))
    );

    if (checked) {
      // Agregar el gasto a la tabla diaria solo si no existe ya
      setDailyExpenses((prevDaily) => {
        if (prevDaily.some((exp) => exp.id === expense.id)) return prevDaily;
        return [...prevDaily, expense];
      });
    } else {
      // Remover el gasto de la tabla diaria
      setDailyExpenses((prevDaily) => prevDaily.filter((exp) => exp.id !== expense.id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Control de Gastos</h1>

      {/* Sección de Tarjetas Resumen (ubicada al inicio) */}
      <SummaryCards dailyExpenses={dailyExpenses} monthlyExpenses={monthlyExpenses} />

      {/* Sección del Formulario */}
      <div className="mb-8">
        <ExpenseForm onAddExpense={addExpense} />
      </div>

      {/* Sección de Gastos Mensuales */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Gastos Mensuales</h2>
        <MonthlyExpensesTable monthlyExpenses={monthlyExpenses} onToggleExpense={handleToggleMonthlyExpense} />
      </div>

      {/* Sección de Gastos Diarios */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Gastos del Día</h2>
        <DailyExpensesTable dailyExpenses={dailyExpenses} />
      </div>
    </div>
  );
};

export default App;

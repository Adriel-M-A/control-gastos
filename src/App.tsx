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
    // Contenedor principal con fondo gris claro y altura mínima completa
    <div className="min-h-screen bg-gray-100">
      {/* Header con fondo blanco y sombra, siguiendo el estilo del ejemplo */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Control de Gastos</h1>
        </div>
      </header>

      {/* Contenedor principal para el contenido */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Sección de Tarjetas Resumen */}
        <div className="mb-8">
          <SummaryCards dailyExpenses={dailyExpenses} monthlyExpenses={monthlyExpenses} />
        </div>

        {/* Sección del Formulario */}
        <div className="mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <ExpenseForm onAddExpense={addExpense} />
          </div>
        </div>

        {/* Sección de Gastos Mensuales */}
        <div className="mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Gastos Mensuales</h2>
            <MonthlyExpensesTable monthlyExpenses={monthlyExpenses} onToggleExpense={handleToggleMonthlyExpense} />
          </div>
        </div>

        {/* Sección de Gastos Diarios */}
        <div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Gastos del Día</h2>
            <DailyExpensesTable dailyExpenses={dailyExpenses} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

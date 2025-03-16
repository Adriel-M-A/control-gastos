import { useState, FormEvent } from "react";

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

export const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  // Estados locales para cada campo del formulario
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState("");

  // Función que maneja el envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validación simple: se requiere llenar todos los campos
    if (!description || !category || !amount || !date) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Creación de un nuevo objeto gasto
    const newExpense: Expense = {
      id: Date.now(), // Usamos timestamp para generar un id único
      description,
      category,
      amount,
      date,
    };

    // Se invoca la función callback para agregar el gasto
    onAddExpense(newExpense);

    // Limpiar el formulario después de enviar
    setDescription("");
    setCategory("");
    setAmount(0);
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded flex items-center gap-4 w-full overflow-auto">
      {/* Campo Descripción */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium">Descripción</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 border rounded p-2"
        />
      </div>

      {/* Campo Categoría */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium">Categoría</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 border rounded p-2"
        />
      </div>

      {/* Campo Monto */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium">Monto</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 border rounded p-2"
        />
      </div>

      {/* Campo Fecha */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium">Fecha</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 border rounded p-2" />
      </div>

      {/* Botón de Envío */}
      <div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap">
          Agregar Gasto
        </button>
      </div>
    </form>
  );
};

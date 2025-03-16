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
  // Lista de categorías existentes
  const categories = ["Comida", "Transporte", "Entretenimiento", "Vivienda", "Otros"];

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
      id: Date.now(), // Genera un id único a partir del timestamp
      description,
      category,
      amount,
      date,
    };

    // Invocar la función callback para agregar el gasto
    onAddExpense(newExpense);

    // Limpiar el formulario después de enviar
    setDescription("");
    setCategory("");
    setAmount(0);
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Campo Descripción */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-900">Descripción</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Campo Categoría */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-900">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Seleccione categoría</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Campo Monto */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-900">Monto</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Campo Fecha */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-900">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Botón de envío */}
      <div className="mt-6 flex justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Agregar Gasto
        </button>
      </div>
    </form>
  );
};

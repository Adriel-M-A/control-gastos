import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";

const App = () => {
  // Estado para la opción seleccionada en el Sidebar
  const [selectedOption, setSelectedOption] = useState("dashboard");

  // Función para renderizar el contenido principal según la opción seleccionada
  const renderMainContent = () => {
    switch (selectedOption) {
      case "dashboard":
        return <Dashboard />;
      case "statistics":
        return <Statistics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout selectedOption={selectedOption} setSelectedOption={setSelectedOption}>
      {renderMainContent()}
    </MainLayout>
  );
};

export default App;

import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const MainLayout = ({ children, selectedOption, setSelectedOption }: MainLayoutProps) => {
  return (
    <div>
      {/* Sidebar fijo */}
      <Sidebar onSelect={setSelectedOption} selectedOption={selectedOption} />

      {/* Contenedor principal con margen izquierdo igual al ancho del Sidebar */}
      <div className="ml-64">
        {/* Encabezado */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Control de Gastos</h1>
          </div>
        </header>
        {/* Área principal donde se renderiza el contenido dinámico */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;

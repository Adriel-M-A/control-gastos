interface SidebarProps {
  onSelect: (option: string) => void;
  selectedOption: string;
}

const Sidebar = ({ onSelect, selectedOption }: SidebarProps) => {
  return (
    // Sidebar fijo con posición fixed y altura completa
    <aside className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white">
      <nav className="mt-10">
        <ul>
          {/* Opción de Dashboard */}
          <li
            className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${
              selectedOption === "dashboard" ? "bg-gray-700" : ""
            }`}
            onClick={() => onSelect("dashboard")}
          >
            Dashboard
          </li>
          {/* Nueva opción: Estadísticas */}
          <li
            className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${
              selectedOption === "statistics" ? "bg-gray-700" : ""
            }`}
            onClick={() => onSelect("statistics")}
          >
            Estadísticas
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

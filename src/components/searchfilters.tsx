import { useState } from "react";
import { Input } from "./ui/input";

interface SearchFiltersProps {
  onSearch: (query: string, type: "cliente" | "placa" | "fecha") => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"cliente" | "placa" | "fecha">("cliente");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch(query, searchType);
  };

  const handleTypeChange = (type: "cliente" | "placa" | "fecha") => {
    setSearchType(type);
    onSearch(searchQuery, type);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-700">Buscar por:</span>
        <div className="flex gap-2">
          {(["cliente", "placa", "fecha"] as const).map(type => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                searchType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type === "cliente" ? "Cliente" : type === "placa" ? "Patente" : "Fecha"}
            </button>
          ))}
        </div>
      </div>

      <div>
        {searchType === "fecha" ? (
          <input
            type="date"
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        ) : (
          <Input
            type="text"
            placeholder={`Buscar por ${searchType === "cliente" ? "nombre de cliente" : "patente"}...`}
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
          />
        )}
      </div>

      {searchQuery && (
        <button
          onClick={() => {
            setSearchQuery("");
            onSearch("", searchType);
          }}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Limpiar búsqueda
        </button>
      )}
    </div>
  );
}

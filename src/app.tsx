import { useEffect, useState } from "react";
import { OilChange } from "./types";
import { OilChangeForm } from "./components/oilchangeform";
import { OilChangeCard } from "./components/oilchangecard";
import { SearchFilters } from "./components/searchfilters";
import { calculateNextOilChange, formatDate } from "./lib/utils";
import { addOilChange, fetchAllOilChanges, deleteOilChange, updateOilChange, searchOilChanges } from "./services/oil-changes";

export default function App() {
  const [oilChanges, setOilChanges] = useState<OilChange[]>([]);
  const [filteredChanges, setFilteredChanges] = useState<OilChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"cliente" | "placa" | "fecha">("cliente");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchAllOilChanges();
    setOilChanges(data);
    setFilteredChanges(data);
    setLoading(false);
  };

  const handleSearch = async (query: string, type: "cliente" | "placa" | "fecha") => {
    setSearchQuery(query);
    setSearchType(type);

    if (!query.trim()) {
      setFilteredChanges(oilChanges);
      return;
    }

    const results = await searchOilChanges(query, type);
    setFilteredChanges(results);
  };

  const handleAdd = async (data: { cliente: string; vehiculo: string; placa: string; kilometraje: number; aceiteUsado: string }) => {
    const today = new Date().toISOString().split('T')[0];
    const newChange: OilChange = {
      ...data,
      id: "",
      fecha: today,
      proximoCambio: calculateNextOilChange(data.kilometraje),
      completado: false,
    };

    const added = await addOilChange(newChange);
    if (added) {
      await loadData();
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteOilChange(id);
    if (success) {
      await loadData();
    }
  };

  const handleToggle = async (id: string) => {
    const item = oilChanges.find(c => c.id === id);
    if (item) {
      const success = await updateOilChange(id, { completado: !item.completado });
      if (success) {
        await loadData();
      }
    }
  };

  const groupedByDate = filteredChanges.reduce((acc, change) => {
    if (!acc[change.fecha]) {
      acc[change.fecha] = [];
    }
    acc[change.fecha].push(change);
    return acc;
  }, {} as Record<string, OilChange[]>);

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bgarage</h1>
          <p className="text-lg text-gray-600">Tarjeta de Cambio de Aceite</p>
          <div className="h-1 w-20 bg-blue-600 mt-3"></div>
        </div>

        <div className="space-y-6">
          <OilChangeForm onSubmit={handleAdd} />

          {oilChanges.length > 0 && (
            <SearchFilters onSearch={handleSearch} />
          )}

          {loading ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500 text-lg">Cargando registros...</p>
            </div>
          ) : filteredChanges.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500 text-lg">
                {oilChanges.length === 0 ? "No hay registros de cambio de aceite aún." : "No se encontraron resultados."}
              </p>
              <p className="text-gray-400 mt-2">
                {oilChanges.length === 0 ? "Agrega tu primer registro usando el formulario arriba." : "Intenta con otro criterio de búsqueda."}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedDates.map(date => (
                <div key={date}>
                  <div className="mb-4 pb-2 border-b-2 border-blue-600">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {new Date(date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {groupedByDate[date].length} {groupedByDate[date].length === 1 ? 'registro' : 'registros'}
                    </p>
                  </div>
                  <div className="grid gap-4">
                    {groupedByDate[date].map(c => (
                      <OilChangeCard
                        key={c.id}
                        data={c}
                        onDelete={handleDelete}
                        onToggle={handleToggle}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { OilChange } from "./types";
import { OilChangeForm } from "./components/oilchangeform";
import { OilChangeCard } from "./components/oilchangecard";
import { getFromLocalStorage, saveToLocalStorage, calculateNextOilChange, formatDate } from "./lib/utils";

export default function App() {
  const [oilChanges, setOilChanges] = useState<OilChange[]>([]);

  useEffect(() => {
    const stored = getFromLocalStorage<OilChange[]>("oilChanges");
    if (stored) setOilChanges(stored);
  }, []);

  useEffect(() => {
    saveToLocalStorage("oilChanges", oilChanges);
  }, [oilChanges]);

  const handleAdd = (data: { cliente: string; vehiculo: string; placa: string; kilometraje: number; aceiteUsado: string }) => {
    const newChange: OilChange = {
      ...data,
      id: crypto.randomUUID(),
      fecha: formatDate(),
      proximoCambio: calculateNextOilChange(data.kilometraje),
      completado: false,
    };
    setOilChanges([newChange, ...oilChanges]);
  };

  const handleDelete = (id: string) => {
    setOilChanges(oilChanges.filter(c => c.id !== id));
  };

  const handleToggle = (id: string) => {
    setOilChanges(
      oilChanges.map(c =>
        c.id === id ? { ...c, completado: !c.completado } : c
      )
    );
  };

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

          {oilChanges.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500 text-lg">No hay registros de cambio de aceite aún.</p>
              <p className="text-gray-400 mt-2">Agrega tu primer registro usando el formulario arriba.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {oilChanges.map(c => (
                <OilChangeCard
                  key={c.id}
                  data={c}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

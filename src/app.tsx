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

  const handleAdd = (data: { cliente: string; vehiculo: string; placa: string; kilometraje: number }) => {
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <OilChangeForm onSubmit={handleAdd} />
        {oilChanges.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">No hay registros aún.</p>
        ) : (
          oilChanges.map(c => (
            <OilChangeCard
              key={c.id}
              data={c}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}

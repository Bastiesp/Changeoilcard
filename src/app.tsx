import { useEffect, useState } from "react";
import { OilChangeForm } from "./components/oilchangeform";
import { OilChangeCard, OilChange } from "./components/oilchangecard";
import { getFromLocalStorage, saveToLocalStorage, calculateNextOilChange, formatDate } from "./lib/utils";

export default function App() {
  const [oilChanges, setOilChanges] = useState<OilChange[]>([]);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const stored = getFromLocalStorage<OilChange[]>("oilChanges");
    if (stored) setOilChanges(stored);
  }, []);

  // Guardar en localStorage cada vez que cambia la lista
  useEffect(() => {
    saveToLocalStorage("oilChanges", oilChanges);
  }, [oilChanges]);

  // Agregar un nuevo cambio de aceite
  const handleAdd = (data: Omit<OilChange, "id" | "fecha" | "proximoCambio">) => {
    const newChange: OilChange = {
      ...data,
      id: crypto.randomUUID(),
      fecha: formatDate(),
      proximoCambio: calculateNextOilChange(Number(data.kilometraje)),
    };
    setOilChanges([newChange, ...oilChanges]);
  };

  // Eliminar un cambio por id
  const handleDelete = (id: string) => {
    setOilChanges(oilChanges.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <OilChangeForm
          onSubmit={(data) =>
            handleAdd({
              cliente: data.cliente,
              vehiculo: data.vehiculo,
              placa: data.placa,
              kilometraje: data.kilometraje,
            })
          }
        />

        {oilChanges.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            No hay registros aún.
          </p>
        ) : (
          oilChanges.map((change) => (
            <OilChangeCard
              key={change.id}
              data={change}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

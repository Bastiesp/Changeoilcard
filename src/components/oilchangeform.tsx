import React, { useState } from "react";

interface Props {
  onSubmit: (data: {
    cliente: string;
    vehiculo: string;
    placa: string;
    kilometraje: number;
  }) => void;
}

export const OilChangeForm: React.FC<Props> = ({ onSubmit }) => {
  const [cliente, setCliente] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [placa, setPlaca] = useState("");
  const [kilometraje, setKilometraje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente || !vehiculo || !placa || !kilometraje) return;

    onSubmit({
      cliente,
      vehiculo,
      placa,
      kilometraje: Number(kilometraje),
    });

    setCliente("");
    setVehiculo("");
    setPlaca("");
    setKilometraje("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <input
        type="text"
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Vehículo"
        value={vehiculo}
        onChange={(e) => setVehiculo(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Placa"
        value={placa}
        onChange={(e) => setPlaca(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Kilometraje"
        value={kilometraje}
        onChange={(e) => setKilometraje(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Agregar Cambio de Aceite
      </button>
    </form>
  );
};

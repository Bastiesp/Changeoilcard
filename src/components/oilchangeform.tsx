import React, { useState } from "react";

interface Props {
  onSubmit: (data: {
    cliente: string;
    vehiculo: string;
    placa: string;
    kilometraje: number;
    aceiteUsado: string;
  }) => void;
}

export const OilChangeForm: React.FC<Props> = ({ onSubmit }) => {
  const [cliente, setCliente] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [placa, setPlaca] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [aceiteUsado, setAceiteUsado] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente || !vehiculo || !placa || !kilometraje || !aceiteUsado) return;

    onSubmit({
      cliente,
      vehiculo,
      placa,
      kilometraje: Number(kilometraje),
      aceiteUsado,
    });

    setCliente("");
    setVehiculo("");
    setPlaca("");
    setKilometraje("");
    setAceiteUsado("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
      <input
        type="text"
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Vehículo"
        value={vehiculo}
        onChange={(e) => setVehiculo(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Placa"
        value={placa}
        onChange={(e) => setPlaca(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Kilometraje"
        value={kilometraje}
        onChange={(e) => setKilometraje(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Aceite usado (ej: 5W-30, Mobil 1 5L)"
        value={aceiteUsado}
        onChange={(e) => setAceiteUsado(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        Agregar Cambio de Aceite
      </button>
    </form>
  );
};

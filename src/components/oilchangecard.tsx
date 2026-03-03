import { OilChange } from "../types";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { generatePDF } from "../lib/utils";

interface OilChangeCardProps {
  data: OilChange;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
}

export const OilChangeCard: React.FC<OilChangeCardProps> = ({ data, onDelete, onToggle }) => {
  return (
    <Card
      className={`w-full p-4 ${data.completado ? "bg-green-50" : "bg-white"}`}
      id={`oilcard-${data.id}`}
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-lg font-semibold">{data.cliente}</h2>
          <p className="text-sm text-gray-500">{data.vehiculo}</p>
        </div>
        <span className="text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {data.placa}
        </span>
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <p><strong>Kilometraje:</strong> {data.kilometraje} km</p>
        <p><strong>Fecha:</strong> {data.fecha}</p>
        <p><strong>Próximo cambio:</strong> {data.proximoCambio} km</p>
        <p><strong>Estado:</strong> {data.completado ? "Realizado ✅" : "Pendiente ⏳"}</p>
      </div>

      <div className="flex gap-2 mt-4">
        {onToggle && (
          <Button
            variant={data.completado ? "secondary" : "primary"}
            className="flex-1"
            onClick={() => onToggle(data.id)}
          >
            {data.completado ? "Reabrir" : "Marcar como hecho"}
          </Button>
        )}
        {onDelete && (
          <Button variant="danger" className="flex-1" onClick={() => onDelete(data.id)}>
            Eliminar
          </Button>
        )}
        <Button
          variant="primary"
          className="flex-1"
          onClick={async () => {
            try {
              await generatePDF(`oilcard-${data.id}`, `CambioAceite_${data.cliente}.pdf`);
            } catch (err) {
              console.error("Error al generar PDF:", err);
            }
          }}
        >
          Descargar PDF
        </Button>
      </div>
    </Card>
  );
};

import { OilChange } from "../types"; // IMPORTAR desde types
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface OilChangeCardProps {
  data: OilChange;
  onDelete?: (id: string) => void;
}

export const OilChangeCard: React.FC<OilChangeCardProps> = ({ data, onDelete }) => {
  return (
    <Card className="w-full">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">{data.cliente}</h2>
          <p className="text-sm text-gray-500">{data.vehiculo}</p>
        </div>

        <span className="text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {data.placa}
        </span>
      </div>

      <div className="mt-4 space-y-1 text-sm text-gray-700">
        <p><strong>Kilometraje:</strong> {data.kilometraje} km</p>
        <p><strong>Fecha:</strong> {data.fecha}</p>
        <p><strong>Próximo cambio:</strong> {data.proximoCambio} km</p>
      </div>

      {onDelete && (
        <Button
          variant="danger"
          className="mt-4 w-full"
          onClick={() => onDelete(data.id)}
        >
          Eliminar
        </Button>
      )}
    </Card>
  );
};

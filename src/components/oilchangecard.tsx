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
    <>
      <Card
        className={`w-full p-6 border-2 transition-all ${
          data.completado
            ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
            : "bg-white border-gray-200 hover:border-blue-300"
        }`}
        id={`oilcard-${data.id}`}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{data.cliente}</h2>
              <p className="text-sm text-gray-600 mt-1">{data.vehiculo}</p>
            </div>
            <span className="text-xs font-bold uppercase bg-blue-600 text-white px-3 py-1 rounded-full">
              {data.placa}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 font-semibold">KILOMETRAJE ACTUAL</p>
              <p className="text-lg font-bold text-gray-900">{data.kilometraje} km</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 font-semibold">PRÓXIMO CAMBIO</p>
              <p className="text-lg font-bold text-blue-600">{data.proximoCambio} km</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 font-semibold">FECHA</p>
              <p className="text-sm font-semibold text-gray-900">{data.fecha}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 font-semibold">ACEITE USADO</p>
              <p className="text-sm font-semibold text-gray-900">{data.aceiteUsado}</p>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-lg text-center font-semibold ${
            data.completado
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {data.completado ? "✓ Realizado" : "⏳ Pendiente"}
          </div>

          <div className="flex gap-2">
            {onToggle && (
              <Button
                variant={data.completado ? "secondary" : "primary"}
                className="flex-1"
                onClick={() => onToggle(data.id)}
              >
                {data.completado ? "Reabrir" : "Marcar como hecho"}
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
            {onDelete && (
              <Button variant="danger" className="flex-1" onClick={() => onDelete(data.id)}>
                Eliminar
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div id={`oilcard-${data.id}`} style={{ display: "none" }}>
        <PDFCard data={data} />
      </div>
    </>
  );
};

function PDFCard({ data }: { data: OilChange }) {
  return (
    <div style={{
      width: "100mm",
      height: "160mm",
      backgroundColor: "#ffffff",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      border: "2px solid #1e40af",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "40px",
        backgroundColor: "#1e40af",
        color: "white",
        padding: "8px 20px",
        fontSize: "20px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        borderBottom: "4px solid #f59e0b"
      }}>
        Bgarage
      </div>

      <div style={{ marginTop: "50px" }}>
        <div style={{ marginBottom: "16px", borderBottom: "2px solid #e5e7eb", paddingBottom: "8px" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>
            {data.cliente}
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
            {data.vehiculo}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div style={{ backgroundColor: "#f3f4f6", padding: "12px", borderRadius: "6px" }}>
            <div style={{ fontSize: "10px", color: "#6b7280", fontWeight: "bold", marginBottom: "4px" }}>
              PLACA
            </div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#1e40af" }}>
              {data.placa}
            </div>
          </div>
          <div style={{ backgroundColor: "#f3f4f6", padding: "12px", borderRadius: "6px" }}>
            <div style={{ fontSize: "10px", color: "#6b7280", fontWeight: "bold", marginBottom: "4px" }}>
              FECHA
            </div>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#374151" }}>
              {data.fecha}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div style={{ backgroundColor: "#dbeafe", padding: "12px", borderRadius: "6px", border: "2px solid #1e40af" }}>
            <div style={{ fontSize: "10px", color: "#1e40af", fontWeight: "bold", marginBottom: "4px" }}>
              KM ACTUAL
            </div>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1e40af" }}>
              {data.kilometraje} km
            </div>
          </div>
          <div style={{ backgroundColor: "#dbeafe", padding: "12px", borderRadius: "6px", border: "2px solid #1e40af" }}>
            <div style={{ fontSize: "10px", color: "#1e40af", fontWeight: "bold", marginBottom: "4px" }}>
              PRÓXIMO CAMBIO
            </div>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1e40af" }}>
              {data.proximoCambio} km
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#fef3c7", padding: "12px", borderRadius: "6px", marginBottom: "16px", border: "1px solid #fbbf24" }}>
          <div style={{ fontSize: "10px", color: "#92400e", fontWeight: "bold", marginBottom: "4px" }}>
            ACEITE UTILIZADO
          </div>
          <div style={{ fontSize: "14px", fontWeight: "bold", color: "#333333" }}>
            {data.aceiteUsado}
          </div>
        </div>

        <div style={{
          backgroundColor: data.completado ? "#d1fae5" : "#fef3c7",
          padding: "12px",
          borderRadius: "6px",
          textAlign: "center",
          fontWeight: "bold",
          color: data.completado ? "#065f46" : "#92400e",
          border: `2px solid ${data.completado ? "#10b981" : "#fbbf24"}`
        }}>
          {data.completado ? "✓ MANTENIMIENTO REALIZADO" : "⏳ PENDIENTE DE REALIZAR"}
        </div>
      </div>

      <div style={{
        position: "absolute",
        bottom: "10px",
        left: "20px",
        right: "20px",
        fontSize: "10px",
        color: "#9ca3af",
        textAlign: "center",
        borderTop: "1px solid #e5e7eb",
        paddingTop: "8px"
      }}>
        Documento generado por Bgarage - Sistema de Mantenimiento Automotriz
      </div>
    </div>
  );
}

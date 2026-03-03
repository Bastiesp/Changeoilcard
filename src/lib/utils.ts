import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Guardar y recuperar localStorage genérico
export const saveToLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Calcular próximo cambio (ej: +5000 km)
export const calculateNextOilChange = (km: number) => km + 5000;

// Fecha formateada DD/MM/YYYY
export const formatDate = () => {
  const d = new Date();
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

// Generar PDF de tarjeta
export const generatePDF = async (id: string) => {
  const card = document.getElementById(`oilcard-${id}`);
  if (!card) return;

  const canvas = await html2canvas(card);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`tarjeta-${id}.pdf`);
};

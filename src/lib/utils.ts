// src/lib/utils.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Convierte un elemento HTML en PDF y lo descarga.
 * @param elementId - ID del elemento HTML
 * @param fileName - Nombre del archivo PDF resultante
 */
export async function exportToPDF(elementId: string, fileName: string) {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`No se encontró el elemento con id ${elementId}`);

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
}

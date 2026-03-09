// src/lib/utils.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/** -------------------------------
 * LocalStorage Helpers
 * ------------------------------- */
export function saveToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

/** -------------------------------
 * Date / Oil Change Helpers
 * ------------------------------- */
export function formatDate(): string {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function calculateNextOilChange(currentKm: number): number {
  const INTERVAL_KM = 5000;
  return currentKm + INTERVAL_KM;
}

/** -------------------------------
 * PDF / HTML Helpers
 * ------------------------------- */
export async function generatePDF(elementId: string, fileName: string) {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`No se encontró el elemento con id "${elementId}"`);

  const originalStyle = element.getAttribute('style');
  element.setAttribute('style', 'position: fixed; left: -9999px; top: -9999px; width: 100mm; height: 160mm; visibility: visible;');

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', [100, 160]);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
  } finally {
    if (originalStyle) {
      element.setAttribute('style', originalStyle);
    } else {
      element.removeAttribute('style');
    }
  }
}

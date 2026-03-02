// Formatear fecha actual
export const formatDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString("es-ES");
};

// Calcular próximo cambio automático
export const calculateNextOilChange = (
  currentKm: number,
  interval: number = 5000
): number => {
  return currentKm + interval;
};

// Guardar en localStorage
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Obtener desde localStorage
export const getFromLocalStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Formatear kilometraje con separadores
export const formatKm = (km: number): string => {
  return km.toLocaleString("es-ES");
};

export interface OilChange {
  id: string;
  cliente: string;
  vehiculo: string;
  placa: string;
  kilometraje: number;
  aceiteUsado: string;
  fecha: string;
  proximoCambio: number;
  completado: boolean;
}

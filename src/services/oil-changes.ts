import { supabase } from './supabase';
import { OilChange } from '../types';

export async function fetchAllOilChanges(): Promise<OilChange[]> {
  const { data, error } = await supabase
    .from('oil_changes')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) {
    console.error('Error fetching oil changes:', error);
    return [];
  }

  return (data || []).map(row => ({
    id: row.id,
    cliente: row.cliente,
    vehiculo: row.vehiculo,
    placa: row.placa,
    kilometraje: row.kilometraje,
    aceiteUsado: row.aceite_usado,
    fecha: row.fecha,
    proximoCambio: row.proximo_cambio,
    completado: row.completado,
  }));
}

export async function addOilChange(data: Omit<OilChange, 'id'>): Promise<OilChange | null> {
  const { data: inserted, error } = await supabase
    .from('oil_changes')
    .insert({
      cliente: data.cliente,
      vehiculo: data.vehiculo,
      placa: data.placa,
      kilometraje: data.kilometraje,
      aceite_usado: data.aceiteUsado,
      fecha: data.fecha,
      proximo_cambio: data.proximoCambio,
      completado: data.completado,
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error adding oil change:', error);
    return null;
  }

  if (!inserted) return null;

  return {
    id: inserted.id,
    cliente: inserted.cliente,
    vehiculo: inserted.vehiculo,
    placa: inserted.placa,
    kilometraje: inserted.kilometraje,
    aceiteUsado: inserted.aceite_usado,
    fecha: inserted.fecha,
    proximoCambio: inserted.proximo_cambio,
    completado: inserted.completado,
  };
}

export async function updateOilChange(id: string, updates: Partial<OilChange>): Promise<boolean> {
  const payload: any = {};

  if (updates.cliente !== undefined) payload.cliente = updates.cliente;
  if (updates.vehiculo !== undefined) payload.vehiculo = updates.vehiculo;
  if (updates.placa !== undefined) payload.placa = updates.placa;
  if (updates.kilometraje !== undefined) payload.kilometraje = updates.kilometraje;
  if (updates.aceiteUsado !== undefined) payload.aceite_usado = updates.aceiteUsado;
  if (updates.fecha !== undefined) payload.fecha = updates.fecha;
  if (updates.proximoCambio !== undefined) payload.proximo_cambio = updates.proximoCambio;
  if (updates.completado !== undefined) payload.completado = updates.completado;

  const { error } = await supabase
    .from('oil_changes')
    .update(payload)
    .eq('id', id);

  if (error) {
    console.error('Error updating oil change:', error);
    return false;
  }

  return true;
}

export async function deleteOilChange(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('oil_changes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting oil change:', error);
    return false;
  }

  return true;
}

export async function searchOilChanges(query: string, searchBy: 'cliente' | 'placa' | 'fecha'): Promise<OilChange[]> {
  let queryBuilder = supabase.from('oil_changes').select('*');

  if (searchBy === 'cliente') {
    queryBuilder = queryBuilder.ilike('cliente', `%${query}%`);
  } else if (searchBy === 'placa') {
    queryBuilder = queryBuilder.ilike('placa', `%${query}%`);
  } else if (searchBy === 'fecha') {
    queryBuilder = queryBuilder.eq('fecha', query);
  }

  const { data, error } = await queryBuilder.order('fecha', { ascending: false });

  if (error) {
    console.error('Error searching oil changes:', error);
    return [];
  }

  return (data || []).map(row => ({
    id: row.id,
    cliente: row.cliente,
    vehiculo: row.vehiculo,
    placa: row.placa,
    kilometraje: row.kilometraje,
    aceiteUsado: row.aceite_usado,
    fecha: row.fecha,
    proximoCambio: row.proximo_cambio,
    completado: row.completado,
  }));
}

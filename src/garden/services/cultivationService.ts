/**
 * Servicio para gestión de cultivos y plantas
 */
import { Plant, CreatePlantData, CreateMultiplePlantsData } from '../types';
import * as api from '../adapters/apiAdapter';

/**
 * Crea una nueva planta en un elemento
 */
export async function createPlant(
  elementId: string,
  data: CreatePlantData
): Promise<Plant> {
  return api.createPlant(elementId, data);
}

/**
 * Crea múltiples plantas a la vez
 */
export async function createMultiplePlants(
  elementId: string,
  data: CreateMultiplePlantsData
): Promise<Plant[]> {
  const response = await api.createMultiplePlants(elementId, data);
  return response.plants || [];
}

/**
 * Actualiza una planta existente
 */
export async function updatePlant(
  elementId: string,
  plantId: string,
  updates: Partial<Plant>
): Promise<Plant> {
  return api.updatePlant(elementId, plantId, updates);
}

/**
 * Elimina una planta
 */
export async function deletePlant(
  elementId: string,
  plantId: string
): Promise<void> {
  return api.deletePlant(elementId, plantId);
}

/**
 * Calcula el estado de una planta basado en fechas
 */
export function calculatePlantStatus(plant: Plant): Plant['status'] {
  // Si ya está finalizado, mantenerlo
  if (plant.status === 'finalizado' || plant.status === 'cosechado') {
    return plant.status;
  }

  const plantedDate = new Date(plant.plantedDate);
  const now = new Date();
  const daysSincePlanted = Math.floor(
    (now.getTime() - plantedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Lógica simple basada en días (puede mejorarse con datos específicos por planta)
  if (daysSincePlanted < 7) return 'germinando';
  if (daysSincePlanted < 21) return 'plántula';
  if (daysSincePlanted < 60) return 'creciendo';
  if (daysSincePlanted < 90) return 'floreciendo';
  return 'fructificando';
}


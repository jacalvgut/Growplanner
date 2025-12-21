/**
 * Servicio para gestión de cultivos y plantas
 */
import { Plant, CreatePlantData, CreateMultiplePlantsData } from '../types';
import * as api from '../adapters/apiAdapter';
import { plantDataToSnakeCase, multiplePlantsDataToSnakeCase, plantUpdatesToSnakeCase } from '../utils/dataTransform';

/**
 * Crea una nueva planta en un elemento
 */
export async function createPlant(
  elementId: string,
  data: CreatePlantData
): Promise<Plant> {
  // Convertir datos de camelCase a snake_case para el backend
  const snakeCaseData = plantDataToSnakeCase(data);
  return api.createPlant(elementId, snakeCaseData);
}

/**
 * Crea múltiples plantas a la vez
 */
export async function createMultiplePlants(
  elementId: string,
  data: CreateMultiplePlantsData
): Promise<Plant[]> {
  // Convertir datos de camelCase a snake_case para el backend
  const snakeCaseData = multiplePlantsDataToSnakeCase(data);
  const response = await api.createMultiplePlants(elementId, snakeCaseData);
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
  // Convertir actualizaciones de camelCase a snake_case
  const snakeCaseUpdates = plantUpdatesToSnakeCase(updates as Record<string, unknown>);
  return api.updatePlant(elementId, plantId, snakeCaseUpdates);
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


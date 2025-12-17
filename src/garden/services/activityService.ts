/**
 * Servicio para gestión de actividades
 */
import {
  ElementActivity,
  PlantActivity,
  CreateElementActivityData,
  CreatePlantActivityData,
} from '../types';
import * as api from '../adapters/apiAdapter';

/**
 * Crea una actividad a nivel de elemento
 */
export async function createElementActivity(
  elementId: string,
  data: CreateElementActivityData
): Promise<ElementActivity> {
  return api.createElementActivity(elementId, data);
}

/**
 * Elimina una actividad de elemento
 */
export async function deleteElementActivity(
  elementId: string,
  activityId: string
): Promise<void> {
  return api.deleteElementActivity(elementId, activityId);
}

/**
 * Crea una actividad a nivel de planta
 */
export async function createPlantActivity(
  elementId: string,
  plantId: string,
  data: CreatePlantActivityData
): Promise<PlantActivity> {
  return api.createPlantActivity(elementId, plantId, data);
}

/**
 * Elimina una actividad de planta
 */
export async function deletePlantActivity(
  elementId: string,
  plantId: string,
  activityId: string
): Promise<void> {
  return api.deletePlantActivity(elementId, plantId, activityId);
}

/**
 * Obtiene actividades recientes de un elemento
 */
export function getRecentActivities(
  elementActivities: ElementActivity[],
  plantActivities: PlantActivity[],
  limit: number = 10
): (ElementActivity | PlantActivity)[] {
  const all = [...elementActivities, ...plantActivities];
  return all
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}


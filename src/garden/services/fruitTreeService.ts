/**
 * Servicio para gestión de actividades de árboles frutales
 * Mapea las actividades específicas de árbol frutal a actividades de elemento
 */
import {
  FruitTreeActivity,
  CreateFruitTreeActivityData,
} from '../types/fruitTreeTypes';
import * as activityService from './activityService';
import { FruitTreeId } from '../types';
import { CreateElementActivityData } from '../types/activityTypes';

/**
 * Mapea un tipo de actividad de árbol frutal a tipo de actividad de elemento
 */
function mapFruitTreeActivityType(
  type: CreateFruitTreeActivityData['type']
): CreateElementActivityData['type'] {
  // Mapear a tipos existentes
  switch (type) {
    case 'riego':
      return 'riego';
    case 'abono':
      return 'abono';
    case 'poda':
      return 'otro';
    default:
      return 'otro';
  }
}

/**
 * Crea una actividad de árbol frutal
 * Nota: Los árboles frutales se manejan como elementos especiales
 * Se usa el ID del árbol como elementId para compatibilidad con el backend
 */
export async function createFruitTreeActivity(
  treeId: FruitTreeId,
  data: CreateFruitTreeActivityData
): Promise<FruitTreeActivity> {
  // Mapear a actividad de elemento usando el treeId como elementId
  const elementActivityData: CreateElementActivityData = {
    type: mapFruitTreeActivityType(data.type),
    date: data.date,
    notes: data.notes
      ? `[${data.type.toUpperCase()}] ${data.notes}`
      : `[${data.type.toUpperCase()}]`,
  };

  // Usar el treeId como elementId para compatibilidad con el backend
  const activity = await activityService.createElementActivity(
    treeId,
    elementActivityData
  );

  // Convertir a FruitTreeActivity
  return {
    id: activity.id,
    treeId: treeId,
    type: data.type,
    date: activity.date,
    notes: data.notes,
    createdAt: activity.createdAt,
  };
}

/**
 * Elimina una actividad de árbol frutal
 */
export async function deleteFruitTreeActivity(
  treeId: FruitTreeId,
  activityId: string
): Promise<void> {
  return activityService.deleteElementActivity(treeId, activityId);
}


/**
 * Servicio para gestión de actividades de composteras
 * Mapea las actividades específicas de compost a actividades de elemento
 */
import {
  CompostActivity,
  CreateCompostActivityData,
} from '../types/activityTypes';
import * as activityService from './activityService';
import { GardenElementId } from '../types';
import { CreateElementActivityData } from '../types/activityTypes';

/**
 * Mapea un tipo de actividad de compost a tipo de actividad de elemento
 */
function mapCompostActivityType(
  type: CreateCompostActivityData['type']
): CreateElementActivityData['type'] {
  // Mapear a tipos existentes o usar 'otro' con nota
  switch (type) {
    case 'regar':
      return 'riego';
    case 'alimentar':
    case 'remover':
      return 'otro';
    default:
      return 'otro';
  }
}

/**
 * Crea una actividad de compostera
 */
export async function createCompostActivity(
  elementId: GardenElementId,
  data: CreateCompostActivityData
): Promise<CompostActivity> {
  // Mapear a actividad de elemento
  const elementActivityData: CreateElementActivityData = {
    type: mapCompostActivityType(data.type),
    date: data.date,
    notes: data.notes
      ? `[${data.type.toUpperCase()}] ${data.notes}`
      : `[${data.type.toUpperCase()}]`,
  };

  const activity = await activityService.createElementActivity(
    elementId,
    elementActivityData
  );

  // Convertir a CompostActivity
  return {
    id: activity.id,
    elementId: activity.elementId,
    type: data.type,
    date: activity.date,
    notes: data.notes,
    createdAt: activity.createdAt,
  };
}

/**
 * Elimina una actividad de compostera
 */
export async function deleteCompostActivity(
  elementId: GardenElementId,
  activityId: string
): Promise<void> {
  return activityService.deleteElementActivity(elementId, activityId);
}


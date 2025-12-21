/**
 * Servicio para gestión de actividades de círculos (árboles frutales)
 * Mapea las actividades específicas de círculo a actividades de elemento
 */
import {
  CircleActivity,
  CreateCircleActivityData,
} from '../types/activityTypes';
import * as activityService from './activityService';
import { GardenElementId } from '../types';
import { CreateElementActivityData } from '../types/activityTypes';

/**
 * Mapea un tipo de actividad de círculo a tipo de actividad de elemento
 */
function mapCircleActivityType(
  type: CreateCircleActivityData['type']
): CreateElementActivityData['type'] {
  // Mapear a tipos existentes
  switch (type) {
    case 'regar':
      return 'riego';
    case 'abonar':
      return 'abono';
    case 'quitar_hierbas':
      return 'limpieza_hierbas';
    case 'podar':
      return 'otro';
    default:
      return 'otro';
  }
}

/**
 * Crea una actividad de círculo
 */
export async function createCircleActivity(
  elementId: GardenElementId,
  data: CreateCircleActivityData
): Promise<CircleActivity> {
  // Mapear a actividad de elemento
  const elementActivityData: CreateElementActivityData = {
    type: mapCircleActivityType(data.type),
    date: data.date,
    notes: data.notes
      ? `[${data.type.toUpperCase()}] ${data.notes}`
      : `[${data.type.toUpperCase()}]`,
  };

  const activity = await activityService.createElementActivity(
    elementId,
    elementActivityData
  );

  // Convertir a CircleActivity
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
 * Elimina una actividad de círculo
 */
export async function deleteCircleActivity(
  elementId: GardenElementId,
  activityId: string
): Promise<void> {
  return activityService.deleteElementActivity(elementId, activityId);
}


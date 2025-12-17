/**
 * Tipos relacionados con planificación y avisos automáticos
 */
import { GardenElementId } from './ids';
import { ElementActivityType, PlantActivityType } from './activityTypes';

/**
 * Tipo de plan (elemento o planta)
 */
export type PlanType = 'element' | 'plant';

/**
 * Tipo de actividad para planes
 */
export type PlanActivityType = ElementActivityType | PlantActivityType;

/**
 * Frecuencia de repetición
 */
export interface Recurrence {
  type: 'days' | 'weeks' | 'months';
  interval: number; // Cada cuántos días/semanas/meses
}

/**
 * Plan de acción configurado
 */
export interface ActionPlan {
  id: string;
  elementId: GardenElementId;
  plantId?: string; // Si es null, aplica al elemento completo
  planType: PlanType;
  activityType: PlanActivityType;
  recurrence: Recurrence;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string (opcional)
  enabled: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Aviso generado automáticamente desde un plan
 */
export interface Alert {
  id: string;
  planId: string;
  elementId: GardenElementId;
  plantId?: string;
  activityType: PlanActivityType;
  dueDate: string; // ISO date string
  message: string;
  completed: boolean;
  completedDate?: string; // ISO date string
  createdAt: string;
}

/**
 * Datos para crear un plan de acción
 */
export interface CreateActionPlanData {
  elementId: GardenElementId;
  plantId?: string;
  planType: PlanType;
  activityType: PlanActivityType;
  recurrence: Recurrence;
  startDate: string;
  endDate?: string;
  notes?: string;
}


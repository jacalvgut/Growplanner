/**
 * Servicio para gestión de planificación y avisos
 */
import { ActionPlan, Alert, CreateActionPlanData, Recurrence } from '../types';
import * as api from '../adapters/apiAdapter';

/**
 * Crea un nuevo plan de acción
 */
export async function createActionPlan(
  data: CreateActionPlanData
): Promise<ActionPlan> {
  return api.createActionPlan(data);
}

/**
 * Actualiza un plan de acción
 */
export async function updateActionPlan(
  planId: string,
  updates: Partial<ActionPlan>
): Promise<ActionPlan> {
  return api.updateActionPlan(planId, updates);
}

/**
 * Elimina un plan de acción
 */
export async function deleteActionPlan(planId: string): Promise<void> {
  return api.deleteActionPlan(planId);
}

/**
 * Calcula la próxima fecha de ejecución basada en la recurrencia
 */
export function calculateNextDueDate(
  lastDate: string,
  recurrence: Recurrence
): string {
  const date = new Date(lastDate);
  const daysToAdd =
    recurrence.type === 'days'
      ? recurrence.interval
      : recurrence.type === 'weeks'
      ? recurrence.interval * 7
      : recurrence.interval * 30;

  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split('T')[0];
}

/**
 * Genera avisos desde un plan de acción
 */
export function generateAlertsFromPlan(plan: ActionPlan): Alert[] {
  if (!plan.enabled) return [];

  const alerts: Alert[] = [];
  const startDate = new Date(plan.startDate);
  const endDate = plan.endDate ? new Date(plan.endDate) : new Date();
  endDate.setFullYear(endDate.getFullYear() + 1); // Por defecto, 1 año

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const daysToAdd =
      plan.recurrence.type === 'days'
        ? plan.recurrence.interval
        : plan.recurrence.type === 'weeks'
        ? plan.recurrence.interval * 7
        : plan.recurrence.interval * 30;

    currentDate.setDate(currentDate.getDate() + daysToAdd);

    if (currentDate > endDate) break;

    alerts.push({
      id: `${plan.id}-${currentDate.toISOString()}`,
      planId: plan.id,
      elementId: plan.elementId,
      plantId: plan.plantId,
      activityType: plan.activityType,
      dueDate: currentDate.toISOString().split('T')[0],
      message: `Recordatorio: ${plan.activityType} programado`,
      completed: false,
      createdAt: new Date().toISOString(),
    });
  }

  return alerts;
}


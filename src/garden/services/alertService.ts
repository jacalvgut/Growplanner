/**
 * Servicio para gestión de avisos y notificaciones
 */
import { Alert, ActionPlan } from '../types';
import * as api from '../adapters/apiAdapter';

/**
 * Obtiene todos los avisos de un elemento
 */
export async function getAlerts(elementId: string): Promise<Alert[]> {
  return api.getAlerts(elementId);
}

/**
 * Marca un aviso como completado
 */
export async function markAlertCompleted(
  elementId: string,
  alertId: string,
  completedDate: string = new Date().toISOString()
): Promise<Alert> {
  return api.markAlertCompleted(elementId, alertId, completedDate);
}

/**
 * Obtiene avisos pendientes (no completados)
 */
export function getPendingAlerts(alerts: Alert[]): Alert[] {
  return alerts.filter((alert) => !alert.completed);
}

/**
 * Obtiene avisos próximos (en los próximos N días)
 */
export function getUpcomingAlerts(
  alerts: Alert[],
  daysAhead: number = 7
): Alert[] {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + daysAhead);

  return alerts.filter((alert) => {
    if (alert.completed) return false;
    const dueDate = new Date(alert.dueDate);
    return dueDate >= today && dueDate <= futureDate;
  });
}

/**
 * Obtiene avisos vencidos (pasados y no completados)
 */
export function getOverdueAlerts(alerts: Alert[]): Alert[] {
  const today = new Date();
  return alerts.filter((alert) => {
    if (alert.completed) return false;
    const dueDate = new Date(alert.dueDate);
    return dueDate < today;
  });
}

/**
 * Formatea un mensaje de aviso
 */
export function formatAlertMessage(alert: Alert, plan?: ActionPlan): string {
  const dueDate = new Date(alert.dueDate);
  const formattedDate = dueDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
  });

  const plantInfo = alert.plantId ? ' (planta específica)' : '';
  return `${alert.message} - ${formattedDate}${plantInfo}`;
}


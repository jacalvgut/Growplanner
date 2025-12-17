/**
 * Adaptador para comunicación con el backend API
 * Centraliza todas las llamadas HTTP
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Cliente HTTP genérico
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      throw new Error(`API Error: ${response.status} ${errorText}`);
    }

    return response.json();
  } catch (error) {
    // Si es un error de conexión, proporcionar un mensaje más claro
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error(
        'No se puede conectar con el servidor. Asegúrate de que el backend esté corriendo en http://localhost:8000'
      );
    }
    throw error;
  }
}

/**
 * Obtener datos completos de un elemento
 */
export async function getElementDetail(elementId: string) {
  return apiRequest(`/elements/${elementId}`);
}

/**
 * Plantas
 */
export async function createPlant(elementId: string, plantData: unknown) {
  return apiRequest(`/elements/${elementId}/plants`, {
    method: 'POST',
    body: JSON.stringify(plantData),
  });
}

export async function createMultiplePlants(
  elementId: string,
  plantsData: unknown
) {
  return apiRequest(`/elements/${elementId}/plants/batch`, {
    method: 'POST',
    body: JSON.stringify(plantsData),
  });
}

export async function updatePlant(
  elementId: string,
  plantId: string,
  updates: unknown
) {
  return apiRequest(`/elements/${elementId}/plants/${plantId}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export async function deletePlant(elementId: string, plantId: string) {
  return apiRequest(`/elements/${elementId}/plants/${plantId}`, {
    method: 'DELETE',
  });
}

/**
 * Actividades de elemento
 */
export async function createElementActivity(
  elementId: string,
  activityData: unknown
) {
  return apiRequest(`/elements/${elementId}/activities`, {
    method: 'POST',
    body: JSON.stringify(activityData),
  });
}

export async function deleteElementActivity(
  elementId: string,
  activityId: string
) {
  return apiRequest(`/elements/${elementId}/activities/${activityId}`, {
    method: 'DELETE',
  });
}

/**
 * Actividades de planta
 */
export async function createPlantActivity(
  elementId: string,
  plantId: string,
  activityData: unknown
) {
  return apiRequest(`/elements/${elementId}/plants/${plantId}/activities`, {
    method: 'POST',
    body: JSON.stringify(activityData),
  });
}

export async function deletePlantActivity(
  elementId: string,
  plantId: string,
  activityId: string
) {
  return apiRequest(
    `/elements/${elementId}/plants/${plantId}/activities/${activityId}`,
    {
      method: 'DELETE',
    }
  );
}

/**
 * Planes de acción
 */
export async function createActionPlan(planData: unknown) {
  return apiRequest('/action-plans', {
    method: 'POST',
    body: JSON.stringify(planData),
  });
}

export async function updateActionPlan(planId: string, updates: unknown) {
  return apiRequest(`/action-plans/${planId}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export async function deleteActionPlan(planId: string) {
  return apiRequest(`/action-plans/${planId}`, {
    method: 'DELETE',
  });
}

/**
 * Avisos
 */
export async function getAlerts(elementId: string) {
  return apiRequest(`/elements/${elementId}/alerts`);
}

export async function markAlertCompleted(
  elementId: string,
  alertId: string,
  completedDate: string
) {
  return apiRequest(`/elements/${elementId}/alerts/${alertId}/complete`, {
    method: 'PATCH',
    body: JSON.stringify({ completedDate }),
  });
}


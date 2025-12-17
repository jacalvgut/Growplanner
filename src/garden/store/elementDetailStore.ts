/**
 * Store para gestionar el estado detallado de un elemento
 * Usa Zustand para el estado global
 */
import { create } from 'zustand';
import { ElementDetailStore, GardenElementId } from '../types';

/**
 * Store de detalles de elemento
 * Gestiona plantas, actividades, planes y avisos de un elemento específico
 */
export const useElementDetailStore = create<ElementDetailStore>((set) => ({
  // Estado inicial
  elementId: '' as GardenElementId,
  plants: [],
  elementActivities: [],
  plantActivities: [],
  actionPlans: [],
  alerts: [],
  lastUpdated: new Date().toISOString(),

  // Acciones - Plantas
  addPlant: (plant) =>
    set((state) => ({
      plants: [...state.plants, plant],
      lastUpdated: new Date().toISOString(),
    })),

  updatePlant: (plantId, updates) =>
    set((state) => ({
      plants: state.plants.map((p) =>
        p.id === plantId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      ),
      lastUpdated: new Date().toISOString(),
    })),

  deletePlant: (plantId) =>
    set((state) => ({
      plants: state.plants.filter((p) => p.id !== plantId),
      plantActivities: state.plantActivities.filter(
        (a) => a.plantId !== plantId
      ),
      lastUpdated: new Date().toISOString(),
    })),

  movePlant: (plantId, position) =>
    set((state) => ({
      plants: state.plants.map((p) =>
        p.id === plantId
          ? { ...p, position, updatedAt: new Date().toISOString() }
          : p
      ),
      lastUpdated: new Date().toISOString(),
    })),

  // Acciones - Actividades de elemento
  addElementActivity: (activity) =>
    set((state) => ({
      elementActivities: [...state.elementActivities, activity],
      lastUpdated: new Date().toISOString(),
    })),

  deleteElementActivity: (activityId) =>
    set((state) => ({
      elementActivities: state.elementActivities.filter(
        (a) => a.id !== activityId
      ),
      lastUpdated: new Date().toISOString(),
    })),

  // Acciones - Actividades de planta
  addPlantActivity: (activity) =>
    set((state) => ({
      plantActivities: [...state.plantActivities, activity],
      lastUpdated: new Date().toISOString(),
    })),

  deletePlantActivity: (activityId) =>
    set((state) => ({
      plantActivities: state.plantActivities.filter(
        (a) => a.id !== activityId
      ),
      lastUpdated: new Date().toISOString(),
    })),

  // Acciones - Planes de acción
  addActionPlan: (plan) =>
    set((state) => ({
      actionPlans: [...state.actionPlans, plan],
      lastUpdated: new Date().toISOString(),
    })),

  updateActionPlan: (planId, updates) =>
    set((state) => ({
      actionPlans: state.actionPlans.map((p) =>
        p.id === planId
          ? { ...p, ...updates, updatedAt: new Date().toISOString() }
          : p
      ),
      lastUpdated: new Date().toISOString(),
    })),

  deleteActionPlan: (planId) =>
    set((state) => ({
      actionPlans: state.actionPlans.filter((p) => p.id !== planId),
      alerts: state.alerts.filter((a) => a.planId !== planId),
      lastUpdated: new Date().toISOString(),
    })),

  // Acciones - Avisos
  markAlertCompleted: (alertId, completedDate) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId
          ? { ...a, completed: true, completedDate }
          : a
      ),
      lastUpdated: new Date().toISOString(),
    })),

  // Carga de datos
  loadElementDetail: (data) => set(data),

  clearElementDetail: () =>
    set({
      elementId: '' as GardenElementId,
      plants: [],
      elementActivities: [],
      plantActivities: [],
      actionPlans: [],
      alerts: [],
      lastUpdated: new Date().toISOString(),
    }),
}));


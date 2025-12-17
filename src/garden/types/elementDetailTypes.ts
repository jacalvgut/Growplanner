/**
 * Tipos relacionados con la vista detallada de un elemento
 */
import { GardenElementId } from './ids';
import { Plant } from './cultivationTypes';
import { ElementActivity, PlantActivity } from './activityTypes';
import { ActionPlan, Alert } from './planningTypes';

/**
 * Estado completo de un elemento con todos sus datos
 */
export interface ElementDetailState {
  elementId: GardenElementId;
  plants: Plant[];
  elementActivities: ElementActivity[];
  plantActivities: PlantActivity[];
  actionPlans: ActionPlan[];
  alerts: Alert[];
  lastUpdated: string;
}

/**
 * Acciones para gestionar el estado detallado de un elemento
 */
export interface ElementDetailActions {
  // Plantas
  addPlant: (plant: Plant) => void;
  updatePlant: (plantId: string, updates: Partial<Plant>) => void;
  deletePlant: (plantId: string) => void;
  movePlant: (plantId: string, position: { x: number; y: number }) => void;
  
  // Actividades de elemento
  addElementActivity: (activity: ElementActivity) => void;
  deleteElementActivity: (activityId: string) => void;
  
  // Actividades de planta
  addPlantActivity: (activity: PlantActivity) => void;
  deletePlantActivity: (activityId: string) => void;
  
  // Planes de acción
  addActionPlan: (plan: ActionPlan) => void;
  updateActionPlan: (planId: string, updates: Partial<ActionPlan>) => void;
  deleteActionPlan: (planId: string) => void;
  
  // Avisos
  markAlertCompleted: (alertId: string, completedDate: string) => void;
  
  // Carga de datos
  loadElementDetail: (data: ElementDetailState) => void;
  clearElementDetail: () => void;
}

/**
 * Store completo para detalles de elemento
 */
export type ElementDetailStore = ElementDetailState & ElementDetailActions;


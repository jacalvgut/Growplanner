/**
 * Tipos relacionados con actividades y eventos
 */
import { GardenElementId } from './ids';

/**
 * Tipo de actividad a nivel de elemento (bancal completo)
 */
export type ElementActivityType = 
  | 'riego'
  | 'abono'
  | 'limpieza_hierbas'
  | 'preparacion_suelo'
  | 'otro';

/**
 * Tipo de actividad a nivel de planta individual
 */
export type PlantActivityType = 
  | 'poda'
  | 'tutorizacion'
  | 'cosecha'
  | 'tratamiento'
  | 'observacion'
  | 'otro';

/**
 * Actividad registrada a nivel de elemento
 */
export interface ElementActivity {
  id: string;
  elementId: GardenElementId;
  type: ElementActivityType;
  date: string; // ISO date string
  notes?: string;
  createdAt: string;
}

/**
 * Actividad registrada a nivel de planta individual
 */
export interface PlantActivity {
  id: string;
  plantId: string;
  type: PlantActivityType;
  date: string; // ISO date string
  notes?: string;
  quantity?: number; // Para cosechas, cantidad cosechada
  unit?: string; // Unidad de medida (kg, unidades, etc.)
  createdAt: string;
}

/**
 * Datos para crear una actividad de elemento
 */
export interface CreateElementActivityData {
  type: ElementActivityType;
  date: string;
  notes?: string;
}

/**
 * Datos para crear una actividad de planta
 */
export interface CreatePlantActivityData {
  type: PlantActivityType;
  date: string;
  notes?: string;
  quantity?: number;
  unit?: string;
}


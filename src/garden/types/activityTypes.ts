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
  | 'airear_sustrato'
  | 'fungicida';

/**
 * Tipo de actividad específica para composteras
 */
export type CompostActivityType = 
  | 'alimentar'
  | 'remover'
  | 'regar';

/**
 * Tipo de actividad específica para círculos (árboles frutales)
 */
export type CircleActivityType = 
  | 'regar'
  | 'abonar'
  | 'quitar_hierbas'
  | 'podar';

/**
 * Tipo de actividad a nivel de planta individual
 */
export type PlantActivityType = 
  | 'poda'
  | 'tutorizacion'
  | 'cosecha'
  | 'tratamiento'
  | 'observacion'
  | 'riego'
  | 'abono'
  | 'fungicida'
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
  plantIds?: string[]; // IDs de plantas afectadas (para riego, abono, fungicida)
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
  plantIds?: string[]; // IDs de plantas afectadas (para riego, abono, fungicida)
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

/**
 * Actividad registrada para composteras
 */
export interface CompostActivity {
  id: string;
  elementId: GardenElementId;
  type: CompostActivityType;
  date: string; // ISO date string
  notes?: string;
  createdAt: string;
}

/**
 * Actividad registrada para círculos (árboles frutales)
 */
export interface CircleActivity {
  id: string;
  elementId: GardenElementId;
  type: CircleActivityType;
  date: string; // ISO date string
  notes?: string;
  createdAt: string;
}

/**
 * Datos para crear una actividad de compostera
 */
export interface CreateCompostActivityData {
  type: CompostActivityType;
  date: string;
  notes?: string;
}

/**
 * Datos para crear una actividad de círculo
 */
export interface CreateCircleActivityData {
  type: CircleActivityType;
  date: string;
  notes?: string;
}


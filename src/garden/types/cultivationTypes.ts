/**
 * Tipos relacionados con cultivos y plantas individuales
 */
import { GardenElementId } from './ids';

/**
 * Origen de la semilla o planta
 */
export type SeedOrigin = 'propia' | 'comprada' | 'intercambio' | 'otro';

/**
 * Estado de crecimiento de una planta
 */
export type PlantStatus = 
  | 'semilla'
  | 'germinando'
  | 'plántula'
  | 'creciendo'
  | 'floreciendo'
  | 'fructificando'
  | 'cosechado'
  | 'finalizado';

/**
 * Posición de una planta en el elemento (coordenadas relativas 0-100)
 */
export interface PlantPosition {
  x: number; // Porcentaje horizontal (0-100)
  y: number; // Porcentaje vertical (0-100)
}

/**
 * Planta individual con posición en el bancal
 */
export interface Plant {
  id: string;
  elementId: GardenElementId;
  variety: string; // Variedad de la planta
  commonName: string; // Nombre común (ej: "Cebolla")
  position: PlantPosition;
  plantedDate: string; // ISO date string
  germinatedFromSeed: boolean;
  seedOrigin?: SeedOrigin;
  seedOriginDetails?: string; // Detalles adicionales del origen
  status: PlantStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Datos para crear una nueva planta
 */
export interface CreatePlantData {
  variety: string;
  commonName: string;
  position: PlantPosition;
  plantedDate: string;
  germinatedFromSeed: boolean;
  seedOrigin?: SeedOrigin;
  seedOriginDetails?: string;
  notes?: string;
}

/**
 * Datos para crear múltiples plantas a la vez
 */
export interface CreateMultiplePlantsData {
  count: number;
  variety: string;
  commonName: string;
  plantedDate: string;
  germinatedFromSeed: boolean;
  seedOrigin?: SeedOrigin;
  seedOriginDetails?: string;
  notes?: string;
}


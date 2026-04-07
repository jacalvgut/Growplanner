/**
 * Tipos relacionados con el store del jardín
 */
import { GardenElement } from './elementTypes';
import type { GardenElementKey } from './ids';

/**
 * Estado del jardín en el store
 */
export interface GardenState {
  elements: GardenElement[];
  selectedElementId: GardenElementKey | null;
  hoveredElementId: GardenElementKey | null;
}

/**
 * Acciones del store del jardín
 */
export interface GardenActions {
  selectElement: (elementId: GardenElementKey | null) => void;
  hoverElement: (elementId: GardenElementKey | null) => void;
  addElement: (element: GardenElement) => void;
  removeElement: (elementId: GardenElementKey) => void;
  resetSelection: () => void;
}

/**
 * Store completo del jardín
 */
export type GardenStore = GardenState & GardenActions;


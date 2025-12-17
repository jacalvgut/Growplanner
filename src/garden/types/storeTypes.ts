/**
 * Tipos relacionados con el store del jardín
 */
import { GardenElement, GardenElementId } from './elementTypes';

/**
 * Estado del jardín en el store
 */
export interface GardenState {
  elements: GardenElement[];
  selectedElementId: GardenElementId | null;
  hoveredElementId: GardenElementId | null;
}

/**
 * Acciones del store del jardín
 */
export interface GardenActions {
  selectElement: (elementId: GardenElementId | null) => void;
  hoverElement: (elementId: GardenElementId | null) => void;
  addElement: (element: GardenElement) => void;
  removeElement: (elementId: GardenElementId) => void;
  resetSelection: () => void;
}

/**
 * Store completo del jardín
 */
export type GardenStore = GardenState & GardenActions;


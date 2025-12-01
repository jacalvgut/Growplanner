/**
 * Tipos e interfaces para el dominio del jardín
 * Usa discriminated unions para garantizar type safety
 */

/**
 * Identificadores únicos de los elementos del jardín
 */
export enum GardenElementId {
  GREENHOUSE = 'greenhouse',
  BED_1 = 'bed-1',
  BED_2 = 'bed-2',
  BED_3 = 'bed-3',
  BED_4 = 'bed-4',
  BED_5 = 'bed-5',
  COMPOST_NORTH = 'compost-north',
  COMPOST_SOUTH = 'compost-south',
  CIRCLE_BOTTOM_LEFT = 'circle-bottom-left',
  CIRCLE_IN_1 = 'circle-in-1',
  CIRCLE_IN_2 = 'circle-in-2',
  CIRCLE_RIGHT_1 = 'circle-right-1',
  CIRCLE_RIGHT_2 = 'circle-right-2',
  CIRCLE_RIGHT_3 = 'circle-right-3',
  CIRCLE_RIGHT_4 = 'circle-right-4',
  CIRCLE_BOTTOM_RIGHT = 'circle-bottom-right',
}

/**
 * Tipo de elemento del jardín
 */
export type GardenElementType = 
  | 'greenhouse'
  | 'bed'
  | 'compost'
  | 'circle'
  | 'tree';

/**
 * Orientación del elemento
 */
export type ElementOrientation = 'vertical' | 'horizontal';

/**
 * Base común para todos los elementos del jardín
 */
interface BaseGardenElement {
  id: GardenElementId;
  type: GardenElementType;
  name: string;
  displayName: string;
  className: string;
}

/**
 * Elemento de tipo invernadero
 */
export interface GreenhouseElement extends BaseGardenElement {
  type: 'greenhouse';
}

/**
 * Elemento de tipo bancal
 */
export interface BedElement extends BaseGardenElement {
  type: 'bed';
  orientation: ElementOrientation;
}

/**
 * Elemento de tipo compostera
 */
export interface CompostElement extends BaseGardenElement {
  type: 'compost';
}

/**
 * Elemento de tipo círculo (árbol)
 */
export interface CircleElement extends BaseGardenElement {
  type: 'circle';
  hasWrapper?: boolean; // Indica si necesita un div wrapper (como circle-bottom-right)
}

/**
 * Unión discriminada de todos los tipos de elementos
 */
export type GardenElement = 
  | GreenhouseElement
  | BedElement
  | CompostElement
  | CircleElement;

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


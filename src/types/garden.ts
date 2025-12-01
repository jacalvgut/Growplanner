/**
 * Tipos e interfaces para los elementos del jardín
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
 * Información de un elemento del jardín
 */
export interface GardenElement {
  id: GardenElementId;
  type: GardenElementType;
  name: string;
  displayName: string;
  orientation?: ElementOrientation;
  className: string;
}


/**
 * Tipos e interfaces para los elementos del jardín
 * Usa discriminated unions para garantizar type safety
 */

import type { GardenElementId } from './ids';

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


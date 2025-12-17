/**
 * Funciones de acceso al registry de elementos
 * Proporciona utilidades para obtener elementos del jardín
 */
import { GardenElement, GardenElementId } from '../types';
import { ELEMENT_REGISTRY } from './elements';
import { GARDEN_ELEMENTS_ORDER } from './order';

/**
 * Obtiene la configuración de un elemento por su ID
 */
export const getElementById = (id: GardenElementId): GardenElement => {
  const element = ELEMENT_REGISTRY[id];
  if (!element) {
    throw new Error(`Elemento del jardín no encontrado: ${id}`);
  }
  return element;
};

/**
 * Obtiene todos los elementos en el orden de renderizado
 */
export const getElementsInOrder = (): GardenElement[] => {
  return GARDEN_ELEMENTS_ORDER.map(getElementById);
};

/**
 * Obtiene el orden de renderizado de los elementos
 */
export const getRenderOrder = (): GardenElementId[] => {
  return GARDEN_ELEMENTS_ORDER;
};

/**
 * Verifica si un elemento necesita wrapper especial
 */
export const needsWrapper = (elementId: GardenElementId): boolean => {
  const element = getElementById(elementId);
  return element.type === 'circle' && element.hasWrapper === true;
};


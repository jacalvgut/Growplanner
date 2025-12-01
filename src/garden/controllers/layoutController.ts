/**
 * Controlador de layout del jardín
 * Centraliza la lógica relacionada con el layout y posicionamiento
 */
import { GardenElementId } from '../types';
import { getElementById, GARDEN_ELEMENTS_ORDER } from '../constants/elementRegistry';

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

/**
 * Obtiene todos los elementos en el orden de renderizado
 */
export const getOrderedElements = () => {
  return GARDEN_ELEMENTS_ORDER.map(getElementById);
};


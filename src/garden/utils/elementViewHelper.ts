/**
 * Utilidades para determinar qué vista mostrar según el tipo de elemento
 */
import { GardenElement, GardenElementId } from '../types';

/**
 * Determina si un elemento es un bancal
 */
export const isBedElement = (element: GardenElement): boolean => {
  return element.type === 'bed';
};

/**
 * Determina si un elemento es una compostera
 */
export const isCompostElement = (element: GardenElement): boolean => {
  return element.type === 'compost';
};

/**
 * Determina si un elemento es un círculo (árbol frutal)
 */
export const isCircleElement = (element: GardenElement): boolean => {
  return element.type === 'circle';
};

/**
 * Determina si un elemento es un invernadero
 */
export const isGreenhouseElement = (element: GardenElement): boolean => {
  return element.type === 'greenhouse';
};

/**
 * Obtiene el tipo de vista que debe mostrarse para un elemento
 */
export const getElementViewType = (element: GardenElement): 'bed' | 'compost' | 'circle' | 'greenhouse' => {
  if (isBedElement(element)) return 'bed';
  if (isCompostElement(element)) return 'compost';
  if (isCircleElement(element)) return 'circle';
  if (isGreenhouseElement(element)) return 'greenhouse';
  // Por defecto, tratar como bancal
  return 'bed';
};


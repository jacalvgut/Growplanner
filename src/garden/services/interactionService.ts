/**
 * Servicio de interacciones del jardín
 * Centraliza la lógica de negocio de interacciones con elementos
 */
import { GardenElementId } from '../types';

/**
 * Maneja la lógica de negocio del clic en un elemento del jardín
 * Retorna el ID del elemento para que el componente maneje la navegación
 * @param elementId - ID único del elemento
 * @returns El ID del elemento para navegación
 */
export const handleElementClick = (elementId: GardenElementId): GardenElementId => {
  // Retornar el ID para que el componente use React Router
  return elementId;
};


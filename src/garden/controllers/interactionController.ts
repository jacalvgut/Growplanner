/**
 * Controlador de interacciones del jardín
 * Centraliza toda la lógica de interacción con elementos
 * NOTA: No actualiza el store directamente, eso se hace desde los hooks
 */
import { GardenElementId } from '../types';
import { useGardenStore } from '../store/gardenStore';

/**
 * Maneja la lógica de negocio del clic en un elemento del jardín
 * @param elementId - ID único del elemento
 * @param elementName - Nombre descriptivo del elemento
 */
export const handleElementClick = (
  elementId: GardenElementId,
  elementName: string
): void => {
  // TODO: Implementar navegación a vista detallada del elemento
  // TODO: Implementar llamadas al backend para obtener datos del elemento
  console.log(`Elemento clickeado: ${elementId} - ${elementName}`);
  
  // Placeholder temporal: mostrar alerta
  alert(`Has hecho clic en: ${elementName}`);
};

/**
 * Maneja el hover sobre un elemento del jardín
 * @param elementId - ID único del elemento
 */
export const handleElementHover = (elementId: GardenElementId | null): void => {
  const { hoverElement } = useGardenStore.getState();
  hoverElement(elementId);
};

/**
 * Maneja el clic fuera de los elementos (deselección)
 */
export const handleClickOutside = (): void => {
  const { resetSelection } = useGardenStore.getState();
  resetSelection();
};


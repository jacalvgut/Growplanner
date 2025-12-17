/**
 * Punto de entrada de elementos
 * Combina todos los elementos en un solo registry
 */
import { GardenElement, GardenElementId } from '../../types';
import { greenhouseElement } from './greenhouse';
import { bedElements } from './beds';
import { compostElements } from './compost';
import { circleElements } from './circles';

/**
 * Configuración completa de todos los elementos del jardín
 * Mantiene exactamente las mismas clases CSS y propiedades que el sistema anterior
 */
export const ELEMENT_REGISTRY: Record<GardenElementId, GardenElement> = {
  [GardenElementId.GREENHOUSE]: greenhouseElement,
  ...bedElements,
  ...compostElements,
  ...circleElements,
};


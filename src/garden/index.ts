/**
 * Punto de entrada del módulo garden
 * Exporta todos los elementos públicos del dominio
 */

// Tipos
export * from './types';

// Componentes
export { GardenElement } from './components/GardenElement';
export { GardenLayout } from './components/GardenLayout';

// Hooks
export { useGardenStore, useGardenState, useGardenActions } from './hooks/useGardenStore';
export { useElementSelection } from './hooks/useElementSelection';
export { useElementHover } from './hooks/useElementHover';
export { useGardenCanvas } from './hooks/useGardenCanvas';

// Store
export { useGardenStore as useGardenStoreDirect } from './store/gardenStore';

// Controladores
export { handleElementClick, handleElementHover, handleClickOutside } from './controllers/interactionController';
export { getRenderOrder, needsWrapper, getOrderedElements } from './controllers/layoutController';

// Constantes y Registry
export { ELEMENT_REGISTRY, GARDEN_ELEMENTS_ORDER, getElementById, getElementsInOrder } from './constants/elementRegistry';


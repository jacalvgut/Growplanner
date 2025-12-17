/**
 * Punto de entrada del módulo garden
 * Exporta todos los elementos públicos del dominio
 */

// Tipos
export * from './types';

// Componentes
export { GardenElement } from './components/GardenElement';
export { GardenLayout } from './components/GardenLayout';

// Vistas
export { GardenView } from './views/GardenView';
export { ElementDetailView } from './views/ElementDetailView';

// Hooks
export { useGardenStore, useGardenState, useGardenActions } from './hooks/useGardenStore';
export { useElementSelection } from './hooks/useElementSelection';
export { useElementHover } from './hooks/useElementHover';
export { useElementDetail } from './hooks/useElementDetail';
export { useCultivation } from './hooks/useCultivation';
export { useActivities } from './hooks/useActivities';

// Store
export { useGardenStore as useGardenStoreDirect } from './store/gardenStore';
export { useElementDetailStore } from './store/elementDetailStore';

// Servicios
export { handleElementClick } from './services/interactionService';
export * from './services/cultivationService';
export * from './services/activityService';
export * from './services/planningService';
export * from './services/alertService';

// Adaptadores
export * from './adapters/apiAdapter';

// Constantes y Registry
export * from './constants';


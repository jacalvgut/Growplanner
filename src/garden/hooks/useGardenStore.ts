/**
 * Hook para acceder al store del jardín
 * Re-exporta el hook de Zustand con un nombre más semántico
 */
import { useGardenStore as useZustandStore } from '../store/gardenStore';
import { GardenStore } from '../types';

/**
 * Hook para acceder al store del jardín
 */
export const useGardenStore = (): GardenStore => {
  return useZustandStore();
};

/**
 * Hook selector para obtener solo el estado (sin acciones)
 */
export const useGardenState = () => {
  return useZustandStore((state) => ({
    elements: state.elements,
    selectedElementId: state.selectedElementId,
    hoveredElementId: state.hoveredElementId,
  }));
};

/**
 * Hook selector para obtener solo las acciones
 */
export const useGardenActions = () => {
  return useZustandStore((state) => ({
    selectElement: state.selectElement,
    hoverElement: state.hoverElement,
    addElement: state.addElement,
    removeElement: state.removeElement,
    resetSelection: state.resetSelection,
  }));
};


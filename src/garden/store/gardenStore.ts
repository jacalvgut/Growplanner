/**
 * Store global del jardín usando Zustand
 * Gestiona el estado de elementos, selección y hover sin lógica visual
 */
import { create } from 'zustand';
import type { GardenStore, GardenElementKey, GardenElement } from '../types';
import { getElementsInOrder } from '../constants';

/**
 * Store del jardín
 * Inicializa con todos los elementos en el orden correcto
 */
export const useGardenStore = create<GardenStore>((set) => ({
  // Estado inicial
  elements: getElementsInOrder(),
  selectedElementId: null,
  hoveredElementId: null,

  // Acciones
  selectElement: (elementId: GardenElementKey | null) => {
    set({ selectedElementId: elementId });
  },

  hoverElement: (elementId: GardenElementKey | null) => {
    set({ hoveredElementId: elementId });
  },

  addElement: (element: GardenElement) => {
    set((state) => ({
      elements: [...state.elements, element],
    }));
  },

  removeElement: (elementId: GardenElementKey) => {
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== elementId),
      selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId,
    }));
  },

  resetSelection: () => {
    set({ selectedElementId: null, hoveredElementId: null });
  },
}));


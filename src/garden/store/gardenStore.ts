/**
 * Store global del jardín usando Zustand
 * Gestiona el estado de elementos, selección y hover sin lógica visual
 */
import { create } from 'zustand';
import { GardenStore, GardenElementId, GardenElement } from '../types';
import { getElementsInOrder } from '../constants/elementRegistry';

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
  selectElement: (elementId: GardenElementId | null) => {
    set({ selectedElementId: elementId });
  },

  hoverElement: (elementId: GardenElementId | null) => {
    set({ hoveredElementId: elementId });
  },

  addElement: (element: GardenElement) => {
    set((state) => ({
      elements: [...state.elements, element],
    }));
  },

  removeElement: (elementId: GardenElementId) => {
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== elementId),
      selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId,
    }));
  },

  resetSelection: () => {
    set({ selectedElementId: null, hoveredElementId: null });
  },
}));


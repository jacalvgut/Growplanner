/**
 * Store para gestionar árboles frutales adicionales añadidos por el usuario
 */
import { create } from 'zustand';
import { FruitTree, FruitTreeId } from '../types';

/**
 * Estado del store de árboles frutales
 */
interface FruitTreesState {
  customTrees: FruitTree[]; // Árboles añadidos por el usuario
  addCustomTree: (tree: FruitTree) => void;
  removeCustomTree: (treeId: FruitTreeId) => void;
}

/**
 * Store de árboles frutales
 */
export const useFruitTreesStore = create<FruitTreesState>((set) => ({
  customTrees: [],

  addCustomTree: (tree) =>
    set((state) => ({
      customTrees: [...state.customTrees, tree],
    })),

  removeCustomTree: (treeId) =>
    set((state) => ({
      customTrees: state.customTrees.filter((t) => t.id !== treeId),
    })),
}));


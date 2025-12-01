/**
 * Hook para gestionar la selección de elementos
 */
import { useCallback } from 'react';
import { GardenElementId } from '../types';
import { useGardenStore } from './useGardenStore';
import { handleElementClick } from '../controllers/interactionController';
import { getElementById } from '../constants/elementRegistry';

/**
 * Hook para gestionar la selección de elementos
 */
export const useElementSelection = () => {
  const { selectedElementId, selectElement } = useGardenStore();

  const select = useCallback((elementId: GardenElementId) => {
    const element = getElementById(elementId);
    // Actualizar el store primero
    selectElement(elementId);
    // Luego ejecutar la lógica de negocio
    handleElementClick(elementId, element.name);
  }, [selectElement]);

  const deselect = useCallback(() => {
    selectElement(null);
  }, [selectElement]);

  const isSelected = useCallback((elementId: GardenElementId) => {
    return selectedElementId === elementId;
  }, [selectedElementId]);

  return {
    selectedElementId,
    select,
    deselect,
    isSelected,
  };
};


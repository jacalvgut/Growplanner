/**
 * Hook para gestionar la selección de elementos
 */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GardenElementKey } from '../types';
import { useGardenStore } from './useGardenStore';
import { handleElementClick } from '../services/interactionService';

/**
 * Hook para gestionar la selección de elementos
 */
export const useElementSelection = () => {
  const { selectedElementId, selectElement } = useGardenStore();
  const navigate = useNavigate();

  const select = useCallback((elementId: GardenElementKey, gardenId: string) => {
    // Actualizar el store primero
    selectElement(elementId);
    // Navegar a la vista detallada
    const targetId = handleElementClick(elementId);
    navigate(`/garden/${gardenId}/element/${targetId}`);
  }, [selectElement, navigate]);

  const deselect = useCallback(() => {
    selectElement(null);
  }, [selectElement]);

  const isSelected = useCallback((elementId: GardenElementKey) => {
    return selectedElementId === elementId;
  }, [selectedElementId]);

  return {
    selectedElementId,
    select,
    deselect,
    isSelected,
  };
};


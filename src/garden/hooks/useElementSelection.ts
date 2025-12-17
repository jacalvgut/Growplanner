/**
 * Hook para gestionar la selección de elementos
 */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GardenElementId } from '../types';
import { useGardenStore } from './useGardenStore';
import { handleElementClick } from '../services/interactionService';

/**
 * Hook para gestionar la selección de elementos
 */
export const useElementSelection = () => {
  const { selectedElementId, selectElement } = useGardenStore();
  const navigate = useNavigate();

  const select = useCallback((elementId: GardenElementId) => {
    // Actualizar el store primero
    selectElement(elementId);
    // Navegar a la vista detallada
    const targetId = handleElementClick(elementId);
    navigate(`/element/${targetId}`);
  }, [selectElement, navigate]);

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


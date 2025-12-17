/**
 * Hook para gestionar el hover sobre elementos
 */
import { useCallback } from 'react';
import { GardenElementId } from '../types';
import { useGardenStore } from './useGardenStore';

/**
 * Hook para gestionar el hover sobre elementos
 */
export const useElementHover = () => {
  const { hoveredElementId, hoverElement } = useGardenStore();

  const onHover = useCallback((elementId: GardenElementId | null) => {
    hoverElement(elementId);
  }, [hoverElement]);

  const onHoverEnd = useCallback(() => {
    hoverElement(null);
  }, [hoverElement]);

  const isHovered = useCallback((elementId: GardenElementId) => {
    return hoveredElementId === elementId;
  }, [hoveredElementId]);

  return {
    hoveredElementId,
    onHover,
    onHoverEnd,
    isHovered,
  };
};


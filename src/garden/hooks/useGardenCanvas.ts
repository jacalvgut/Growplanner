/**
 * Hook para gestionar el canvas del jardín
 * Proporciona funcionalidades relacionadas con el contenedor del jardín
 */
import { useGardenStore } from './useGardenStore';
import { getRenderOrder } from '../controllers/layoutController';

/**
 * Hook para gestionar el canvas del jardín
 */
export const useGardenCanvas = () => {
  const { elements, resetSelection } = useGardenStore();
  const renderOrder = getRenderOrder();

  const handleCanvasClick = () => {
    resetSelection();
  };

  return {
    elements,
    renderOrder,
    handleCanvasClick,
  };
};


/**
 * Componente reutilizable para los elementos interactuables del jardín
 */
import React from 'react';
import { GardenElement } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

interface GardenElementButtonProps {
  element: GardenElement;
}

/**
 * Botón genérico para elementos del jardín
 * @param element - Configuración del elemento del jardín
 */
export const GardenElementButton: React.FC<GardenElementButtonProps> = ({ element }) => {
  const handleClick = (): void => {
    handleElementClick(element.id, element.name);
  };

  return (
    <button
      className={element.className}
      onClick={handleClick}
      aria-label={`Ver detalles de ${element.displayName}`}
    >
      {element.displayName}
    </button>
  );
};


/**
 * Componente genérico para renderizar cualquier elemento del jardín
 * Reemplaza todos los componentes duplicados (Bed1, Bed2, CircleRight3, etc.)
 */
import React from 'react';
import { GardenElement as GardenElementType } from '../types';
import { useElementSelection } from '../hooks/useElementSelection';
import { useElementHover } from '../hooks/useElementHover';
import type { GardenDesignElement } from '../../gardens/types';

interface GardenElementProps {
  element: GardenElementType;
  gardenId: string;
  design?: GardenDesignElement;
}

/**
 * Componente genérico de elemento del jardín
 * Renderiza el elemento con su clase CSS correspondiente
 * Maneja automáticamente el caso especial de elementos con wrapper
 */
export const GardenElement: React.FC<GardenElementProps> = ({ element, gardenId, design }) => {
  const { select, isSelected } = useElementSelection();
  const { onHover, onHoverEnd, isHovered } = useElementHover();

  const handleClick = (): void => {
    select(element.id, gardenId);
  };

  const handleMouseEnter = (): void => {
    onHover(element.id);
  };

  const handleMouseLeave = (): void => {
    onHoverEnd();
  };

  // Renderizar el botón base
  const button = (
    <button
      className={element.className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`Ver detalles de ${element.displayName}`}
      aria-selected={isSelected(element.id)}
      data-element-id={element.id}
      style={
        design
          ? {
              position: 'absolute',
              left: `${design.xPct}%`,
              top: `${design.yPct}%`,
              width: `${design.wPct}%`,
              height: `${design.hPct}%`,
              borderRadius: design.shape === 'circle' ? '999px' : undefined,
            }
          : undefined
      }
    >
      {element.displayName}
    </button>
  );

  // En modo data-driven no necesitamos wrappers especiales.
  return button;
};


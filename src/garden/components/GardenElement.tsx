/**
 * Componente genérico para renderizar cualquier elemento del jardín
 * Reemplaza todos los componentes duplicados (Bed1, Bed2, CircleRight3, etc.)
 */
import React from 'react';
import { GardenElement as GardenElementType } from '../types';
import { useElementSelection } from '../hooks/useElementSelection';
import { useElementHover } from '../hooks/useElementHover';

interface GardenElementProps {
  element: GardenElementType;
}

/**
 * Componente genérico de elemento del jardín
 * Renderiza el elemento con su clase CSS correspondiente
 * Maneja automáticamente el caso especial de elementos con wrapper
 */
export const GardenElement: React.FC<GardenElementProps> = ({ element }) => {
  const { select, isSelected } = useElementSelection();
  const { onHover, onHoverEnd, isHovered } = useElementHover();

  const handleClick = (): void => {
    select(element.id);
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
    >
      {element.displayName}
    </button>
  );

  // Si el elemento necesita wrapper (como circle-bottom-right)
  if (element.type === 'circle' && element.hasWrapper) {
    return (
      <div className="right-bottom-rect">
        {button}
      </div>
    );
  }

  // Renderizado normal sin wrapper
  return button;
};


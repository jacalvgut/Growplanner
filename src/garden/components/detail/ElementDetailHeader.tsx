/**
 * Header de la vista detallada
 * Muestra el nombre del elemento y botón de volver
 */
import React from 'react';
import { GardenElement } from '../../types';

interface ElementDetailHeaderProps {
  element: GardenElement;
  onBack: () => void;
}

/**
 * Header de la vista detallada
 */
export const ElementDetailHeader: React.FC<ElementDetailHeaderProps> = ({
  element,
  onBack,
}) => {
  return (
    <header className="element-detail-header">
      <button className="back-button" onClick={onBack} aria-label="Volver al jardín">
        ← Volver
      </button>
      <h1 className="element-detail-title">{element.displayName}</h1>
    </header>
  );
};


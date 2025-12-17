/**
 * Layout principal de la vista detallada de un elemento
 * Organiza todas las secciones de información
 */
import React from 'react';
import { GardenElement } from '../../types';
import { ElementDetailHeader } from './ElementDetailHeader';
import { ElementDetailContent } from './ElementDetailContent';

interface ElementDetailLayoutProps {
  element: GardenElement;
  detailData: ReturnType<typeof import('../../hooks/useElementDetail').useElementDetail>;
  onBack: () => void;
}

/**
 * Layout de la vista detallada
 */
export const ElementDetailLayout: React.FC<ElementDetailLayoutProps> = ({
  element,
  detailData,
  onBack,
}) => {
  return (
    <div className="element-detail-page">
      <ElementDetailHeader element={element} onBack={onBack} />
      <ElementDetailContent element={element} detailData={detailData} />
    </div>
  );
};


/**
 * Vista detallada para bancales
 * Mantiene la funcionalidad completa con plantas, actividades y avisos
 */
import React from 'react';
import { GardenElement } from '../types';
import { ElementDetailHeader } from '../components/detail/ElementDetailHeader';
import { ElementDetailContent } from '../components/detail/ElementDetailContent';

interface BedDetailViewProps {
  element: GardenElement;
  detailData: ReturnType<typeof import('../hooks/useElementDetail').useElementDetail>;
  onBack: () => void;
}

/**
 * Vista detallada de un bancal
 */
export const BedDetailView: React.FC<BedDetailViewProps> = ({
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


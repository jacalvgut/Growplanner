/**
 * Vista detallada para invernadero
 * Mantiene la versión actual (el usuario hará modificaciones después)
 */
import React from 'react';
import { GardenElement } from '../types';
import { ElementDetailHeader } from '../components/detail/ElementDetailHeader';
import { ElementDetailContent } from '../components/detail/ElementDetailContent';

interface GreenhouseDetailViewProps {
  element: GardenElement;
  detailData: ReturnType<typeof import('../hooks/useElementDetail').useElementDetail>;
  onBack: () => void;
}

/**
 * Vista detallada de un invernadero
 */
export const GreenhouseDetailView: React.FC<GreenhouseDetailViewProps> = ({
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


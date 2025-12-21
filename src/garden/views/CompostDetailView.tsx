/**
 * Vista detallada para composteras
 * Muestra acciones específicas: alimentar, remover, regar
 */
import React from 'react';
import { GardenElement } from '../types';
import { ElementDetailHeader } from '../components/detail/ElementDetailHeader';
import { CompostActions } from '../components/detail/compost/CompostActions';
import { ActivityTimeline } from '../components/detail/ActivityTimeline';
import { AlertsPanel } from '../components/detail/AlertsPanel';

interface CompostDetailViewProps {
  element: GardenElement;
  detailData: ReturnType<typeof import('../hooks/useElementDetail').useElementDetail>;
  onBack: () => void;
}

/**
 * Vista detallada de una compostera
 */
export const CompostDetailView: React.FC<CompostDetailViewProps> = ({
  element,
  detailData,
  onBack,
}) => {
  return (
    <div className="element-detail-page">
      <ElementDetailHeader element={element} onBack={onBack} />
      <div className="element-detail-content">
        <div className="element-detail-main">
          <CompostActions element={element} detailData={detailData} />
        </div>
        <div className="element-detail-sidebar">
          <ActivityTimeline detailData={detailData} />
          <AlertsPanel detailData={detailData} />
        </div>
      </div>
    </div>
  );
};


/**
 * Vista detallada para círculos (árboles frutales)
 * Muestra acciones específicas: regar, abonar, quitar hierbas, podar
 */
import React from 'react';
import { GardenElement } from '../types';
import { ElementDetailHeader } from '../components/detail/ElementDetailHeader';
import { CircleActions } from '../components/detail/circle/CircleActions';
import { ActivityTimeline } from '../components/detail/ActivityTimeline';
import { AlertsPanel } from '../components/detail/AlertsPanel';

interface CircleDetailViewProps {
  element: GardenElement;
  detailData: ReturnType<typeof import('../hooks/useElementDetail').useElementDetail>;
  onBack: () => void;
}

/**
 * Vista detallada de un círculo (árbol frutal)
 */
export const CircleDetailView: React.FC<CircleDetailViewProps> = ({
  element,
  detailData,
  onBack,
}) => {
  return (
    <div className="element-detail-page">
      <ElementDetailHeader element={element} onBack={onBack} />
      <div className="element-detail-content">
        <div className="element-detail-main">
          <CircleActions element={element} detailData={detailData} />
        </div>
        <div className="element-detail-sidebar">
          <ActivityTimeline detailData={detailData} />
          <AlertsPanel detailData={detailData} />
        </div>
      </div>
    </div>
  );
};


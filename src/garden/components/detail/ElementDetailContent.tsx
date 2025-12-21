/**
 * Contenido principal de la vista detallada
 * Organiza las diferentes secciones
 */
import React from 'react';
import { GardenElement } from '../../types';
import { PlantCanvas } from './PlantCanvas';
import { ActivityTimeline } from './ActivityTimeline';
import { AlertsPanel } from './AlertsPanel';
import { BackendConnectionError } from './BackendConnectionError';

interface ElementDetailContentProps {
  element: GardenElement;
  detailData: ReturnType<typeof import('../../hooks/useElementDetail').useElementDetail>;
}

/**
 * Contenido de la vista detallada
 */
export const ElementDetailContent: React.FC<ElementDetailContentProps> = ({
  element,
  detailData,
}) => {
  // Mostrar error si hay problema de conexión
  if (detailData.error) {
    const isConnectionError =
      detailData.error.message.includes('conectar') ||
      detailData.error.message.includes('Failed to fetch') ||
      detailData.error.message.includes('ERR_CONNECTION_REFUSED');

    if (isConnectionError) {
      return (
        <BackendConnectionError
          onRetry={detailData.reload ? () => detailData.reload() : undefined}
        />
      );
    }
  }

  if (detailData.loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Cargando datos del elemento...</p>
      </div>
    );
  }

  return (
    <div className="element-detail-content">
      <div className="element-detail-main">
        <PlantCanvas 
          element={element} 
          detailData={detailData}
        />
      </div>
      <div className="element-detail-sidebar">
        <ActivityTimeline detailData={detailData} />
        <AlertsPanel detailData={detailData} />
      </div>
    </div>
  );
};


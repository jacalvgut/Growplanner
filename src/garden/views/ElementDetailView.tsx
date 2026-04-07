/**
 * Vista detallada de un elemento del jardín
 * Orquestador que decide qué vista específica mostrar según el tipo de elemento
 */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { GardenElement } from '../types';
import { useElementDetail } from '../hooks/useElementDetail';
import { getElementViewType } from '../utils/elementViewHelper';
import { BedDetailView } from './BedDetailView';
import { CompostDetailView } from './CompostDetailView';
import { CircleDetailView } from './CircleDetailView';
import { GreenhouseDetailView } from './GreenhouseDetailView';
import * as gardenService from '../../gardens/services/gardenService';
import type { Garden as GardenModel } from '../../gardens/types';

/**
 * Vista detallada de un elemento (orquestador)
 */
export const ElementDetailView: React.FC = () => {
  const { gardenId, elementId } = useParams<{ gardenId: string; elementId: string }>();
  const navigate = useNavigate();
  const [garden, setGarden] = React.useState<GardenModel | null>(null);
  const [gardenError, setGardenError] = React.useState<string | null>(null);

  if (!gardenId || !elementId) {
    navigate('/');
    return null;
  }

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const g = await gardenService.getGarden(gardenId);
        if (!cancelled) setGarden(g);
      } catch (e) {
        if (!cancelled) setGardenError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gardenId]);

  const designEl = garden?.elements.find((e) => e.id === elementId) ?? null;
  const detailData = useElementDetail(elementId);

  const handleBack = () => {
    // Limpiar el store al salir
    detailData.clearElementDetail();
    navigate(`/garden/${gardenId}`);
  };

  if (gardenError) {
    return (
      <div className="page">
        <div style={{ padding: '1rem' }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>No se pudo cargar la huerta</div>
          <div style={{ marginBottom: 12 }}>{gardenError}</div>
          <button onClick={handleBack}>Volver</button>
        </div>
      </div>
    );
  }

  if (!garden || !designEl) {
    return null;
  }

  const element: GardenElement = {
    id: designEl.id,
    type:
      designEl.type === 'tree'
        ? 'circle'
        : (designEl.type as any),
    name: designEl.label,
    displayName: designEl.label,
    className: 'zone',
  };

  // Determinar qué vista mostrar según el tipo de elemento
  const viewType = getElementViewType(element);

  // Elementos decorativos o no soportados aún: mostrar pantalla mínima.
  if (designEl.type === 'fence' || designEl.type === 'gate' || designEl.type === 'path') {
    return (
      <div className="page">
        <div style={{ padding: '1rem', width: 'min(900px, 92vw)' }}>
          <button onClick={handleBack} style={{ marginBottom: 12 }}>
            Volver
          </button>
          <h2 style={{ margin: 0 }}>{designEl.label}</h2>
          <p style={{ opacity: 0.85 }}>Elemento de tipo: <strong>{designEl.type}</strong></p>
        </div>
      </div>
    );
  }

  switch (viewType) {
    case 'bed':
      return (
        <BedDetailView
          element={element}
          detailData={detailData}
          onBack={handleBack}
        />
      );
    case 'compost':
      return (
        <CompostDetailView
          element={element}
          detailData={detailData}
          onBack={handleBack}
        />
      );
    case 'circle':
      return (
        <CircleDetailView
          element={element}
          detailData={detailData}
          onBack={handleBack}
        />
      );
    case 'greenhouse':
      return (
        <GreenhouseDetailView
          element={element}
          detailData={detailData}
          onBack={handleBack}
        />
      );
    default:
      // Por defecto, mostrar vista de bancal
      return (
        <BedDetailView
          element={element}
          detailData={detailData}
          onBack={handleBack}
        />
      );
  }
};


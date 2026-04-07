/**
 * Vista principal del jardín
 * Muestra el layout completo del huerto
 */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GardenLayout } from '../components/GardenLayout';
import { FrutalesButton } from '../../ui/components/FrutalesButton';
import * as gardenService from '../../gardens/services/gardenService';
import type { Garden } from '../../gardens/types';

/**
 * Vista principal del jardín
 */
export const GardenView: React.FC = () => {
  const { gardenId } = useParams<{ gardenId: string }>();
  const navigate = useNavigate();
  const [garden, setGarden] = React.useState<Garden | null>(null);

  if (!gardenId) {
    navigate('/');
    return null;
  }

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const g = await gardenService.getGarden(gardenId);
        if (!cancelled) setGarden(g);
      } catch {
        // Si falla, dejamos el botón por defecto (visible) para no bloquear UI.
        if (!cancelled) setGarden(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gardenId]);

  return (
    <div className="page">
      <div className="garden-container">
        <button
          className="garden-view__backBtn"
          onClick={() => navigate('/')}
          aria-label="Volver al selector de huertas"
        >
          Volver
        </button>
        <GardenLayout gardenId={gardenId} />
        {(garden?.showFrutalesButton ?? true) && <FrutalesButton />}
        <button
          className="garden-view__editBtn"
          onClick={() => navigate(`/garden/${gardenId}/edit`)}
          aria-label="Editar diseño de la huerta"
        >
          Editar huerta
        </button>
      </div>
    </div>
  );
};


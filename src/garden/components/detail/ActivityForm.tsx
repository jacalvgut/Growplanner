/**
 * Formulario para registrar una actividad
 */
import React, { useState } from 'react';
import { GardenElement, ElementActivityType, CreateElementActivityData } from '../../types';
import { useActivities } from '../../hooks/useActivities';
import { useElementDetail } from '../../hooks/useElementDetail';

interface ActivityFormProps {
  element: GardenElement;
  activityType: ElementActivityType;
  onClose: () => void;
}

/**
 * Formulario de actividad
 */
export const ActivityForm: React.FC<ActivityFormProps> = ({
  element,
  activityType,
  onClose,
}) => {
  const { addElementActivity } = useActivities(element.id);
  const detailData = useElementDetail(element.id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data: CreateElementActivityData = {
        type: activityType,
        date,
        notes,
      };
      await addElementActivity(data);
      // Recargar datos después de crear
      if (detailData.reload) {
        await detailData.reload();
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar la actividad');
      console.error('Error creating activity:', err);
    } finally {
      setLoading(false);
    }
  };

  const activityLabels: Record<ElementActivityType, string> = {
    riego: 'Riego',
    abono: 'Abono',
    limpieza_hierbas: 'Limpieza de hierbas',
    preparacion_suelo: 'Preparación de suelo',
    otro: 'Otra actividad',
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Registrar {activityLabels[activityType]}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Notas:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Observaciones, cantidad, método utilizado..."
            />
          </div>
          {error && (
            <div className="form-error" style={{ color: 'red', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


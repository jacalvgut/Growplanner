/**
 * Formulario para registrar actividades de composteras
 */
import React, { useState } from 'react';
import { GardenElement, CompostActivityType, CreateCompostActivityData } from '../../../types';
import { useCompostActivities } from '../../../hooks/useCompostActivities';

interface CompostActivityFormProps {
  element: GardenElement;
  activityType: CompostActivityType;
  onClose: () => void;
  onSuccess?: () => void;
}

/**
 * Formulario de actividad de compostera
 */
export const CompostActivityForm: React.FC<CompostActivityFormProps> = ({
  element,
  activityType,
  onClose,
  onSuccess,
}) => {
  const { addCompostActivity } = useCompostActivities(element.id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data: CreateCompostActivityData = {
        type: activityType,
        date,
        notes,
      };
      await addCompostActivity(data);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar la actividad');
      console.error('Error creating compost activity:', err);
    } finally {
      setLoading(false);
    }
  };

  const activityLabels: Record<CompostActivityType, string> = {
    alimentar: 'Alimentar',
    remover: 'Remover',
    regar: 'Regar',
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


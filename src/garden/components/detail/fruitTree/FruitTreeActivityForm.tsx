/**
 * Formulario para registrar actividades de árboles frutales
 */
import React, { useState } from 'react';
import { FruitTree, FruitTreeActivityType, CreateFruitTreeActivityData } from '../../../types';
import { useFruitTreeActivities } from '../../../hooks/useFruitTreeActivities';

interface FruitTreeActivityFormProps {
  tree: FruitTree;
  activityType: FruitTreeActivityType;
  onClose: () => void;
  onSuccess?: () => void;
}

/**
 * Formulario de actividad de árbol frutal
 */
export const FruitTreeActivityForm: React.FC<FruitTreeActivityFormProps> = ({
  tree,
  activityType,
  onClose,
  onSuccess,
}) => {
  const { addFruitTreeActivity } = useFruitTreeActivities(tree.id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data: CreateFruitTreeActivityData = {
        type: activityType,
        date,
        notes,
      };
      await addFruitTreeActivity(data);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar la actividad');
      console.error('Error creating fruit tree activity:', err);
    } finally {
      setLoading(false);
    }
  };

  const activityLabels: Record<FruitTreeActivityType, string> = {
    riego: 'Riego',
    poda: 'Poda',
    abono: 'Abono',
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


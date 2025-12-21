/**
 * Flujo completo de registro de actividades
 * 1. Selección de plantas
 * 2. Selección de actividad
 * 3. Fecha y notas
 * 4. Guardar
 */
import React, { useState } from 'react';
import { GardenElement, ElementActivityType, CreateElementActivityData } from '../../types';
import { useActivities } from '../../hooks/useActivities';
import { useElementDetail } from '../../hooks/useElementDetail';

interface ActivityRegistrationFlowProps {
  element: GardenElement;
  selectedPlantIds: string[];
  onClose: () => void;
  onSelectionComplete: () => void;
}

type FlowStep = 'selection' | 'activity';

/**
 * Flujo de registro de actividades
 */
export const ActivityRegistrationFlow: React.FC<ActivityRegistrationFlowProps> = ({
  element,
  selectedPlantIds,
  onClose,
  onSelectionComplete,
}) => {
  const { addElementActivity } = useActivities(element.id);
  const detailData = useElementDetail(element.id);
  const [step, setStep] = useState<FlowStep>('activity');
  const [activityType, setActivityType] = useState<ElementActivityType | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activityTypes: { type: ElementActivityType; label: string }[] = [
    { type: 'riego', label: 'Regar' },
    { type: 'abono', label: 'Abonar' },
    { type: 'limpieza_hierbas', label: 'Limpiar hierbas' },
    { type: 'airear_sustrato', label: 'Airear Sustrato' },
    { type: 'fungicida', label: 'Fungicida' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activityType) {
      setError('Por favor selecciona un tipo de actividad');
      return;
    }

    if (selectedPlantIds.length === 0) {
      setError('Por favor selecciona al menos una planta');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data: CreateElementActivityData = {
        type: activityType,
        date,
        notes,
        plantIds: selectedPlantIds,
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

  const plantedPlants = detailData.plants.filter(p => p.isPlanted);
  const selectedCount = selectedPlantIds.length;
  const allSelected = selectedCount === plantedPlants.length && plantedPlants.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Registrar Actividad</h2>
        
        {/* Información de plantas seleccionadas */}
        <div className="selected-plants-summary">
          <p>
            {allSelected 
              ? `Todas las plantas seleccionadas (${selectedCount})`
              : `${selectedCount} planta(s) seleccionada(s)`
            }
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tipo de actividad:</label>
            <div className="activity-type-buttons">
              {activityTypes.map(({ type, label }) => (
                <button
                  key={type}
                  type="button"
                  className={`activity-type-button ${activityType === type ? 'active' : ''}`}
                  onClick={() => setActivityType(type)}
                >
                  {label}
                </button>
              ))}
            </div>
            {!activityType && (
              <p className="form-hint">Selecciona un tipo de actividad</p>
            )}
          </div>

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
            <label>Notas (opcional):</label>
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
            <button 
              type="button" 
              onClick={onClose} 
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading || !activityType || selectedPlantIds.length === 0}
            >
              {loading ? 'Registrando...' : 'Guardar actividad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


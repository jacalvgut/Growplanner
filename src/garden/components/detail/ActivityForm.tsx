/**
 * Formulario para registrar una actividad
 */
import React, { useState } from 'react';
import { GardenElement, ElementActivityType, CreateElementActivityData, CreatePlantActivityData } from '../../types';
import { useActivities } from '../../hooks/useActivities';
import { useElementDetail } from '../../hooks/useElementDetail';
import { PlantSelectionForm } from './PlantSelectionForm';

interface ActivityFormProps {
  element: GardenElement;
  activityType: ElementActivityType;
  onClose: () => void;
  onPlantSelectionMode?: (enabled: boolean) => void;
  selectedPlantIds?: string[];
  onSelectedPlantIdsChange?: (plantIds: string[]) => void;
}

/**
 * Actividades que requieren selección de plantas
 */
const PLANT_SELECTION_ACTIVITIES: ElementActivityType[] = ['riego', 'abono', 'fungicida'];

/**
 * Formulario de actividad
 */
export const ActivityForm: React.FC<ActivityFormProps> = ({
  element,
  activityType,
  onClose,
  onPlantSelectionMode,
  selectedPlantIds: externalSelectedPlantIds,
  onSelectedPlantIdsChange,
}) => {
  const { addElementActivity } = useActivities(element.id);
  const detailData = useElementDetail(element.id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [showPlantSelection, setShowPlantSelection] = useState(
    PLANT_SELECTION_ACTIVITIES.includes(activityType)
  );
  const [internalSelectedPlantIds, setInternalSelectedPlantIds] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState<'all' | 'individual'>('all');

  // Usar IDs externos si están disponibles, sino usar los internos
  const selectedPlantIds = externalSelectedPlantIds ?? internalSelectedPlantIds;
  const setSelectedPlantIds = onSelectedPlantIdsChange ?? setInternalSelectedPlantIds;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Actividades que requieren selección de plantas
  const requiresPlantSelection = PLANT_SELECTION_ACTIVITIES.includes(activityType);

  const handlePlantSelection = (plantIds: string[]) => {
    setSelectedPlantIds(plantIds);
    setShowPlantSelection(false);
    if (onPlantSelectionMode) {
      onPlantSelectionMode(false);
    }
  };

  const handleSelectAll = () => {
    const plantedPlants = detailData.plants.filter(p => p.isPlanted);
    setSelectedPlantIds(plantedPlants.map(p => p.id));
    setSelectionMode('all');
    setShowPlantSelection(false);
    // NO activar modo selección visual, solo guardar los IDs
    if (onPlantSelectionMode) {
      onPlantSelectionMode(false);
    }
  };

  const handleModeChange = (mode: 'all' | 'individual') => {
    if (mode === 'individual' && onPlantSelectionMode) {
      onPlantSelectionMode(true);
    } else if (mode === 'all' && onPlantSelectionMode) {
      onPlantSelectionMode(false);
    }
  };

  const handleConfirmSelection = () => {
    setSelectionMode('individual');
    setShowPlantSelection(false);
    // Activar modo de selección en el canvas
    if (onPlantSelectionMode) {
      onPlantSelectionMode(true);
    }
    // El formulario permanece abierto pero sin el modal overlay para permitir selección
    // NO limpiar selectedPlantIds aquí, mantener lo que ya se haya seleccionado
  };

  const handlePlantClick = (plantId: string) => {
    setSelectedPlantIds(prev => {
      if (prev.includes(plantId)) {
        return prev.filter(id => id !== plantId);
      } else {
        return [...prev, plantId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Siempre crear actividad de elemento, pero incluir plantIds si hay plantas seleccionadas
      const data: CreateElementActivityData = {
        type: activityType,
        date,
        notes,
        ...(requiresPlantSelection && selectedPlantIds.length > 0 && {
          plantIds: selectedPlantIds,
        }),
      };
      await addElementActivity(data);
      
      // Recargar datos después de crear
      if (detailData.reload) {
        await detailData.reload();
      }
      
      // Limpiar selección y desactivar modo selección
      setSelectedPlantIds([]);
      if (onPlantSelectionMode) {
        onPlantSelectionMode(false);
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
    airear_sustrato: 'Airear Sustrato',
    fungicida: 'Fungicida',
  };

  // Mostrar formulario de selección de plantas si es necesario
  if (showPlantSelection && requiresPlantSelection) {
    return (
      <PlantSelectionForm
        plants={detailData.plants}
        activityType={activityType}
        onSelectAll={handleSelectAll}
        onSelectPlants={handleConfirmSelection}
        onCancel={() => {
          setShowPlantSelection(false);
          setSelectedPlantIds([]);
          if (onPlantSelectionMode) {
            onPlantSelectionMode(false);
          }
          onClose();
        }}
        onPlantClick={handlePlantClick}
        selectedPlantIds={selectedPlantIds}
        selectionMode={selectionMode}
        onModeChange={handleModeChange}
      />
    );
  }

  // Si está en modo selección individual, no mostrar overlay para permitir clics en el canvas
  const isInSelectionMode = requiresPlantSelection && selectionMode === 'individual';
  
  // Determinar si debemos mostrar overlay normal o transparente
  // Si hay plantas seleccionadas (modo 'all' o 'individual'), usar overlay transparente para evitar cierre accidental
  const hasSelectedPlants = requiresPlantSelection && selectedPlantIds.length > 0;
  const shouldShowNormalOverlay = !isInSelectionMode && !hasSelectedPlants;
  
  const handleOverlayClick = () => {
    // Solo cerrar si no hay plantas seleccionadas
    if (!hasSelectedPlants) {
      onClose();
    }
  };
  
  return (
    <>
      {shouldShowNormalOverlay && (
        <div className="modal-overlay" onClick={handleOverlayClick} />
      )}
      {!shouldShowNormalOverlay && (
        <div className="modal-overlay-transparent" />
      )}
      <div 
        className={`modal-content ${isInSelectionMode ? 'no-overlay' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Registrar {activityLabels[activityType]}</h2>
        {isInSelectionMode && (
          <div className="selection-mode-active-info">
            <p>💡 Modo selección activo: Haz clic en las plantas del bancal para seleccionarlas</p>
            {selectedPlantIds.length > 0 && (
              <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                {selectedPlantIds.length} planta(s) seleccionada(s)
              </p>
            )}
          </div>
        )}
        {requiresPlantSelection && selectedPlantIds.length > 0 && (
          <div className="selected-plants-info">
            <p>
              {selectionMode === 'all' 
                ? `Se aplicará a todas las plantas (${selectedPlantIds.length})`
                : `Se aplicará a ${selectedPlantIds.length} planta(s) seleccionada(s)`
              }
            </p>
          </div>
        )}
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
            <button 
              type="button" 
              onClick={() => {
                setSelectedPlantIds([]);
                if (onPlantSelectionMode) {
                  onPlantSelectionMode(false);
                }
                onClose();
              }} 
              disabled={loading}
            >
              Cancelar
            </button>
            {requiresPlantSelection && (
              <button
                type="button"
                onClick={() => {
                  // Si ya hay plantas seleccionadas, limpiar y volver a seleccionar
                  if (selectedPlantIds.length > 0) {
                    setSelectedPlantIds([]);
                    if (onPlantSelectionMode) {
                      onPlantSelectionMode(false);
                    }
                  }
                  setShowPlantSelection(true);
                }}
                disabled={loading}
              >
                {selectedPlantIds.length > 0 ? 'Cambiar selección' : 'Seleccionar plantas'}
              </button>
            )}
            <button 
              type="submit" 
              disabled={loading || (requiresPlantSelection && selectedPlantIds.length === 0)}
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};


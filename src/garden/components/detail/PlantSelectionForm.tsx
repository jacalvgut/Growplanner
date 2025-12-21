/**
 * Formulario para seleccionar plantas antes de registrar una actividad
 * Permite seleccionar todas las plantas o plantas individuales
 */
import React, { useState } from 'react';
import { Plant, ElementActivityType } from '../../types';

interface PlantSelectionFormProps {
  plants: Plant[];
  activityType: ElementActivityType;
  onSelectAll: () => void;
  onSelectPlants: () => void;
  onCancel: () => void;
  onPlantClick?: (plantId: string) => void;
  selectedPlantIds?: string[];
  selectionMode?: 'all' | 'individual';
  onModeChange?: (mode: 'all' | 'individual') => void;
}

/**
 * Formulario de selección de plantas
 */
export const PlantSelectionForm: React.FC<PlantSelectionFormProps> = ({
  plants,
  activityType,
  onSelectAll,
  onSelectPlants,
  onCancel,
  onPlantClick,
  selectedPlantIds = [],
  selectionMode = 'all',
  onModeChange,
}) => {
  const [mode, setMode] = useState<'all' | 'individual'>(selectionMode);

  // Filtrar solo plantas plantadas
  const plantedPlants = plants.filter(p => p.isPlanted);

  const handleModeChange = (newMode: 'all' | 'individual') => {
    setMode(newMode);
    if (onModeChange) {
      onModeChange(newMode);
    }
  };

  const handlePlantToggle = (plantId: string) => {
    if (mode !== 'individual') return;
    
    // Notificar al componente padre directamente
    if (onPlantClick) {
      onPlantClick(plantId);
    }
  };

  const handleConfirm = () => {
    if (mode === 'all') {
      onSelectAll();
    } else {
      // onSelectPlants ya no recibe plantIds, solo confirma la selección
      // Las plantas seleccionadas se pasan a través de onPlantClick
      onSelectPlants();
    }
  };

  const activityLabels: Record<ElementActivityType, string> = {
    riego: 'Riego',
    abono: 'Abono',
    fungicida: 'Fungicida',
    limpieza_hierbas: 'Limpieza de hierbas',
    airear_sustrato: 'Airear Sustrato',
  };

  if (plantedPlants.length === 0) {
    return (
      <div className="modal-overlay" onClick={onCancel}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Seleccionar plantas para {activityLabels[activityType]}</h2>
          <p>No hay plantas plantadas en este bancal.</p>
          <div className="form-actions">
            <button type="button" onClick={onCancel}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Seleccionar plantas para {activityLabels[activityType]}</h2>
        
        <div className="plant-selection-mode">
          <button
            type="button"
            className={`mode-button ${mode === 'all' ? 'active' : ''}`}
            onClick={() => handleModeChange('all')}
          >
            Seleccionar todas ({plantedPlants.length})
          </button>
          <button
            type="button"
            className={`mode-button ${mode === 'individual' ? 'active' : ''}`}
            onClick={() => handleModeChange('individual')}
          >
            Seleccionar ítems
          </button>
        </div>

        {mode === 'individual' && (
          <div className="plant-selection-instructions">
            <p>Haz clic en las plantas del bancal para seleccionarlas.</p>
            <p>Plantas seleccionadas: {selectedPlantIds.length} de {plantedPlants.length}</p>
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
          <button 
            type="button" 
            onClick={handleConfirm}
            disabled={mode === 'individual' && selectedPlantIds.length === 0}
          >
            {mode === 'all' ? 'Aplicar a todas' : `Aplicar a ${selectedPlantIds.length} planta(s)`}
          </button>
        </div>
      </div>
    </div>
  );
};


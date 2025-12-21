/**
 * Panel de selección de plantas para actividades
 * Permite seleccionar plantas individuales o todas
 */
import React from 'react';
import { Plant } from '../../types';

interface PlantSelectionPanelProps {
  plants: Plant[];
  selectedPlantIds: string[];
  onPlantToggle: (plantId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onFinishSelection: () => void;
  onCancel: () => void;
}

/**
 * Panel de selección de plantas
 */
export const PlantSelectionPanel: React.FC<PlantSelectionPanelProps> = ({
  plants,
  selectedPlantIds,
  onPlantToggle,
  onSelectAll,
  onDeselectAll,
  onFinishSelection,
  onCancel,
}) => {
  const plantedPlants = plants.filter(p => p.isPlanted);
  const allSelected = selectedPlantIds.length === plantedPlants.length && plantedPlants.length > 0;

  return (
    <div className="plant-selection-panel">
      <div className="selection-panel-header">
        <h3>Seleccionar plantas para la actividad</h3>
        <div className="selection-actions">
          <button
            type="button"
            className="selection-action-button"
            onClick={allSelected ? onDeselectAll : onSelectAll}
          >
            {allSelected ? 'Deseleccionar todas' : 'Seleccionar todas'}
          </button>
        </div>
      </div>
      
      <div className="selection-instructions">
        <p>Haz clic en las plantas del bancal para seleccionarlas.</p>
        <p>
          <strong>{selectedPlantIds.length}</strong> de <strong>{plantedPlants.length}</strong> plantas seleccionadas
        </p>
      </div>

      <div className="selection-panel-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="finish-selection-button"
          onClick={onFinishSelection}
          disabled={selectedPlantIds.length === 0}
        >
          Terminar selección ({selectedPlantIds.length})
        </button>
      </div>
    </div>
  );
};


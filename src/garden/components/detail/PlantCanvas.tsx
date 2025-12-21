/**
 * Canvas interactivo para visualizar y posicionar plantas en el elemento
 * Soporta drag & drop para mover plantas y gestión de plantas plantadas
 */
import React, { useState } from 'react';
import { GardenElement } from '../../types';
import { useCultivation } from '../../hooks/useCultivation';
import { useActivities } from '../../hooks/useActivities';
import { useElementDetail } from '../../hooks/useElementDetail';
import { PlantMarker } from './PlantMarker';
import { AddPlantButton } from './AddPlantButton';
import { RegisterActivityButton } from './RegisterActivityButton';
import { PlantSelectionPanel } from './PlantSelectionPanel';
import { ActivityRegistrationFlow } from './ActivityRegistrationFlow';

interface PlantCanvasProps {
  element: GardenElement;
  detailData: ReturnType<typeof import('../../hooks/useElementDetail').useElementDetail>;
  selectionMode?: boolean;
  selectedPlantIds?: string[];
  onPlantSelectionChange?: (plantIds: string[]) => void;
  onActivityRegistrationStart?: () => void;
}

/**
 * Canvas para plantas con posicionamiento
 */
export const PlantCanvas: React.FC<PlantCanvasProps> = ({
  element,
  detailData,
  selectionMode = false,
  selectedPlantIds = [],
  onPlantSelectionChange,
  onActivityRegistrationStart,
}) => {
  const { plants, movePlant, updatePlant, deletePlant } = useCultivation(element.id);
  const { addPlantActivity } = useActivities(element.id);
  const detailHook = useElementDetail(element.id);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [showActivityFlow, setShowActivityFlow] = useState(false);
  const [localSelectedPlantIds, setLocalSelectedPlantIds] = useState<string[]>([]);
  const [isSelectingPlants, setIsSelectingPlants] = useState(false);

  // Usar plantas del store si están disponibles, sino del hook
  const displayPlants = detailData.plants.length > 0 ? detailData.plants : plants;

  const handlePlantMove = (plantId: string, position: { x: number; y: number }) => {
    movePlant(plantId, position);
  };

  const handlePlant = async (plantId: string) => {
    try {
      await updatePlant(plantId, { isPlanted: true });
      if (detailHook.reload) {
        await detailHook.reload();
      }
    } catch (error) {
      console.error('Error planting:', error);
    }
  };

  const handleCosechar = async (plantId: string) => {
    try {
      // Crear actividad de cosecha
      await addPlantActivity(plantId, {
        type: 'cosecha',
        date: new Date().toISOString().split('T')[0],
        notes: `Cosechada: ${displayPlants.find(p => p.id === plantId)?.commonName}`,
      });
      
      // Eliminar la planta
      await deletePlant(plantId);
      
      if (detailHook.reload) {
        await detailHook.reload();
      }
    } catch (error) {
      console.error('Error harvesting:', error);
    }
  };

  const handlePodar = async (plantId: string) => {
    try {
      // Crear actividad de poda
      await addPlantActivity(plantId, {
        type: 'poda',
        date: new Date().toISOString().split('T')[0],
        notes: `Podada: ${displayPlants.find(p => p.id === plantId)?.commonName}`,
      });
      
      if (detailHook.reload) {
        await detailHook.reload();
      }
    } catch (error) {
      console.error('Error pruning:', error);
    }
  };

  const handleEliminar = async (plantId: string) => {
    try {
      await deletePlant(plantId);
      if (detailHook.reload) {
        await detailHook.reload();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handlePlantClickForSelection = (plantId: string) => {
    // Si estamos en modo selección de actividad, usar estado local
    if (isSelectingPlants) {
      const isSelected = localSelectedPlantIds.includes(plantId);
      if (isSelected) {
        setLocalSelectedPlantIds(localSelectedPlantIds.filter(id => id !== plantId));
      } else {
        setLocalSelectedPlantIds([...localSelectedPlantIds, plantId]);
      }
      return;
    }
    
    // Si estamos en modo selección externo (legacy)
    if (selectionMode && onPlantSelectionChange) {
      const isSelected = selectedPlantIds.includes(plantId);
      if (isSelected) {
        onPlantSelectionChange(selectedPlantIds.filter(id => id !== plantId));
      } else {
        onPlantSelectionChange([...selectedPlantIds, plantId]);
      }
    }
  };

  const handleStartActivityRegistration = () => {
    setIsSelectingPlants(true);
    setLocalSelectedPlantIds([]);
    if (onActivityRegistrationStart) {
      onActivityRegistrationStart();
    }
  };

  const handleSelectAll = () => {
    const plantedPlants = detailData.plants.filter(p => p.isPlanted);
    setLocalSelectedPlantIds(plantedPlants.map(p => p.id));
  };

  const handleDeselectAll = () => {
    setLocalSelectedPlantIds([]);
  };

  const handleFinishSelection = () => {
    if (localSelectedPlantIds.length === 0) return;
    setIsSelectingPlants(false);
    setShowActivityFlow(true);
  };

  const handleCancelSelection = () => {
    setIsSelectingPlants(false);
    setLocalSelectedPlantIds([]);
  };

  const handleCloseActivityFlow = () => {
    setShowActivityFlow(false);
    setLocalSelectedPlantIds([]);
  };

  // Determinar si estamos en modo selección (externo o interno)
  const isSelectionModeActive = selectionMode || isSelectingPlants;
  const effectiveSelectedPlantIds = isSelectingPlants ? localSelectedPlantIds : selectedPlantIds;

  return (
    <div className="plant-canvas-container">
      <div className="plant-canvas-header">
        <h2>Plantas en {element.displayName}</h2>
        <div className="canvas-header-actions">
          {!isSelectionModeActive && (
            <>
              <AddPlantButton element={element} />
              <RegisterActivityButton onClick={handleStartActivityRegistration} />
            </>
          )}
          {isSelectingPlants && (
            <div className="selection-mode-indicator">
              <span>Modo selección: Haz clic en las plantas para seleccionarlas</span>
            </div>
          )}
        </div>
      </div>

      {/* Panel de selección de plantas */}
      {isSelectingPlants && (
        <PlantSelectionPanel
          plants={detailData.plants}
          selectedPlantIds={localSelectedPlantIds}
          onPlantToggle={handlePlantClickForSelection}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onFinishSelection={handleFinishSelection}
          onCancel={handleCancelSelection}
        />
      )}

      {/* Flujo de registro de actividad */}
      {showActivityFlow && (
        <ActivityRegistrationFlow
          element={element}
          selectedPlantIds={localSelectedPlantIds}
          onClose={handleCloseActivityFlow}
          onSelectionComplete={() => {}}
        />
      )}
      <div 
        className={`plant-canvas ${isSelectionModeActive ? 'selection-mode' : ''}`}
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '400px', 
          border: '2px solid #5a4a3a', 
          borderRadius: '4px', 
          background: isSelectionModeActive ? '#fff9e6' : '#f5f5f5',
          cursor: isSelectionModeActive ? 'pointer' : 'default',
          zIndex: isSelectionModeActive ? 1001 : 'auto',
        }}
        onClick={(e) => {
          // En modo selección, prevenir que el clic se propague
          if (isSelectionModeActive) {
            e.stopPropagation();
          }
        }}
      >
        {displayPlants.map((plant) => {
          // Mostrar resaltado visual si la planta está seleccionada en modo selección
          const isSelectedForActivity = isSelectionModeActive && effectiveSelectedPlantIds.includes(plant.id);
          return (
            <PlantMarker
              key={plant.id}
              plant={plant}
              isSelected={selectedPlantId === plant.id}
              onSelect={() => {
                if (isSelectionModeActive && plant.isPlanted) {
                  // En modo selección, solo manejar la selección para la actividad
                  handlePlantClickForSelection(plant.id);
                  // NO cambiar selectedPlantId para evitar interferencias
                } else {
                  // Fuera del modo selección, comportamiento normal
                  setSelectedPlantId(plant.id);
                }
              }}
              onMove={isSelectionModeActive ? undefined : handlePlantMove}
              onPlant={handlePlant}
              onCosechar={handleCosechar}
              onPodar={handlePodar}
              onEliminar={handleEliminar}
              selectionMode={isSelectionModeActive}
              isSelectedForActivity={isSelectedForActivity}
            />
          );
        })}
      </div>
    </div>
  );
};


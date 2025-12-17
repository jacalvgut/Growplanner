/**
 * Canvas interactivo para visualizar y posicionar plantas en el elemento
 * Soporta drag & drop para mover plantas
 */
import React, { useState } from 'react';
import { GardenElement } from '../../types';
import { useCultivation } from '../../hooks/useCultivation';
import { PlantMarker } from './PlantMarker';
import { AddPlantButton } from './AddPlantButton';

interface PlantCanvasProps {
  element: GardenElement;
  detailData: ReturnType<typeof import('../../hooks/useElementDetail').useElementDetail>;
}

/**
 * Canvas para plantas con posicionamiento
 */
export const PlantCanvas: React.FC<PlantCanvasProps> = ({
  element,
  detailData,
}) => {
  const { plants, movePlant } = useCultivation(element.id);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  // Usar plantas del store si están disponibles, sino del hook
  const displayPlants = detailData.plants.length > 0 ? detailData.plants : plants;

  const handlePlantMove = (plantId: string, position: { x: number; y: number }) => {
    movePlant(plantId, position);
  };

  return (
    <div className="plant-canvas-container">
      <div className="plant-canvas-header">
        <h2>Plantas en {element.displayName}</h2>
        <AddPlantButton element={element} />
      </div>
      <div className="plant-canvas" style={{ position: 'relative', width: '100%', height: '400px', border: '2px solid #5a4a3a', borderRadius: '4px', background: '#f5f5f5' }}>
        {displayPlants.map((plant) => (
          <PlantMarker
            key={plant.id}
            plant={plant}
            isSelected={selectedPlantId === plant.id}
            onSelect={() => setSelectedPlantId(plant.id)}
            onMove={handlePlantMove}
          />
        ))}
      </div>
    </div>
  );
};


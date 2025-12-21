/**
 * Botones de acción rápida para registrar actividades
 */
import React, { useState } from 'react';
import { GardenElement, ElementActivityType } from '../../types';
import { useActivities } from '../../hooks/useActivities';
import { ActivityForm } from './ActivityForm';

interface ActivityButtonsProps {
  element: GardenElement;
  detailData: ReturnType<typeof import('../../hooks/useElementDetail').useElementDetail>;
  onPlantSelectionMode?: (enabled: boolean) => void;
  selectedPlantIds?: string[];
  onSelectedPlantIdsChange?: (plantIds: string[]) => void;
}

/**
 * Botones de actividades a nivel de elemento
 */
export const ActivityButtons: React.FC<ActivityButtonsProps> = ({
  element,
  detailData,
  onPlantSelectionMode,
  selectedPlantIds,
  onSelectedPlantIdsChange,
}) => {
  const { addElementActivity } = useActivities(element.id);
  const [showForm, setShowForm] = useState(false);
  const [activityType, setActivityType] = useState<ElementActivityType | null>(null);

  const handleActivityClick = (type: ElementActivityType) => {
    setActivityType(type);
    setShowForm(true);
  };

  const activityTypes: { type: ElementActivityType; label: string }[] = [
    { type: 'riego', label: 'Regar' },
    { type: 'abono', label: 'Abonar' },
    { type: 'limpieza_hierbas', label: 'Limpiar hierbas' },
    { type: 'airear_sustrato', label: 'Airear Sustrato' },
    { type: 'fungicida', label: 'Fungicida' },
  ];

  return (
    <div className="activity-buttons">
      <h3>Actividades del {element.displayName}</h3>
      <div className="activity-buttons-grid">
        {activityTypes.map(({ type, label }) => (
          <button
            key={type}
            className="activity-button"
            onClick={() => handleActivityClick(type)}
          >
            {label}
          </button>
        ))}
      </div>
      {showForm && activityType && (
        <ActivityForm
          element={element}
          activityType={activityType}
          onClose={() => {
            setShowForm(false);
            setActivityType(null);
            if (onPlantSelectionMode) {
              onPlantSelectionMode(false);
            }
            if (onSelectedPlantIdsChange) {
              onSelectedPlantIdsChange([]);
            }
          }}
          onPlantSelectionMode={onPlantSelectionMode}
          selectedPlantIds={selectedPlantIds}
          onSelectedPlantIdsChange={onSelectedPlantIdsChange}
        />
      )}
    </div>
  );
};


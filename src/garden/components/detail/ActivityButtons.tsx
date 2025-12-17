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
}

/**
 * Botones de actividades a nivel de elemento
 */
export const ActivityButtons: React.FC<ActivityButtonsProps> = ({
  element,
  detailData,
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
    { type: 'preparacion_suelo', label: 'Preparar suelo' },
    { type: 'otro', label: 'Otra actividad' },
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
          }}
        />
      )}
    </div>
  );
};


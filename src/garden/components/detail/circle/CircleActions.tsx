/**
 * Componente de acciones específicas para círculos (árboles frutales)
 * Muestra botones para: regar, abonar, quitar hierbas, podar
 */
import React, { useState } from 'react';
import { GardenElement, CircleActivityType } from '../../../types';
import { useCircleActivities } from '../../../hooks/useCircleActivities';
import { CircleActivityForm } from './CircleActivityForm';

interface CircleActionsProps {
  element: GardenElement;
  detailData: ReturnType<typeof import('../../../hooks/useElementDetail').useElementDetail>;
}

/**
 * Botones de acciones para círculos
 */
export const CircleActions: React.FC<CircleActionsProps> = ({
  element,
  detailData,
}) => {
  const { addCircleActivity } = useCircleActivities(element.id);
  const [showForm, setShowForm] = useState(false);
  const [activityType, setActivityType] = useState<CircleActivityType | null>(null);

  const handleActivityClick = (type: CircleActivityType) => {
    setActivityType(type);
    setShowForm(true);
  };

  const activityTypes: { type: CircleActivityType; label: string }[] = [
    { type: 'regar', label: 'Regar' },
    { type: 'abonar', label: 'Abonar' },
    { type: 'quitar_hierbas', label: 'Quitar hierbas' },
    { type: 'podar', label: 'Podar' },
  ];

  return (
    <div className="activity-buttons">
      <h3>Acciones de {element.displayName}</h3>
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
        <CircleActivityForm
          element={element}
          activityType={activityType}
          onClose={() => {
            setShowForm(false);
            setActivityType(null);
          }}
          onSuccess={() => {
            if (detailData.reload) {
              detailData.reload();
            }
          }}
        />
      )}
    </div>
  );
};


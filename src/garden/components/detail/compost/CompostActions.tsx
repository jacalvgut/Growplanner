/**
 * Componente de acciones específicas para composteras
 * Muestra botones para: alimentar, remover, regar
 */
import React, { useState } from 'react';
import { GardenElement, CompostActivityType } from '../../../types';
import { useCompostActivities } from '../../../hooks/useCompostActivities';
import { CompostActivityForm } from './CompostActivityForm';

interface CompostActionsProps {
  element: GardenElement;
  detailData: ReturnType<typeof import('../../../hooks/useElementDetail').useElementDetail>;
}

/**
 * Botones de acciones para composteras
 */
export const CompostActions: React.FC<CompostActionsProps> = ({
  element,
  detailData,
}) => {
  const { addCompostActivity } = useCompostActivities(element.id);
  const [showForm, setShowForm] = useState(false);
  const [activityType, setActivityType] = useState<CompostActivityType | null>(null);

  const handleActivityClick = (type: CompostActivityType) => {
    setActivityType(type);
    setShowForm(true);
  };

  const activityTypes: { type: CompostActivityType; label: string }[] = [
    { type: 'alimentar', label: 'Alimentar' },
    { type: 'remover', label: 'Remover' },
    { type: 'regar', label: 'Regar' },
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
        <CompostActivityForm
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


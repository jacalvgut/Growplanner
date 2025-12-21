/**
 * Componente de acciones específicas para árboles frutales
 * Muestra botones para: riego, poda, abono
 */
import React, { useState } from 'react';
import { FruitTree, FruitTreeActivityType } from '../../../types';
import { useFruitTreeActivities } from '../../../hooks/useFruitTreeActivities';
import { FruitTreeActivityForm } from './FruitTreeActivityForm';

interface FruitTreeActionsProps {
  tree: FruitTree;
  detailData: ReturnType<typeof import('../../../hooks/useFruitTreeDetail').useFruitTreeDetail>;
}

/**
 * Botones de acciones para árboles frutales
 */
export const FruitTreeActions: React.FC<FruitTreeActionsProps> = ({
  tree,
  detailData,
}) => {
  const { addFruitTreeActivity } = useFruitTreeActivities(tree.id);
  const [showForm, setShowForm] = useState(false);
  const [activityType, setActivityType] = useState<FruitTreeActivityType | null>(null);

  const handleActivityClick = (type: FruitTreeActivityType) => {
    setActivityType(type);
    setShowForm(true);
  };

  const activityTypes: { type: FruitTreeActivityType; label: string }[] = [
    { type: 'riego', label: 'Regar' },
    { type: 'poda', label: 'Podar' },
    { type: 'abono', label: 'Abonar' },
  ];

  return (
    <div className="activity-buttons">
      <h3>Acciones de {tree.displayName}</h3>
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
        <FruitTreeActivityForm
          tree={tree}
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


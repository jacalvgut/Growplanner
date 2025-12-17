/**
 * Botón para añadir nuevas plantas
 * Abre el formulario de creación
 */
import React, { useState } from 'react';
import { GardenElement } from '../../types';
import { PlantForm } from './PlantForm';

interface AddPlantButtonProps {
  element: GardenElement;
}

/**
 * Botón para añadir plantas
 */
export const AddPlantButton: React.FC<AddPlantButtonProps> = ({ element }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        className="add-plant-button"
        onClick={() => setShowForm(true)}
        aria-label="Añadir planta"
      >
        + Añadir Planta
      </button>
      {showForm && (
        <PlantForm
          element={element}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
};


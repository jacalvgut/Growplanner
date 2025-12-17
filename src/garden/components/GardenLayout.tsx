/**
 * Componente principal que renderiza el layout del jardín
 * Organiza todos los elementos interactuables del huerto en su posición correspondiente
 */
import React from 'react';
import { getRenderOrder, getElementById } from '../constants';
import { GardenElement } from './GardenElement';

/**
 * Layout principal del jardín
 * Renderiza todos los elementos del huerto en el orden correcto
 */
export const GardenLayout: React.FC = () => {
  const renderOrder = getRenderOrder();

  return (
    <div className="garden">
      {renderOrder.map((elementId) => {
        const element = getElementById(elementId);
        return <GardenElement key={elementId} element={element} />;
      })}
    </div>
  );
};


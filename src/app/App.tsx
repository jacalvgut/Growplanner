/**
 * Componente raíz de la aplicación
 * Envuelve toda la aplicación y proporciona el layout principal
 */
import React from 'react';
import { GardenLayout } from '../garden/components/GardenLayout';
import { FrutalesButton } from '../ui/components/FrutalesButton';

/**
 * Componente principal de la aplicación GrowPlanner
 */
export const App: React.FC = () => {
  return (
    <div className="page">
      <div className="garden-container">
        <GardenLayout />
        <FrutalesButton />
      </div>
    </div>
  );
};


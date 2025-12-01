/**
 * Componente raíz de la aplicación
 * Envuelve toda la aplicación y proporciona el layout principal
 */
import React from 'react';
import { GardenLayout } from './components/GardenLayout';

/**
 * Componente principal de la aplicación GrowPlanner
 */
export const App: React.FC = () => {
  return (
    <div className="page">
      <GardenLayout />
    </div>
  );
};

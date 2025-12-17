/**
 * Componente raíz de la aplicación
 * Configura el enrutamiento principal
 */
import React from 'react';
import { AppRoutes } from './routes';

/**
 * Componente principal de la aplicación GrowPlanner
 */
export const App: React.FC = () => {
  return <AppRoutes />;
};


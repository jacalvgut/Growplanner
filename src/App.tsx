import React from 'react';
import { GardenLayout } from './components/GardenLayout';

export const App: React.FC = () => {
  return (
    <div className="page">
      <h1 className="title">Gestión de huerto</h1>
      <GardenLayout />
    </div>
  );
};

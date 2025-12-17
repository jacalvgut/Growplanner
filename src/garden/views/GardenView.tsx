/**
 * Vista principal del jardín
 * Muestra el layout completo del huerto
 */
import React from 'react';
import { GardenLayout } from '../components/GardenLayout';
import { FrutalesButton } from '../../ui/components/FrutalesButton';

/**
 * Vista principal del jardín
 */
export const GardenView: React.FC = () => {
  return (
    <div className="page">
      <div className="garden-container">
        <GardenLayout />
        <FrutalesButton />
      </div>
    </div>
  );
};


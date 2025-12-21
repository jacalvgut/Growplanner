/**
 * Header de la vista detallada de un árbol frutal
 */
import React from 'react';
import { FruitTree } from '../../../types';

interface FruitTreeDetailHeaderProps {
  tree: FruitTree;
  onBack: () => void;
}

/**
 * Header de detalle de árbol frutal
 */
export const FruitTreeDetailHeader: React.FC<FruitTreeDetailHeaderProps> = ({
  tree,
  onBack,
}) => {
  return (
    <div className="element-detail-header">
      <button className="back-button" onClick={onBack} aria-label="Volver">
        ← Volver
      </button>
      <h1 className="element-detail-title">{tree.displayName}</h1>
    </div>
  );
};


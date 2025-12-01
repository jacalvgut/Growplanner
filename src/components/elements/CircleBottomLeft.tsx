import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleBottomLeft: React.FC = () => {
  return (
    <button
      className="circle zone circle-bottom-left"
      onClick={() => handleElementClick(GardenElementId.CIRCLE_BOTTOM_LEFT, 'Árbol inferior izquierdo')}
    >
      Parra  
    </button>
  );
};



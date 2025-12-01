import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleRight1: React.FC = () => {
  return (
    <button
      className="circle zone circle-right circle-right-1"
      onClick={() => handleElementClick(GardenElementId.CIRCLE_RIGHT_1, 'Árbol derecho 1')}
    >
      Papayero
    </button>
  );
};



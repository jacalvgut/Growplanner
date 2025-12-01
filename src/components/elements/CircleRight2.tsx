import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleRight2: React.FC = () => {
  return (
    <button
      className="circle zone circle-right circle-right-2"
      onClick={() => handleElementClick(GardenElementId.CIRCLE_RIGHT_2, 'Árbol derecho 2')}
    >
      Platanera 1
    </button>
  );
};



import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleRight3: React.FC = () => {
  return (
    <button
      className="circle zone circle-right circle-right-3"
      onClick={() => handleElementClick(GardenElementId.CIRCLE_RIGHT_3, 'Árbol derecho 3')}
    >
      Platanera 2
    </button>
  );
};



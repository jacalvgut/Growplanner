import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleRight4: React.FC = () => {
  return (
    <button
      className="circle zone circle-right circle-right-4"
      onClick={() => handleElementClick(GardenElementId.CIRCLE_RIGHT_4, 'Árbol derecho 4')}
    >
      Platanera 3
    </button>
  );
};



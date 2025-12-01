import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleIn2: React.FC = () => {
  return (
    <button
      className="circle zone circle-in-2"
      onClick={() => handleElementClick(GardenElementId.CIRCLE_IN_2, 'Pitaya 2')}
    >
      Pitaya 2
    </button>
  );
};
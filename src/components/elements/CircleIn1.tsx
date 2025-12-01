import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleIn1: React.FC = () => {
  return (
    <button
      className="circle zone circle-in-1"
      onClick={() => handleElementClick(GardenElementId.CIRCLE_IN_1, 'Pitaya 1')}
    >
      Pitaya 1
    </button>
  );
};